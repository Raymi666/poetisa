const CACHE='poetisa-shell-pilot-v6';
const FILES=['/poetisa.html','/style.css','/app.js','/poetisa.svg','/icon.svg','/icon-pilot-192.png','/icon-pilot-512.png','/manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES).then(()=>self.skipWaiting()))));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE&&(k.startsWith('wavecito-shell-')||k.startsWith('poetisa-shell-'))).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
 const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
 const shell=url.pathname==='/poetisa'||url.pathname==='/'?'/poetisa.html':url.pathname;
 if(!FILES.includes(shell))return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&FILES.includes(url.pathname)){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return r;}).catch(()=>caches.match(shell).then(r=>r||new Response('Vuelve a abrir PoetisA cuando tengas conexión a Internet.',{status:503}))));
});
self.addEventListener('push',e=>{
 // Only generic copy is shown on the lock screen; no personal readings or words are stored here.
 let payload={};try{payload=e.data?.json()||{};}catch{}
 const title='PoetisA ♡',body=typeof payload.body==='string'?payload.body.slice(0,180):'Tu pequeño encuentro con la poesía te espera.';
 e.waitUntil(self.registration.showNotification(title,{body,icon:'/icon-pilot-192.png',badge:'/icon-pilot-192.png',tag:payload.tag==='poetisa-test'?'poetisa-test':'poetisa-daily',data:{url:'/poetisa'}}));
});
self.addEventListener('notificationclick',e=>{
 e.notification.close();e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(async windows=>{
  const existing=windows.find(w=>new URL(w.url).origin===self.location.origin);if(existing){if(new URL(existing.url).pathname!=='/poetisa'&&'navigate' in existing)await existing.navigate('/poetisa');await existing.focus();return;}return self.clients.openWindow('/poetisa');
 }));
});
