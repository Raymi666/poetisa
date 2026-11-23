import {deviceFamily,browserFamily,installGuide,withTimeout} from './desktop.js';
import {initializeApp} from 'firebase/app';
import {getAuth,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,signOut,reload,getIdToken} from 'firebase/auth';
'use strict';
const $=id=>document.getElementById(id);
let deviceActive=false,deviceCheck='unknown',installObserved=false,routeIntentHandled=false;
const device=deviceFamily(navigator.userAgent,navigator.maxTouchPoints),browser=browserFamily(navigator.userAgent);
let workerError='';
let sessionEpoch=0,ignoreGuest=localStorage.getItem('poetisa_signed_out')==='true';
let config={},auth=null,authUser=null,authMode='signup',pendingName='',ownWritings=[],editingWriting=null,editorDirty=false;
let state={joined:false,name:'',history:[],today:'',used_today:false,ready:false,account:false},current=null,busy=false,editingName=false,installPrompt=null;
async function api(path,data){
 const epoch=sessionEpoch;const headers={'Content-Type':'application/json'};if(authUser)headers.Authorization='Bearer '+await getIdToken(authUser);
 let r;try{r=await fetch('/api/'+path,{method:data===undefined?'GET':'POST',headers,credentials:'same-origin',body:data===undefined?undefined:JSON.stringify(data)});}catch{throw Error('No pude conectar. Comprueba tu conexión a Internet y vuelve a abrir PoetisA.');}
 const result=await r.json();if(epoch!==sessionEpoch)throw Error('La sesión cambió. Abre tu cuaderno de nuevo.');if(!r.ok){if(result.join_required){state.joined=false;render();}const error=Error(result.error||'Algo no salió bien. Vuelve en un momento.');error.code=result.code;throw error;}return result;
}
function message(text,error=false){$('message').textContent=text;$('message').hidden=!text;$('message').classList.toggle('error',error);}
function formatDate(d){return new Date(d+'T12:00:00').toLocaleDateString('es',{day:'numeric',month:'long',year:'numeric'});}
function todayPoem(){return [...state.history].reverse().find(p=>p.kind==='published'&&p.date===state.today);}
function showPoem(p){
 current=p;$('empty-poem').hidden=true;$('poem-result').hidden=false;
 const w=p.work;
 $('poem-title').textContent=w.title;
 $('poem-body').textContent=w.text;
 $('poem-author').textContent=w.author;
 $('reading-kind').textContent='POEMA PUBLICADO · VOZ CHILENA';
 {
  $('poem-book').textContent=w.book+' · '+w.year;
  $('poem-source').href=w.sourceUrl;$('download-source').href=w.pdfUrl;$('poem-source').textContent='Fuente consultada · '+w.sourceLabel+'';
  $('poem-rights').textContent=w.rightsBasis+(w.transcriptionNote?' '+w.transcriptionNote:'');$('rights-source').href=w.rightsUrl;
  $('reason-label').textContent=p.relevance==='discovery'?'UN DESCUBRIMIENTO PARA HOY':'POR QUÉ TE LO ACERCO';
  $('poem-reason').textContent=p.reason;
 }
 $('poem-kicker').textContent='LECTURA PARA '+p.name.toLocaleUpperCase('es')+' · '+formatDate(p.date).toLocaleUpperCase('es');
 $('poem-tags').replaceChildren(...p.words.map(w=>{const e=document.createElement('span');e.textContent=w;return e;}));
}

