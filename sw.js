const CACHE_NAME='spike-timer-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./sw.js','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(cached=>cached||fetch(e.request).then(r=>{if(e.request.method==='GET'){const cp=r.clone();caches.open(CACHE_NAME).then(c=>c.put(e.request,cp));}return r;}).catch(()=>cached)));});
