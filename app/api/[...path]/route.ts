import {env} from 'cloudflare:workers';
import {wordsOf,nameOf,chileDate} from '@/lib/poetry';
import {AccountError,authReady,sha256} from '@/lib/account-auth';
import {accountSession,requireAccount,createAccount,saveWriting} from '@/lib/accounts';
import {pushReady,subscribe,unsubscribe,testPush} from '@/lib/push';
import poems from '@/content/poems.json';
import {COLLECTION_VERSION,SELECTOR_INSTRUCTIONS,candidatesFor,fallbackSelection,readSelection,selectionFormat,type CatalogPoem} from '@/lib/selection';
const catalog=poems as CatalogPoem[];
export const dynamic='force-dynamic';
const HEADERS={'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'};
function json(data:unknown,status=200,headers:Record<string,string>={}){return Response.json(data,{status,headers:{...HEADERS,...headers}});}
function db(){if(!env.DB)throw Error('Database unavailable');return env.DB;}
function random(){return Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,'0')).join('');}
async function hash(s:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))),x=>x.toString(16).padStart(2,'0')).join('');}
async function same(a:string,b:string){const x=await hash(a),y=await hash(b);let n=0;for(let i=0;i<x.length;i++)n|=x.charCodeAt(i)^y.charCodeAt(i);return n===0;}
async function guestSession(req:Request){const token=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('poetisa_session='))?.slice(16);if(!token||!/^[a-f0-9]{64}$/.test(token))return null;return await db().prepare('SELECT * FROM poetisa_sessions WHERE id=? AND expires>?').bind(await hash(token),Date.now()).first<{id:string;name:string;expires:number}>();}
async function session(req:Request){return req.headers.has('authorization')?accountSession(req,db(),env):guestSession(req);}
function cookie(req:Request,token:string){return `poetisa_session=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=15552000${new URL(req.url).protocol==='https:'?'; Secure':''}`;}
async function useBudget(id:string,limit:number){const result=await db().prepare('INSERT INTO poetisa_quotas (id,used) VALUES (?,1) ON CONFLICT(id) DO UPDATE SET used=used+1 WHERE used<?').bind(id,limit).run();return result.meta.changes>0;}
function reading(row:any){return {id:row.id,date:row.date,name:row.name,words:JSON.parse(row.words),kind:'published',work:JSON.parse(row.poem_json),reason:row.reason,relevance:row.relevance,selectionMethod:row.selection_method,catalogVersion:row.catalog_version};}
function message(title:string,text:string){return new Response(`<!doctype html><html lang="es"><meta name="viewport" content="width=device-width"><title>PoetisA</title><style>body{background:#fff6f7;color:#493541;font:18px/1.7 Georgia;padding:12vh 24px;text-align:center}a{color:#a33d68}h1{font-weight:normal}</style><h1>${title}</h1><p>${text}</p><a href="/poetisa.html">Volver a PoetisA ♡</a></html>`,{headers:{...HEADERS,'Content-Type':'text/html; charset=utf-8'}});}
export async function GET(req:Request){
 try{
  const url=new URL(req.url),path=url.pathname;
  if(path==='/api/confirm'||path==='/api/unsubscribe'){
   const t=url.searchParams.get('t')||'';if(!/^[a-f0-9]{64}$/.test(t))return message('Este enlace no es válido.','Vuelve a solicitar tu recordatorio desde PoetisA.');
   const confirm=path==='/api/confirm';
   return new Response(`<!doctype html><html lang="es"><meta name="viewport" content="width=device-width"><title>Recordatorios de PoetisA</title><link rel="stylesheet" href="/style.css"><main style="padding:70px 24px;max-width:600px"><h1>${confirm?'Un encuentro cada mañana.':'A tu ritmo, siempre.'}</h1><p>${confirm?'Confirma que quieres recibir el recordatorio de PoetisA a las 9:00 de Chile.':'¿Quieres dejar de recibir los correos de PoetisA?'}</p><form method="POST" action="${path}"><input type="hidden" name="token" value="${t}"><button class="primary">${confirm?'Sí, quiero mi recordatorio':'Dejar de recibir correos'}</button></form></main></html>`,{headers:{...HEADERS,'Content-Type':'text/html; charset=utf-8'}});
  }
  if(path==='/api/config')return json({accounts_ready:authReady(env),firebase:authReady(env)?{apiKey:env.FIREBASE_WEB_API_KEY,authDomain:env.FIREBASE_AUTH_DOMAIN,projectId:env.FIREBASE_PROJECT_ID}:null,push_ready:pushReady(env),vapid_public_key:pushReady(env)?env.VAPID_PUBLIC_KEY:null});
  if(path==='/api/notebook'){
   const a=await requireAccount(req,db(),env);
   return json({name:a.name,exportedAt:new Date().toISOString(),readings:(await db().prepare('SELECT * FROM poetisa_readings WHERE session_id=? ORDER BY created_at').bind(a.id).all()).results.map(reading),writings:(await db().prepare('SELECT id,title,body,status,revision,day,created_at,updated_at FROM poetisa_writings WHERE account_id=? ORDER BY updated_at DESC').bind(a.id).all()).results});
  }
  if(path==='/api/writings'){const a=await requireAccount(req,db(),env);return json({writings:(await db().prepare('SELECT id,title,body,status,revision,day,created_at,updated_at FROM poetisa_writings WHERE account_id=? ORDER BY updated_at DESC LIMIT 1000').bind(a.id).all()).results});}
  if(path==='/api/push-status'){const a=await requireAccount(req,db(),env);const ep=url.searchParams.get('endpoint')||'';return json({active:!!(ep&&ep.length<=3000&&await db().prepare('SELECT id FROM poetisa_pushes WHERE id=? AND account_id=?').bind(await sha256(ep),a.id).first()),ready:pushReady(env)});}
  if(path==='/api/collection')return json({version:COLLECTION_VERSION,count:catalog.length,poems:catalog.map(({text,keywords,...p})=>p)});
  if(path==='/api/status'){
   let s;try{s=await session(req);}catch(e){if(e instanceof AccountError&&e.code==='PROFILE_REQUIRED')return json({joined:false,profile_required:true});throw e;}
   if(!s)return json({joined:false,today:chileDate(),ready:catalog.length>0,reminders_ready:env.EMAIL_ENABLED==='true'});
   const selections=await db().prepare('SELECT * FROM poetisa_readings WHERE session_id=? ORDER BY created_at ASC LIMIT 1000').bind(s.id).all();
   const reminder=await db().prepare('SELECT email,confirmed,active FROM poetisa_reminders WHERE session_id=? AND active=1 LIMIT 1').bind(s.id).first();
   return json({joined:true,account:'account' in s,journey:'journey' in s?s.journey:null,email:'email' in s?s.email:null,name:s.name,history:selections.results.map(reading),today:chileDate(),used_today:selections.results.some((r:any)=>r.date===chileDate()),ready:catalog.length>0,reminders_ready:env.EMAIL_ENABLED==='true',reminder});
  }
  return json({error:'No encontrado.'},404);
 }catch(e){if(e instanceof AccountError)return json({error:e.message,code:e.code},e.status);return json({error:'PoetisA no pudo abrir su cuaderno. Inténtalo en un momento.'},503);}
}
export async function POST(req:Request){
 const url=new URL(req.url),path=url.pathname;
 if(req.headers.get('origin')!==url.origin)return json({error:'Abre PoetisA desde su enlace original.'},403);
 if(Number(req.headers.get('content-length')||0)>65536)return json({error:'Solicitud demasiado grande.'},413);
 try{
  if(path==='/api/confirm'||path==='/api/unsubscribe'){
   const form=await req.formData(),token=String(form.get('token')||'');if(!/^[a-f0-9]{64}$/.test(token))return message('Enlace no válido.','Solicita un enlace nuevo desde PoetisA.');
   if(path==='/api/confirm'){
    const r=await db().prepare('UPDATE poetisa_reminders SET confirmed=1 WHERE confirm_token=? AND active=1').bind(token).run();
    return message(r.meta.changes?'Nos encontramos cada mañana.':'Este enlace ya no está activo.',r.meta.changes?'Tu recordatorio está confirmado. Podrás darte de baja desde cada correo.':'Solicita un enlace nuevo desde PoetisA.');
   }
   await db().prepare('DELETE FROM poetisa_reminders WHERE unsubscribe_token=?').bind(token).run();
   return message('A tu ritmo, siempre.','Ya no recibirás recordatorios. Puedes volver cuando quieras.');
  }
  if(!req.headers.get('content-type')?.startsWith('application/json'))return json({error:'Formato no válido.'},400);
  const raw=await req.text();if(raw.length>65536)return json({error:'Solicitud demasiado grande.'},413);
  const data=JSON.parse(raw);
  if(path==='/api/account')return json(await createAccount(req,db(),env,data));
  if(path==='/api/writing'){const a=await requireAccount(req,db(),env);return json(await saveWriting(db(),a.id,data));}
  if(path==='/api/writing-delete'){
   const a=await requireAccount(req,db(),env);
   if(typeof data.id!=='string'||!Number.isSafeInteger(data.revision))return json({error:'Identificación no válida.'},400);
   const result=await db().prepare('DELETE FROM poetisa_writings WHERE id=? AND account_id=? AND revision=?').bind(data.id,a.id,data.revision).run();
   if(!result.meta.changes)return json({error:'Este poema cambió en otro dispositivo. Actualiza el cuaderno antes de borrarlo.'},409);
   return json({ok:true});
  }
  if(path==='/api/import-readings'){
   const a=await requireAccount(req,db(),env);if(data.consent!==true)return json({error:'Confirma que estas lecturas son tuyas.'},400);
   const guest=await guestSession(req);if(!guest)return json({moved:0,remaining:0});
   const moved=await db().prepare('UPDATE poetisa_readings SET session_id=? WHERE session_id=? AND date NOT IN (SELECT date FROM poetisa_readings WHERE session_id=?)').bind(a.id,guest.id,a.id).run();
   const remaining=await db().prepare('SELECT COUNT(*) AS n FROM poetisa_readings WHERE session_id=?').bind(guest.id).first<{n:number}>();
   return json({moved:moved.meta.changes,remaining:remaining?.n||0});
  }
  if(path==='/api/push-subscribe'){const a=await requireAccount(req,db(),env);return json(await subscribe(db(),env,a.id,data));}
  if(path==='/api/push-unsubscribe'){const a=await requireAccount(req,db(),env);return json(await unsubscribe(db(),a.id,data.endpoint));}
  if(path==='/api/push-test'){const a=await requireAccount(req,db(),env);return json(await testPush(db(),env,a.id,data.endpoint));}
  if(path==='/api/logout')return json({ok:true},200,{'Set-Cookie':'poetisa_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0'});
  if(path==='/api/join'){
   if(!env.INVITE_CODE)return json({error:'PoetisA está preparando las invitaciones. Vuelve pronto.'},503);
   if(!await same(typeof data.code==='string'?data.code.trim():'',env.INVITE_CODE))return json({error:'Ese código no coincide. Pídele el código de invitación a quien te compartió PoetisA.'},403);
   if(await session(req))return json({ok:true});
   const token=random();await db().prepare("INSERT INTO poetisa_sessions(id,name,expires,busy_until) VALUES (?,'',?,0)").bind(await hash(token),Date.now()+15552000000).run();
   const response=json({ok:true},200,{'Set-Cookie':cookie(req,token)});response.headers.append('Set-Cookie','wave_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0');return response;
  }
  const s=await session(req);if(!s)return json({error:'Introduce tu código de invitación para entrar.',join_required:true},401);
  if(path==='/api/name'){
   const name=nameOf(data.name);await db().batch([db().prepare('UPDATE poetisa_sessions SET name=? WHERE id=?').bind(name,s.id),db().prepare('UPDATE poetisa_accounts SET name=? WHERE id=?').bind(name,s.id)]);return json({name});
  }
  if(path==='/api/reminder'){
   const name=nameOf(s.name),email=typeof data.email==='string'?data.email.trim().toLowerCase():'';
   if(!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)||email.length>254||data.consent!==true)return json({error:'Escribe tu correo y confirma que quieres el recordatorio.'},400);
   if(env.EMAIL_ENABLED!=='true')return json({error:'Los recordatorios por correo aún están en preparación. No hemos guardado tu dirección.'},503);
   const existing=await db().prepare('SELECT id,session_id,active FROM poetisa_reminders WHERE email=?').bind(email).first<{id:string;session_id:string;active:number}>();
   if(existing&&existing.session_id!==s.id)return json({message:'Si esta dirección ya está inscrita, conserva su configuración. Revisa tu correo de confirmación.'});
   await db().prepare('DELETE FROM poetisa_reminders WHERE session_id=? AND email<>?').bind(s.id,email).run();
   await db().prepare('INSERT INTO poetisa_reminders(id,session_id,email,name,active,confirmed,confirm_token,unsubscribe_token,created_at,consent) VALUES (?,?,?,?,1,0,?,?,?,?) ON CONFLICT(email) DO UPDATE SET active=1,confirmed=0,confirm_token=excluded.confirm_token,unsubscribe_token=excluded.unsubscribe_token,created_at=excluded.created_at,consent=excluded.consent,name=excluded.name').bind(random(),s.id,email,name,random(),random(),Date.now(),'Solicitó voluntariamente recordatorio diario a las 09:00 America/Santiago; requiere confirmar su correo.').run();
   return json({message:'Solicitud recibida. En el próximo envío recibirás un correo de confirmación; pulsa su enlace para activar los recordatorios.'});
  }
  if(path==='/api/reminder-cancel'){await db().prepare('DELETE FROM poetisa_reminders WHERE session_id=?').bind(s.id).run();return json({ok:true});}
  if(path==='/api/poem'){
   const words=wordsOf(data.words),name=nameOf(s.name),today=chileDate();
   const cached=await db().prepare('SELECT * FROM poetisa_readings WHERE session_id=? AND date=? LIMIT 1').bind(s.id,today).first();
   if(cached)return json({poem:reading(cached),cached:true});
   const locked=await db().prepare('UPDATE poetisa_sessions SET busy_until=? WHERE id=? AND busy_until<?').bind(Date.now()+120000,s.id,Date.now()).run();
   if(!locked.meta.changes)return json({error:'Estoy buscando tu lectura. Espera un momento antes de volver a pedirla.'},409);
   try{
    // Recheck after acquiring the lock: another request may have completed meanwhile.
    const existing=await db().prepare('SELECT * FROM poetisa_readings WHERE session_id=? AND date=? LIMIT 1').bind(s.id,today).first();
    if(existing)return json({poem:reading(existing),cached:true});
    const past=await db().prepare('SELECT poem_id,poem_json FROM poetisa_readings WHERE session_id=? ORDER BY created_at ASC').bind(s.id).all<{poem_id:string;poem_json:string}>();
    const candidates=candidatesFor(catalog,past.results.map(p=>p.poem_id));
    const previousAuthor=past.results.length?JSON.parse(past.results[past.results.length-1].poem_json).author:undefined;
    let choice=fallbackSelection(candidates,words,previousAuthor);
    // A bounded optional semantic call picks only an ID. Text and attribution never come from the model.
    if(env.OPENAI_API_KEY&&await useBudget(`global:${today}`,100)&&await useBudget('trial:total',500)){
     try{
      const response=await fetch('https://api.openai.com/v1/responses',{method:'POST',headers:{'Authorization':`Bearer ${env.OPENAI_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({model:env.POETISA_MODEL||'gpt-6.1-sol',instructions:SELECTOR_INSTRUCTIONS,input:JSON.stringify({palabras:words,autor_anterior:previousAuthor,catalogo:candidates.map(p=>({id:p.id,titulo:p.title,autor:p.author,temas:p.themes,poema:p.text}))}),text:{format:selectionFormat(candidates)},max_output_tokens:2000,reasoning:{effort:'low'},store:false}),signal:AbortSignal.timeout(45000)});
      if(response.ok)choice=readSelection(await response.json(),candidates)||choice;
     }catch{/* The verified local collection remains usable if semantic selection is unavailable. */}
    }
    const id=random(),record={id,date:today,name,words,kind:'published',work:choice.poem,reason:choice.reason,relevance:choice.relevance,selectionMethod:choice.selectionMethod,catalogVersion:COLLECTION_VERSION};
    await db().prepare('INSERT INTO poetisa_readings (id,session_id,date,name,words,poem_id,poem_json,reason,relevance,selection_method,catalog_version,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,s.id,today,name,JSON.stringify(words),choice.poem.id,JSON.stringify(choice.poem),choice.reason,choice.relevance,choice.selectionMethod,COLLECTION_VERSION,Date.now()).run();
    return json({poem:record,cached:false});
   }finally{await db().prepare('UPDATE poetisa_sessions SET busy_until=0 WHERE id=?').bind(s.id).run();}
  }
  return json({error:'No encontrado.'},404);
 }catch(e){if(e instanceof AccountError)return json({error:e.message,code:e.code},e.status);const m=e instanceof Error?e.message:'';const allowed=['Regálame','Escribe','La colección'];return json({error:allowed.some(x=>m.startsWith(x))?m:'Algo interrumpió nuestro encuentro. Inténtalo más tarde; tu lectura se conservará si ya quedó guardada.'},400);}
}