function render(){
 const named=state.joined&&!!state.name&&!editingName;
 $('account-open').textContent=state.account?'Mi cuenta':'Crear mi cuenta';$('journey-card').hidden=!state.account;$('mobile-nav').hidden=!named;
 $('account-entry').hidden=!!authUser||state.joined;$('legacy-access').hidden=state.joined||!!authUser;renderPilot();
 if(state.account&&state.journey){const j=state.journey;$('journey-title').textContent=j.writingInvited?'Hoy también hay lugar para tu voz.':'De leer poesía a encontrar tu voz.';$('journey-copy').textContent=j.writingInvited?'Ya llevamos seis meses de camino. Te invito a escribir tu primer poema, y después, un poquito cada día. Si ya empezaste, sigamos. Sin prisa ni obligación.':'Nuestro camino comenzó el '+formatDate(j.registeredOn)+'. El '+formatDate(j.invitationOn)+' te invitaré a escribir tu primer poema. Si hoy tienes ganas, puedes empezar.';}
 $('name-submit').textContent=state.profile_required?'Abrir mi cuaderno personal ♡':'Vamos a conocernos';$('profile-consent').hidden=!state.profile_required;$('profile-accept').required=!!state.profile_required;
 $('onboarding').hidden=named;$('studio').hidden=!named;$('invite-form').hidden=state.joined||!!authUser;$('name-form').hidden=!state.joined&&!state.profile_required;
 $('history-open').disabled=!state.joined||busy;$('reminder-open').disabled=busy;
 if(!named)return;
 $('greeting').textContent='Hola, '+state.name+'.';$('date-label').textContent='TU ENCUENTRO CON LA POESÍA · '+formatDate(state.today).toLocaleUpperCase('es');
 $('greeting-copy').textContent=state.history.length?'Qué bueno volver a encontrarnos. Trae un pedacito de tu día: una imagen, un recuerdo o algo que te ronde el corazón. Buscaré una voz chilena que dialogue con tus palabras.':'Un gusto saludarte. Regálame tres palabras de tu día y buscaré un poema de una poeta o un poeta chileno para acompañarte.';
 $('words-heading').textContent=state.history.length?'¿Qué palabras te acompañan hoy?':'Partamos con el primer poema.';
 const p=todayPoem();$('poem-form').hidden=!!p||state.used_today;$('daily-note').hidden=!p&&!state.used_today;
 $('daily-note').textContent=p?'El poema de hoy ya está en nuestro cuaderno. Mañana nos esperan otras tres palabras. ♡':'Ya tuvimos nuestro encuentro de hoy. Mañana nos esperan otras tres palabras. ♡';
 if(p&&!current)showPoem(p);
}
async function refresh(){if(ignoreGuest&&!authUser){await api('logout',{});ignoreGuest=false;localStorage.removeItem('poetisa_signed_out');}state={joined:false,account:false,profile_required:false,name:'',history:[],used_today:false,...await api('status')};render();if(state.account)renderPush().catch(()=>{});}
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
$('invite-form').onsubmit=async e=>{e.preventDefault();e.submitter.disabled=true;try{await api('join',{code:$('invite-code').value.trim()});$('invite-code').value='';await refresh();message('Qué alegría que hayas venido. Empecemos por tu nombre.');$('name').focus();}catch(err){message(err.message,true);}finally{e.submitter.disabled=false;}};
$('name-form').onsubmit=async e=>{e.preventDefault();e.submitter.disabled=true;try{if(state.profile_required){await api('account',{name:$('name').value,consent:$('profile-accept').checked});await refresh();}else{const r=await api('name',{name:$('name').value});state.name=r.name;}editingName=false;current=null;render();message('');if(!$('poem-form').hidden)$('word1').focus();}catch(err){message(err.message,true);}finally{e.submitter.disabled=false;}};
$('change-name').onclick=()=>{if(busy)return;editingName=true;$('name').value=state.name;current=null;$('empty-poem').hidden=false;$('poem-result').hidden=true;render();$('name').focus();};
$('poem-form').onsubmit=async e=>{
 e.preventDefault();if(busy)return;busy=true;for(const id of ['generate','change-name','history-open','reminder-open'])$(id).disabled=true;$('writing').hidden=false;$('empty-poem').hidden=true;$('poem-result').hidden=true;message('');
 try{const r=await api('poem',{words:[1,2,3].map(i=>$('word'+i).value.trim())});showPoem(r.poem);state.used_today=true;if(!state.history.some(p=>p.id===r.poem.id))state.history.push(r.poem);message(r.cached?'Aquí está tu lectura de hoy.':'Tu lectura ya está guardada en nuestro cuaderno, con su autoría y su fuente.');}
 catch(err){message(err.message,true);$('poem-result').hidden=!current;$('empty-poem').hidden=!!current;}
 finally{busy=false;$('writing').hidden=true;for(const id of ['generate','change-name','history-open','reminder-open'])$(id).disabled=false;await refresh().catch(()=>{});}
};
function poemText(){
 if(!current)return '';
 const p=current;
 const w=p.work;
 return w.title+'\n'+w.author+'\n'+w.book+' ('+w.year+')\n\n'+w.text+'\n\nFuente: '+w.sourceUrl+'\n'+w.rightsBasis+'\nDerechos: '+w.rightsUrl+'\n\nSeleccionado por PoetisA para '+p.name+' · '+formatDate(p.date)+'\nTus palabras: '+p.words.join(', ')+'\n\nLectura de PoetisA (no forma parte del poema): '+p.reason+'\n';
}

