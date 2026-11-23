import {importX509, jwtVerify} from 'jose';

export class AccountError extends Error {
 constructor(public status:number, public code:string, message:string){super(message);}
}
export type AuthConfig={FIREBASE_PROJECT_ID?:string;FIREBASE_WEB_API_KEY?:string;FIREBASE_AUTH_DOMAIN?:string};
export type Identity={id:string;uid:string;email:string};
export const authReady=(env:AuthConfig)=>!!(env.FIREBASE_PROJECT_ID&&env.FIREBASE_WEB_API_KEY&&env.FIREBASE_AUTH_DOMAIN);
export async function sha256(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value))),b=>b.toString(16).padStart(2,'0')).join('');}
let certificates:{expires:number;values:Record<string,string>}|null=null;
const CERTS='https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
const unauthorized=()=>new AccountError(401,'SIGN_IN_REQUIRED','Vuelve a iniciar sesión para abrir tu cuaderno.');

/** Validate signature/project/time, then check current email, disabled and revoked state. */
export async function identity(req:Request,env:AuthConfig):Promise<Identity|null>{
 const header=req.headers.get('authorization');if(!header)return null;
 if(!authReady(env))throw new AccountError(503,'AUTH_NOT_READY','Estamos preparando el registro por correo. Tus lecturas de prueba siguen disponibles.');
 if(!/^Bearer [A-Za-z0-9_.-]{40,16000}$/.test(header))throw unauthorized();
 const token=header.slice(7),project=env.FIREBASE_PROJECT_ID!;
 if(!certificates||certificates.expires<Date.now()){
  let response:Response;try{response=await fetch(CERTS,{signal:AbortSignal.timeout(10000)});}catch{throw new AccountError(503,'AUTH_UNAVAILABLE','No pudimos comprobar tu cuenta. Inténtalo en un momento.');}
  if(!response.ok)throw new AccountError(503,'AUTH_UNAVAILABLE','No pudimos comprobar tu cuenta. Inténtalo en un momento.');
  certificates={expires:Date.now()+Math.min(Number(response.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1]||300),3600)*1000,values:await response.json()};
 }
 let claims;
 try{
  const result=await jwtVerify(token,async head=>{
   if(head.alg!=='RS256'||!head.kid||!certificates?.values[head.kid])throw unauthorized();
   return importX509(certificates.values[head.kid],'RS256');
  },{algorithms:['RS256'],issuer:`https://securetoken.google.com/${project}`,audience:project,requiredClaims:['exp','iat','auth_time','sub']});
  claims=result.payload;
  const now=Math.floor(Date.now()/1000),firebase=claims.firebase as {tenant?:string}|undefined;
  if(!claims.sub||claims.sub.length>128||typeof claims.iat!=='number'||claims.iat>now||typeof claims.auth_time!=='number'||claims.auth_time>now||firebase?.tenant)throw unauthorized();
 }catch{throw unauthorized();}
 let response:Response;
 try{response=await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(env.FIREBASE_WEB_API_KEY!)}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken:token}),signal:AbortSignal.timeout(10000)});}catch{throw new AccountError(503,'AUTH_UNAVAILABLE','No pudimos comprobar tu cuenta. Inténtalo en un momento.');}
 if(response.status>=500||response.status===429)throw new AccountError(503,'AUTH_UNAVAILABLE','El servicio de acceso está ocupado. Inténtalo en un momento.');
 if(!response.ok)throw unauthorized();
 const data=await response.json() as {users?:Array<{localId:string;email?:string;emailVerified?:boolean;disabled?:boolean;validSince?:string}>};
 const user=data.users?.[0];
 if(data.users?.length!==1||!user||user.localId!==claims.sub||user.disabled||!user.email||!Number.isFinite(Number(user.validSince||0))||Number(claims.auth_time)<Number(user.validSince||0))throw unauthorized();
 if(!user.emailVerified)throw new AccountError(403,'EMAIL_NOT_VERIFIED','Confirma tu correo para cuidar tu cuaderno. Revisa el mensaje que te enviamos.');
 return {id:await sha256(`firebase:${project}:${user.localId}`),uid:user.localId,email:user.email};
}
