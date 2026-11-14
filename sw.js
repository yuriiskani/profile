/* BOOST1000 — service worker: offline + tombol aksi notifikasi (Prev / Play-Pause / Next) */
const C='b1000-v2',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();
  e.waitUntil(caches.open(C).then(k=>Promise.all(SHELL.map(u=>k.add(u).catch(()=>{})))));});
self.addEventListener('activate',e=>e.waitUntil(
  caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
/* jaringan dulu (selalu versi terbaru), kalau offline pakai simpanan */
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{
      if(r&&(r.ok||r.type==='opaque')){const c=r.clone();caches.open(C).then(k=>k.put(e.request,c)).catch(()=>{});}
      return r;})
    .catch(()=>caches.match(e.request).then(m=>m||(e.request.mode==='navigate'?caches.match('./').then(x=>x||caches.match('index.html')):undefined))));});
self.addEventListener('notificationclick',e=>{
  const a=e.action;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    if(a){l.forEach(c=>c.postMessage({a}));return;}
    e.notification.close();
    return l.length?l[0].focus():self.clients.openWindow('./');}));
});
