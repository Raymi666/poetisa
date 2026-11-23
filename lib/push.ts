import webpush from 'web-push';
import {AccountError,sha256} from './account-auth';
import {localDay,CHILE_ZONE} from './journey';
type PushEnv={DB?:D1Database;VAPID_PUBLIC_KEY?:string;VAPID_PRIVATE_KEY?:string;PUSH_SCHEDULE_ENABLED?:string;PUBLIC_ORIGIN?:string};
export const pushReady=(env:PushEnv)=>!!(env.VAPID_PUBLIC_KEY&&env.VAPID_PRIVATE_KEY&&env.PUSH_SCHEDULE_ENABLED==='true');
type Subscription={endpoint:string;keys:{p256dh:string;auth:string}};
export function subscriptionOf(raw:any):Subscription{
 let url:URL;try{url=new URL(raw?.endpoint);}catch{throw new AccountError(400,'INVALID_PUSH','El navegador no entregó una suscripción válida.');}
 const host=url.hostname,allowed=host==='fcm.googleapis.com'||host==='updates.push.services.mozilla.com'||host.endsWith('.push.services.mozilla.com')||host==='web.push.apple.com'||host.endsWith('.notify.windows.com');
 if(url.protocol!=='https:'||url.port||url.username||url.password||url.hash||!allowed||url.href.length>3000||!/^B[A-Za-z0-9_-]{86}=?$/.test(raw?.keys?.p256dh||'')||! /^[A-Za-z0-9_-]{22}={0,2}$/.test(raw?.keys?.auth||''))throw new AccountError(400,'INVALID_PUSH','Este navegador no entregó una suscripción compatible. Prueba Safari, Chrome, Firefox o Edge actualizados.');
 return {endpoint:url.href,keys:{p256dh:raw.keys.p256dh,auth:raw.keys.auth}};
}
export async function subscribe(db:D1Database,env:PushEnv,accountId:string,data:any){
 if(!pushReady(env))throw new AccountError(503,'PUSH_NOT_READY','Los avisos diarios todavía están en preparación. Te avisaremos aquí cuando puedas activarlos.');
 if(data.consent!==true)throw new AccountError(400,'CONSENT_REQUIRED','Activa el recordatorio solo si deseas recibirlo.');
 const s=subscriptionOf(data.subscription),id=await sha256(s.endpoint);
 const count=await db.prepare('SELECT COUNT(*) AS n FROM poetisa_pushes WHERE account_id=? AND id<>?').bind(accountId,id).first<{n:number}>();
 if((count?.n||0)>=5)throw new AccountError(400,'DEVICE_LIMIT','Ya tienes cinco dispositivos con avisos. Desactiva alguno antes de añadir otro.');
 // A browser belongs to the currently signed-in account; a new login replaces the prior binding.
 await db.prepare('INSERT INTO poetisa_pushes(id,account_id,subscription,created_at,consent) VALUES (?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET account_id=excluded.account_id,subscription=excluded.subscription,created_at=excluded.created_at,consent=excluded.consent').bind(id,accountId,JSON.stringify(s),Date.now(),'Activó avisos diarios a las 09:00 America/Santiago desde su cuenta; puede desactivarlos en este dispositivo.').run();
 return {ok:true};
}
export async function unsubscribe(db:D1Database,accountId:string,endpoint:unknown){
 if(typeof endpoint!=='string'||endpoint.length>3000)throw new AccountError(400,'INVALID_PUSH','No pudimos identificar este dispositivo.');
 await db.prepare('DELETE FROM poetisa_pushes WHERE id=? AND account_id=?').bind(await sha256(endpoint),accountId).run();return {ok:true};
}
async function send(subscription:Subscription,env:PushEnv,payload:{title:string;body:string;tag:string}){
 const request=webpush.generateRequestDetails(subscriptionOf(subscription),JSON.stringify({...payload,url:'/poetisa'}),{TTL:3600,urgency:'normal',contentEncoding:'aes128gcm',vapidDetails:{subject:'mailto:rvasquez@surfia.cl',publicKey:env.VAPID_PUBLIC_KEY!,privateKey:env.VAPID_PRIVATE_KEY!}});
 const response=await fetch(request.endpoint,{method:request.method,headers:request.headers as Record<string,string>,body:new Uint8Array(request.body!),redirect:'error',signal:AbortSignal.timeout(12000)});
 return response.status;
}
export async function testPush(db:D1Database,env:PushEnv,accountId:string,endpoint:unknown){
 if(!pushReady(env))throw new AccountError(503,'PUSH_NOT_READY','Los avisos aún no están activos.');
 if(typeof endpoint!=='string'||endpoint.length>3000)throw new AccountError(400,'INVALID_PUSH','Activa primero este dispositivo.');
 const row=await db.prepare('SELECT id,subscription FROM poetisa_pushes WHERE id=? AND account_id=?').bind(await sha256(endpoint),accountId).first<{id:string;subscription:string}>();
 if(!row)throw new AccountError(400,'INVALID_PUSH','Activa primero este dispositivo.');
 const day=localDay(),id=`test:${row.id}:${day}`;
 const saved=await db.prepare("INSERT OR IGNORE INTO poetisa_push_deliveries(id,push_id,day,status,created_at) VALUES (?,?,?,'claimed',?)").bind(id,row.id,day,Date.now()).run();
 if(!saved.meta.changes)throw new AccountError(429,'TEST_LIMIT','Ya pediste una prueba hoy en este dispositivo. Revisa tus notificaciones.');
 let status=0;try{status=await send(JSON.parse(row.subscription),env,{title:'PoetisA ♡',body:'Este es nuestro pequeño encuentro de prueba. Tus palabras te esperan.',tag:'poetisa-test'});}finally{await db.prepare('UPDATE poetisa_push_deliveries SET status=?,finished_at=? WHERE id=?').bind(status>=200&&status<300?'accepted':status?'failed':'uncertain',Date.now(),id).run();}
 if(status===404||status===410)await db.prepare('DELETE FROM poetisa_pushes WHERE id=?').bind(row.id).run();
 if(status<200||status>=300)throw new AccountError(503,'PUSH_FAILED','El aviso no pudo entregarse al servicio del navegador. Desactiva y vuelve a activar los avisos.');
 return {message:'El servicio de notificaciones aceptó la prueba. Revisa tu teléfono; su visualización depende de sus permisos y ajustes.'};
}
export async function sendDailyPushes(env:PushEnv,now=new Date()){
 if(!env.DB||!pushReady(env))return {enabled:false,accepted:0};
 const hour=Number(new Intl.DateTimeFormat('en-GB',{timeZone:CHILE_ZONE,hour:'2-digit',hourCycle:'h23'}).format(now));
 if(hour!==9)return {enabled:true,accepted:0,reason:'outside_daily_window'};
 const db=env.DB,day=localDay(now),stats={enabled:true,accepted:0,failed:0,uncertain:0,skipped:0};
 const rows=(await db.prepare(`SELECT p.id,p.account_id,p.subscription,a.invitation_on FROM poetisa_pushes p JOIN poetisa_accounts a ON a.id=p.account_id WHERE NOT EXISTS (SELECT 1 FROM poetisa_push_deliveries d WHERE d.id=p.id||':'||?) ORDER BY p.created_at LIMIT 100`).bind(day).all<{id:string;account_id:string;subscription:string;invitation_on:string}>()).results;
 for(const row of rows){
  const writing=row.invitation_on<=day;
  const done=writing?await db.prepare("SELECT 1 AS done FROM poetisa_writings WHERE account_id=? AND day=? AND status='finished' LIMIT 1").bind(row.account_id,day).first():await db.prepare('SELECT 1 AS done FROM poetisa_readings WHERE session_id=? AND date=? LIMIT 1').bind(row.account_id,day).first();
  const id=`${row.id}:${day}`;
  const reserved=await db.prepare('INSERT OR IGNORE INTO poetisa_push_deliveries(id,push_id,day,status,created_at) VALUES (?,?,?,?,?)').bind(id,row.id,day,done?'skipped':'claimed',now.getTime()).run();
  if(!reserved.meta.changes)continue;if(done){stats.skipped++;continue;}
  // Recheck consent after reservation; a canceled subscription is never sent from the loaded snapshot.
  if(!await db.prepare('SELECT id FROM poetisa_pushes WHERE id=? AND account_id=?').bind(row.id,row.account_id).first()){stats.skipped++;continue;}
  let status=0;try{status=await send(JSON.parse(row.subscription),env,{title:'PoetisA ♡',body:writing?'Hoy también hay lugar para tu voz. ¿Escribimos un pequeño poema?':'¿Qué tres palabras te acompañan hoy? Tu encuentro con la poesía te espera.',tag:'poetisa-daily'});}catch{/* An uncertain send is never automatically repeated. */}
  const result=status>=200&&status<300?'accepted':status?'failed':'uncertain';stats[result]++;
  await db.prepare('UPDATE poetisa_push_deliveries SET status=?,finished_at=? WHERE id=?').bind(result,Date.now(),id).run();
  if(status===404||status===410)await db.prepare('DELETE FROM poetisa_pushes WHERE id=?').bind(row.id).run();
 }
 return stats;
}
