import {identity,AccountError,type AuthConfig,type Identity} from './account-auth';
import {nameOf} from './poetry';
import {journey,localDay,sixMonthsAfter} from './journey';
export type Account={id:string;provider_uid:string;email:string;name:string;created_at:number;invitation_on:string};
export async function accountFor(db:D1Database,person:Identity){return db.prepare('SELECT * FROM poetisa_accounts WHERE id=?').bind(person.id).first<Account>();}
export async function accountSession(req:Request,db:D1Database,env:AuthConfig){
 const person=await identity(req,env);if(!person)return null;
 const account=await accountFor(db,person);
 if(!account)throw new AccountError(409,'PROFILE_REQUIRED','Elige cómo te gustaría que te llamemos para abrir tu cuaderno.');
 return {...account,account:true,journey:journey(account.created_at,account.invitation_on)};
}
export async function requireAccount(req:Request,db:D1Database,env:AuthConfig){const a=await accountSession(req,db,env);if(!a)throw new AccountError(401,'SIGN_IN_REQUIRED','Inicia sesión con tu correo para abrir tu cuaderno personal.');return a;}
export async function createAccount(req:Request,db:D1Database,env:AuthConfig,data:any){
 const person=await identity(req,env);if(!person)throw new AccountError(401,'SIGN_IN_REQUIRED','Inicia sesión primero.');
 const existing=await accountFor(db,person);if(existing)return {ok:true};
 const name=nameOf(data.name),now=Date.now();
 if(data.consent!==true)throw new AccountError(400,'CONSENT_REQUIRED','Acepta guardar tu cuaderno personal para continuar.');
 await db.batch([
  db.prepare('INSERT OR IGNORE INTO poetisa_accounts(id,provider_uid,email,name,created_at,invitation_on) VALUES (?,?,?,?,?,?)').bind(person.id,person.uid,person.email,name,now,sixMonthsAfter(localDay(new Date(now)))),
  db.prepare('INSERT OR IGNORE INTO poetisa_sessions(id,name,expires,busy_until) VALUES (?,?,?,0)').bind(person.id,name,8640000000000000)
 ]);
 return {ok:true};
}
export function writingInput(data:any){
 if(typeof data.id!=='string'||!/^[a-f0-9-]{36}$/.test(data.id)||!Number.isSafeInteger(data.revision)||data.revision<0)throw new AccountError(400,'INVALID_WRITING','No pudimos identificar este borrador. Vuelve a abrir tu cuaderno.');
 if(typeof data.title!=='string'||typeof data.body!=='string'||data.title.length>120||data.body.length>12000||!['draft','finished'].includes(data.status))throw new AccountError(400,'INVALID_WRITING','Usa hasta 120 caracteres en el título y 12.000 en tu poema.');
 if(!data.body.trim())throw new AccountError(400,'EMPTY_WRITING','Escribe al menos un verso. No tiene que ser perfecto.');
 return {id:data.id,title:data.title.trim()||'Sin título',body:data.body.trim(),status:data.status,revision:data.revision};
}
export async function saveWriting(db:D1Database,accountId:string,data:any){
 const w=writingInput(data),now=Date.now();
 if(w.revision===0){
  const result=await db.prepare('INSERT OR IGNORE INTO poetisa_writings(id,account_id,title,body,status,revision,created_at,updated_at,day) VALUES (?,?,?,?,?,1,?,?,?)').bind(w.id,accountId,w.title,w.body,w.status,now,now,localDay()).run();
  if(!result.meta.changes)throw new AccountError(409,'WRITING_CONFLICT','Este poema ya se guardó. Reabre la versión de tu cuaderno antes de cambiarlo.');
 }else{
  const result=await db.prepare('UPDATE poetisa_writings SET title=?,body=?,status=?,revision=revision+1,updated_at=? WHERE id=? AND account_id=? AND revision=?').bind(w.title,w.body,w.status,now,w.id,accountId,w.revision).run();
  if(!result.meta.changes)throw new AccountError(409,'WRITING_CONFLICT','Hay una versión más reciente o este poema ya no está disponible. Conserva tu texto y reabre el cuaderno.');
 }
 return {writing:await db.prepare('SELECT id,title,body,status,revision,created_at,updated_at,day FROM poetisa_writings WHERE id=? AND account_id=?').bind(w.id,accountId).first()};
}
