/* BOOST1000 — service worker kecil: tombol aksi di notifikasi (Prev / Play-Pause / Next) */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',e=>{
  const a=e.action;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    if(a){l.forEach(c=>c.postMessage({a}));return;}
    e.notification.close();
    return l.length?l[0].focus():self.clients.openWindow('./');}));
});