$('copy').onclick=async()=>{try{await navigator.clipboard.writeText(poemText());message('Poema copiado. Ya puedes compartir ese abrazo.');}catch{message('No pude copiarlo. Usa Descargar poema .txt para llevarte el poema.',true);}};
$('download').onclick=()=>{if(!current)return;const url=URL.createObjectURL(new Blob([poemText()],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='PoetisA_'+current.date+'.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);};
$('print').onclick=()=>window.print();
function renderHistory(){
 const list=$('history-list');list.replaceChildren();
 if(!state.history.length){const p=document.createElement('p');p.textContent='Nuestro cuaderno aún está en blanco. La primera lectura nos espera.';list.append(p);}
 for(const p of [...state.history].sort((a,b)=>b.date.localeCompare(a.date))){const b=document.createElement('button');b.className='history-entry';const d=document.createElement('span');d.textContent=formatDate(p.date)+' · Para '+p.name;const t=document.createElement('strong');t.textContent=p.work.title;const w=document.createElement('small');w.textContent=p.work.author+' · '+p.words.join(' · ');b.append(d,t,w);b.onclick=()=>{showPoem(p);$('history-dialog').close();};list.append(b);}
 $('history-account-note').textContent=state.account?'Tu cuaderno es privado y te acompaña en los dispositivos donde inicias sesión.':'Estas lecturas pertenecen a la prueba de este navegador. Crea una cuenta para llevarlas contigo.';
 $('writings-tab').disabled=!state.account;$('export-notebook').hidden=!state.account;
}
$('history-open').onclick=async()=>{try{await refresh();renderHistory();showNotebookTab('readings');$('history-dialog').showModal();}catch(err){message(err.message,true);}};
function showNotebookTab(tab){$('history-list').hidden=tab!=='readings';$('writings-list').hidden=tab!=='writings';for(const t of ['readings','writings'])$(t+'-tab').setAttribute('aria-pressed',String(tab===t));if(tab==='writings')loadWritings();}
$('readings-tab').onclick=()=>showNotebookTab('readings');$('writings-tab').onclick=()=>showNotebookTab('writings');
async function loadWritings(){
 const list=$('writings-list');list.textContent='Abriendo tus poemas…';
 try{ownWritings=(await api('writings')).writings;list.replaceChildren();if(!ownWritings.length)list.textContent='Tu primera página está esperando. Una imagen, una línea: eso también es comenzar.';
 for(const w of ownWritings){const b=document.createElement('button');b.className='history-entry';const title=document.createElement('strong');title.textContent=w.title;const date=document.createElement('small');date.textContent=formatDate(w.day)+' · '+(w.status==='draft'?'Borrador':'Poema guardado');b.append(title,date);b.onclick=()=>{$('history-dialog').close();openEditor(w);};list.append(b);}
 }catch(err){list.textContent=err.message;}
}
function standalone(){return window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true||installObserved;}
function pushSupported(){return 'serviceWorker' in navigator&&'PushManager' in window&&'Notification' in window;}
async function workerReady(){
 if(workerError)throw Error(workerError);
 if(!('serviceWorker' in navigator))throw Error('Este navegador no permite preparar los avisos. Abre PoetisA en Chrome, Edge o Safari actualizado.');
 return withTimeout(navigator.serviceWorker.ready,8000,'No pude preparar los avisos. Comprueba Internet y vuelve a abrir PoetisA.');
}
async function deviceSubscription(){if(!('serviceWorker' in navigator))return null;const r=await workerReady();return r.pushManager?.getSubscription()||null;}
function renderPilot(){
 $('setup-account-status').textContent=state.account?'Tu cuaderno privado está abierto.':authUser&&!authUser.emailVerified?'Confirma el enlace que llegó a tu correo.':'Crea tu cuenta y confirma tu correo.';
 $('setup-account').textContent=state.account?'Ver mi cuenta':'Crear o abrir mi cuenta';
 const installed=standalone();$('setup-install-status').textContent=installed?'PoetisA está disponible como aplicación en este equipo.':'Un icono propio en Windows o Mac.';$('setup-install').textContent=installed?'Ver opciones de instalación':'Instalar en mi equipo';
 $('install').textContent=installed?'Mi aplicación':'Instalar PoetisA';
 $('setup-push-status').textContent=!state.account?'Un aviso a las 9:00 de Chile, si tú quieres.':deviceActive?'Avisos activados en este equipo a las 9:00 de Chile.':deviceCheck==='failed'?'No pudimos comprobar los avisos. Revisa tu conexión.':'Activa los avisos y prueba el primero en este equipo.';
 $('setup-reminders').textContent=deviceActive?'Probar o gestionar avisos':'Preparar mi recordatorio';
}
async function renderPush(){
 const epoch=sessionEpoch,supported=pushSupported();
 $('push-enable').hidden=true;$('push-test').hidden=true;$('push-disable').hidden=true;$('push-signin').hidden=state.account;
 $('push-device-help').textContent=device==='ios'?'En iPhone, instala PoetisA desde Safari y ábrela desde su icono antes de activar los avisos.':'El permiso se activa una vez en cada equipo. Tu cuaderno seguirá siendo el mismo.';
 if(!state.account){deviceActive=false;deviceCheck='unknown';$('push-status').textContent='Abre tu cuenta y confirma tu correo para recibir avisos en este equipo.';renderPilot();return;}
 if(!supported){deviceActive=false;deviceCheck='unsupported';$('push-status').textContent=device==='ios'?'Abre PoetisA desde el icono de tu pantalla de inicio. Los avisos requieren iOS 16.4 o posterior.':'Este navegador no admite avisos. Prueba Chrome, Edge o Safari actualizados.';renderPilot();return;}
 if(!config.push_ready){$('push-status').textContent='El servicio de avisos está temporalmente en preparación. Puedes seguir usando tu cuaderno.';return;}
 $('push-status').textContent='Comprobando los avisos de este equipo…';
 try{
  const sub=await deviceSubscription();let active=false;
  if(sub)active=(await api('push-status?endpoint='+encodeURIComponent(sub.endpoint))).active;
  if(epoch!==sessionEpoch)return;
  deviceActive=active;deviceCheck='checked';
  $('push-enable').hidden=active||Notification.permission==='denied';$('push-disable').hidden=!sub;$('push-test').hidden=!active;
  $('push-status').textContent=active?'Avisos activados a las 9:00 de Chile. Envía una prueba para comprobar cómo se ven en tu equipo.':Notification.permission==='denied'?'Los avisos están bloqueados. Permítelos en los ajustes de notificaciones del navegador o de la app y vuelve aquí.':'Puedes activar un aviso diario. El navegador te pedirá permiso.';
 }catch(err){if(epoch!==sessionEpoch)return;deviceActive=false;deviceCheck='failed';$('push-status').textContent=err.message;}
 renderPilot();
}
async function openReminders(){if(!$('reminder-dialog').open)$('reminder-dialog').showModal();await renderPush();}
$('reminder-open').onclick=openReminders;$('setup-reminders').onclick=openReminders;
$('push-signin').onclick=()=>{$('reminder-dialog').close();if(state.profile_required){$('name').focus();message('Elige tu nombre y abre tu cuaderno para activar los avisos.');}else openAccount();};
$('push-enable').onclick=async e=>{
 e.target.disabled=true;try{
  if(!state.account||!config.push_ready||!pushSupported())throw Error('Abre tu cuenta en un navegador compatible para activar los avisos.');
  if(Notification.permission==='denied')throw Error('Permite los avisos en los ajustes del navegador y vuelve a intentarlo.');
  // The browser permission must be requested synchronously from this user click.
  const permission=await Notification.requestPermission();if(permission!=='granted')throw Error('No activamos los avisos. Puedes volver cuando quieras.');
  const registration=await workerReady(),raw=config.vapid_public_key.replace(/-/g,'+').replace(/_/g,'/');
  const key=Uint8Array.from(atob(raw.padEnd(Math.ceil(raw.length/4)*4,'=')),c=>c.charCodeAt(0));
  let sub=await registration.pushManager.getSubscription();if(!sub)sub=await registration.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:key});
  try{await api('push-subscribe',{subscription:sub.toJSON(),consent:true});}catch(err){await sub.unsubscribe();throw err;}
  await renderPush();
 }catch(err){$('push-status').textContent=err.message;}finally{e.target.disabled=false;}
};
$('push-disable').onclick=async e=>{e.target.disabled=true;try{const sub=await deviceSubscription();if(sub){if(state.account)await api('push-unsubscribe',{endpoint:sub.endpoint});await sub.unsubscribe();}deviceActive=false;await renderPush();$('push-status').textContent='Listo. Este equipo ya no recibirá avisos.';}catch(err){$('push-status').textContent=err.message;}finally{e.target.disabled=false;}};
$('push-test').onclick=async e=>{e.target.disabled=true;$('push-status').textContent='Enviando una prueba a este equipo…';try{const sub=await deviceSubscription();const r=await api('push-test',{endpoint:sub?.endpoint});$('push-status').textContent=r.message+' Si no la ves, abre la ayuda de abajo. Puedes pedir una prueba por día en cada equipo.';}catch(err){$('push-status').textContent=err.message;}finally{e.target.disabled=false;}};
$('privacy-open').onclick=()=>$('privacy-dialog').showModal();
function renderInstall(){
 const [platform,agent]=$('install-platform').value.split('-'),guide=installGuide(platform,agent);
 $('install-guide-title').textContent=guide.title;$('install-note').textContent=guide.note;
 $('install-steps').replaceChildren(...guide.steps.map(text=>{const item=document.createElement('li');item.textContent=text;return item;}));
 $('install-state').textContent=standalone()?'PoetisA ya está instalada en este equipo. Ábrela desde su icono cuando quieras.':'Al instalarla tendrás un icono propio. Tu cuenta y tus lecturas se conservan.';
 $('install-now').hidden=!installPrompt||standalone();
}
function openInstall(){renderInstall();if(!$('install-dialog').open)$('install-dialog').showModal();}
const guideOption=device==='mac'?('mac-'+(['safari','edge'].includes(browser)?browser:'chrome')):device==='ios'?'ios-safari':device==='android'?'android-chrome':'windows-'+(browser==='edge'?'edge':'chrome');
$('install-platform').value=guideOption;$('install-platform').onchange=renderInstall;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;renderInstall();});
window.addEventListener('appinstalled',()=>{installObserved=true;installPrompt=null;renderInstall();renderPilot();});
window.matchMedia('(display-mode: standalone)').addEventListener('change',()=>{renderPilot();renderInstall();});
$('install').onclick=openInstall;$('setup-install').onclick=openInstall;
$('install-now').onclick=async e=>{if(!installPrompt){renderInstall();return;}const prompt=installPrompt;e.target.disabled=true;try{await prompt.prompt();const choice=await prompt.userChoice;installPrompt=null;renderInstall();$('install-state').textContent=choice.outcome==='accepted'?'Instalación aceptada. Cuando aparezca el icono, abre PoetisA desde él.':'Puedes instalarla más adelante. Tu cuaderno sigue disponible aquí.';}catch{$('install-state').textContent='Puedes instalarla desde el menú del navegador. Sigue los pasos de abajo.';}finally{e.target.disabled=false;}};
$('install-next').onclick=()=>{$('install-dialog').close();openReminders();};
$('setup-account').onclick=()=>{if(state.profile_required){$('name').focus();return;}openAccount();};
$('share-pilot').onclick=async()=>{const url=location.origin+'/poetisa?install=1';const text='Te invito a probar PoetisA: tres palabras, un poema chileno y un cuaderno para ti. Puedes instalarla en Windows o Mac. '+url;$('share-status').hidden=false;try{if(navigator.share){await navigator.share({title:'PoetisA · Piloto',text:'Tres palabras, un poema chileno y un cuaderno para ti.',url});$('share-status').textContent='Puedes seguir disfrutando de tu cuaderno.';}else{await navigator.clipboard.writeText(text);$('share-status').textContent='Invitación copiada. Pégala en WhatsApp o en un correo.';}}catch(err){if(err.name==='AbortError'){$('share-status').hidden=true;return;}$('share-status').textContent='Comparte este enlace: '+url;}};
function showConnection(){const offline=!navigator.onLine;$('connection-status').hidden=!offline;$('connection-status').textContent=offline?'Estás sin conexión. Vuelve a conectarte para abrir tu cuenta, buscar un poema o guardar cambios.':'';}
window.addEventListener('online',showConnection);window.addEventListener('offline',showConnection);showConnection();
function handleLaunchIntent(){if(routeIntentHandled)return;routeIntentHandled=true;const params=new URLSearchParams(location.search);if(params.get('install')==='1')openInstall();else if(params.get('view')==='reminders')openReminders();else if(params.get('view')==='notebook'&&state.joined)$('history-open').click();}
document.querySelector('.brand').onclick=e=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});};
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!busy)refresh().catch(()=>{});});
if('serviceWorker'in navigator)navigator.serviceWorker.register('/sw.js').catch(()=>{workerError='No pude preparar la aplicación. Recarga PoetisA con conexión a Internet.';});
start().catch(err=>message(err.message,true));

$('collection-open').onclick=async()=>{
 $('collection-dialog').showModal();
 try{
  const c=await api('collection');
  $('collection-intro').textContent=c.count+' poemas publicados de '+new Set(c.poems.map(p=>p.author)).size+' voces chilenas. Conservamos los versos de las ediciones consultadas y enlazamos sus fuentes.';
  const list=$('collection-list');list.replaceChildren();
  for(const p of c.poems){
   const item=document.createElement('article');item.className='collection-entry';
   const title=document.createElement('h3');title.textContent=p.title;
   const by=document.createElement('p');by.textContent=p.author+' · '+p.book+' ('+p.year+')';
   const themes=document.createElement('p');themes.className='collection-themes';themes.textContent=p.themes.join(' · ');
   const link=document.createElement('a');link.textContent='Consultar edición';link.href=p.sourceUrl;link.target='_blank';link.rel='noopener noreferrer';
   item.append(title,by,themes,link);list.append(item);
  }
 }catch{$('collection-intro').textContent='No pude abrir la biblioteca en este momento. Vuelve a intentarlo con conexión a Internet.';}
};

function clearPrivateView(){sessionEpoch++;deviceActive=false;deviceCheck='unknown';current=null;ownWritings=[];editingWriting=null;editorDirty=false;state={joined:false,account:false,name:'',history:[],today:'',used_today:false};$('poem-result').hidden=true;$('empty-poem').hidden=false;for(const id of ['poem-title','poem-author','poem-body','poem-reason','poem-tags','poem-kicker','account-email','verify-email','history-list','writings-list'])$(id).textContent='';$('original-title').value='';$('original-body').value='';document.querySelectorAll('dialog[open]').forEach(d=>d.close());}
function authError(err){const code=err?.code||'';if(code.includes('invalid-credential')||code.includes('wrong-password')||code.includes('user-not-found'))return 'El correo o la contraseña no coinciden. Revísalos o recupera tu acceso.';if(code.includes('email-already-in-use'))return 'Ese correo ya tiene una cuenta. Puedes entrar o recuperar tu contraseña.';if(code.includes('weak-password')||code.includes('password-does-not-meet-requirements'))return 'Elige una contraseña más segura: al menos 10 caracteres, con letras y números.';if(code.includes('too-many-requests'))return 'Hemos hecho varios intentos. Espera un momento antes de volver.';if(code.includes('network'))return 'Comprueba tu conexión a Internet.';if(code.includes('invalid-email'))return 'Revisa que tu correo esté bien escrito.';return err.message?.startsWith('Firebase:')?'No pudimos completar el acceso. Inténtalo en un momento.':err.message||'No pudimos abrir tu cuenta.';}
function renderAccount(){
 const verified=!!authUser?.emailVerified,waiting=!!authUser&&!verified;
 $('auth-form').hidden=!config.accounts_ready||!!authUser;$('auth-tabs').hidden=!config.accounts_ready||!!authUser;$('auth-pending').hidden=!!config.accounts_ready;
 $('verify-panel').hidden=!waiting;$('account-panel').hidden=!state.account;$('auth-heading').textContent=state.account?'Tu lugar entre los versos.':waiting?'Nos falta un pequeño paso.':'Un cuaderno que va contigo.';
 $('auth-name-wrap').hidden=authMode!=='signup';$('auth-name').required=authMode==='signup';$('auth-password').autocomplete=authMode==='signup'?'new-password':'current-password';$('auth-password').minLength=authMode==='signup'?10:1;$('auth-submit').textContent=authMode==='signup'?'Crear mi cuenta ♡':'Entrar a mi cuaderno';$('auth-consent-wrap').hidden=authMode!=='signup';$('auth-consent').required=authMode==='signup';
 $('account-email').textContent=state.email||authUser?.email||'';$('verify-email').textContent=authUser?.email||'';
 for(const m of ['signup','login'])$('auth-'+m).setAttribute('aria-pressed',String(m===authMode));
 $('import-readings').hidden=!state.account;
}
function openAccount(mode){if(mode)authMode=mode;renderAccount();$('auth-message').textContent='';$('account-dialog').showModal();}
$('account-open').onclick=()=>openAccount();$('create-account').onclick=()=>openAccount('signup');$('existing-account').onclick=()=>openAccount('login');
$('auth-signup').onclick=()=>{authMode='signup';renderAccount();};$('auth-login').onclick=()=>{authMode='login';renderAccount();};
$('auth-form').onsubmit=async e=>{
 e.preventDefault();e.submitter.disabled=true;$('auth-message').textContent='Abriendo tu pequeño espacio…';
 try{const email=$('auth-email').value.trim(),password=$('auth-password').value;
 if(authMode==='signup'){pendingName=$('auth-name').value.trim();const credential=await createUserWithEmailAndPassword(auth,email,password);await sendEmailVerification(credential.user,{url:location.origin+'/poetisa'});$('auth-message').textContent='Te enviamos un enlace para confirmar tu correo. Revisa también la carpeta de correo no deseado.';}
 else await signInWithEmailAndPassword(auth,email,password);
 $('auth-password').value='';renderAccount();
 }catch(err){$('auth-message').textContent=authError(err);}finally{e.submitter.disabled=false;}
};
$('reset-password').onclick=async()=>{
 const email=$('auth-email').value.trim();if(!email||!$('auth-email').checkValidity()){$('auth-message').textContent='Escribe primero tu correo en el campo de arriba.';return;}
 try{await sendPasswordResetEmail(auth,email,{url:location.origin+'/poetisa'});$('auth-message').textContent='Si ese correo tiene una cuenta, recibirá un enlace para recuperar el acceso. Revisa también correo no deseado.';}catch(err){$('auth-message').textContent=authError(err);}
};
$('resend-verification').onclick=async e=>{e.target.disabled=true;try{await sendEmailVerification(auth.currentUser,{url:location.origin+'/poetisa'});$('auth-message').textContent='Enlace enviado. Revisa tu correo.';}catch(err){$('auth-message').textContent=authError(err);}finally{e.target.disabled=false;}};
$('check-verification').onclick=async e=>{e.target.disabled=true;try{await reload(auth.currentUser);authUser=auth.currentUser;await getIdToken(authUser,true);if(!authUser.emailVerified)throw Error('Todavía falta confirmar el enlace del correo.');await refresh();$('account-dialog').close();if(state.profile_required){$('name').value=pendingName;$('name').focus();}}catch(err){$('auth-message').textContent=authError(err);}finally{e.target.disabled=false;}};
async function logout(){
 if(editorDirty&&!confirm('Hay un poema sin guardar. ¿Quieres cerrar sesión y descartar estos cambios?'))return;
 ignoreGuest=true;localStorage.setItem('poetisa_signed_out','true');
 let disconnected=false;
 try{const sub=await deviceSubscription();if(sub){try{if(state.account)await api('push-unsubscribe',{endpoint:sub.endpoint});}catch{disconnected=true;}try{await sub.unsubscribe();}catch{disconnected=true;}}}catch{disconnected=true;}
 try{await api('logout',{});}catch{disconnected=true;}
 try{if(auth)await signOut(auth);}catch{message('No pude cerrar la sesión. Vuelve a intentarlo antes de compartir este dispositivo.',true);return;}
 authUser=null;clearPrivateView();render();
 message(disconnected?'Sesión cerrada en este dispositivo. Cuando recuperes conexión, abre PoetisA para completar la desactivación de sus avisos.':'Tu cuaderno queda guardado. Hasta nuestro próximo encuentro. ♡');
}
$('logout').onclick=logout;$('verify-logout').onclick=logout;
$('import-readings').onclick=async()=>{if(!confirm('¿Las lecturas de la prueba guardadas en este navegador son tuyas? Solo se trasladarán los días que todavía no estén en tu cuenta.'))return;try{const r=await api('import-readings',{consent:true});await refresh();$('auth-message').textContent=r.moved+' lecturas trasladadas.'+(r.remaining?' Hay '+r.remaining+' lecturas de días que ya existen en tu cuenta; se conservan en la prueba.':'');}catch(err){$('auth-message').textContent=err.message;}};
async function start(){
 config=await api('config');
 if(!config.accounts_ready){await refresh();handleLaunchIntent();return;}
 auth=getAuth(initializeApp(config.firebase));auth.languageCode='es';
 onAuthStateChanged(auth,async user=>{
  clearPrivateView();authUser=user;if(user){ignoreGuest=false;localStorage.removeItem('poetisa_signed_out');}
  if(user&&!user.emailVerified){render();openAccount();return;}
  try{await refresh();if(state.profile_required){$('name').value=pendingName;message('Elige tu nombre para abrir tu cuaderno.');}else if(state.account)message('Tu cuaderno está contigo. ♡');handleLaunchIntent();}catch(err){message(authError(err),true);}
 });
}
function downloadFile(text,name,type='text/plain;charset=utf-8'){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1500);}
$('export-notebook').onclick=async()=>{try{const book=await api('notebook');let text='MI CUADERNO DE POETISA — '+book.name+'\n\nLECTURAS\n';for(const r of book.readings)text+='\n'+r.date+' · '+r.words.join(', ')+'\n'+r.work.title+' — '+r.work.author+'\n'+r.work.book+' ('+r.work.year+')\n\n'+r.work.text+'\n\nFuente: '+r.work.sourceUrl+'\n'+r.work.rightsBasis+'\n\nLectura de PoetisA: '+r.reason+'\n\n';text+='\nMIS POEMAS\n';for(const w of book.writings)text+='\n'+w.title+' · '+w.day+' · '+(w.status==='draft'?'Borrador':'Poema')+'\n\n'+w.body+'\n\n';downloadFile(text,'Mi_cuaderno_PoetisA.txt');}catch(err){message(err.message,true);}};
function openEditor(w=null){if(!state.account){openAccount();return;}editingWriting=w?{...w}:{id:crypto.randomUUID(),revision:0,status:'draft'};$('original-title').value=w?.title||'';$('original-body').value=w?.body||'';$('writing-status').value=w?.status||'draft';$('editor-message').textContent='Solo tú puedes leerlo. Lo guardaré cuando pulses el botón.';editorDirty=false;$('delete-writing').hidden=!w;$('editor-dialog').showModal();$('original-body').focus();}
$('write-open').onclick=()=>openEditor();$('write-new').onclick=()=>{$('history-dialog').close();openEditor();};
for(const id of ['original-title','original-body','writing-status'])$(id).addEventListener('input',()=>{editorDirty=true;$('editor-message').textContent='Cambios sin guardar.';});
function mayCloseEditor(){return !editorDirty||confirm('Tu poema tiene cambios sin guardar. ¿Quieres descartarlos?');}
$('editor-close').onclick=()=>{if(mayCloseEditor()){$('editor-dialog').close();editorDirty=false;}};
$('editor-dialog').addEventListener('cancel',e=>{if(!mayCloseEditor())e.preventDefault();else editorDirty=false;});
window.addEventListener('beforeunload',e=>{if(editorDirty){e.preventDefault();e.returnValue='';}});
$('original-form').onsubmit=async e=>{e.preventDefault();e.submitter.disabled=true;try{const r=await api('writing',{...editingWriting,title:$('original-title').value,body:$('original-body').value,status:$('writing-status').value});editingWriting=r.writing;editorDirty=false;$('delete-writing').hidden=false;$('editor-message').textContent='Guardado en tu cuaderno privado. Tu voz ya tiene un lugar aquí. ♡';}catch(err){$('editor-message').textContent=err.message+' Puedes descargar lo escrito para conservarlo.';}finally{e.submitter.disabled=false;}};
$('download-writing').onclick=()=>downloadFile(($('original-title').value||'Sin título')+'\n\n'+$('original-body').value,'Mi_poema_PoetisA.txt');
$('delete-writing').onclick=async()=>{if(!confirm('¿Borrar este poema de tu cuaderno? Esta acción no se puede deshacer.'))return;try{await api('writing-delete',{id:editingWriting.id,revision:editingWriting.revision});editorDirty=false;$('editor-dialog').close();message('Poema eliminado de tu cuaderno.');}catch(err){$('editor-message').textContent=err.message;}};
$('mobile-home').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});$('mobile-book').onclick=()=>$('history-open').click();$('mobile-write').onclick=()=>openEditor();$('mobile-account').onclick=()=>openAccount();
