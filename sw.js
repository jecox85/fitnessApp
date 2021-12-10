const dynamicCache = 'Dynamic-cache-v2';
const staticCache = 'Static-cache-v2';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/exercises.js',
    '/js/materialize.min.js',
    '/js/ui.js',
    '/css/app.css',
    '/css/materialize.min.css',
    '/pages/fallback.html',
    '/pages/about.html',
    '/pages/workoutPage.html',
    '/pages/workoutStart.html',
    '/img/pushup.jpg',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

self.addEventListener('install', function(event){
    //fires when the browser installs the app.
    //Here we are logging the event and the contents of the object passed to the event
    //The purpose of this event is to give the service worker a place to setup the local
    //environment after the installation completes.
    //console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(caches.open(staticCache).then(function(cache){
        //console.log('SW: Precaching App shell.');
        cache.addAll(assets);
    }))
});
self.addEventListener('activate', function(event){
    //Fires after the service worker completes its installation.
    //It's a place for the service worker to clean up from previous service worker versions.
    //console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(caches.keys().then(keys => {
        return Promise.all(keys.filter(key => key !== staticCache).map(key => caches.delete(key)));
    }));
});
self.addEventListener('fetch', function(event){
    //fires whenever the app requests a resource (file or data)
    //console.log(`SW: Fetching ${event.request.url}`);
    //next, go get the requested resource from the network.
    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response || fetch(event.request).then((fetchRes) => {
                    return caches.open(dynamicCache).then((cache) =>{
                        cache.put(event.request.url, fetchRes.clone());
                        return fetchRes;
                    });
                })
            );
        }).catch(() => caches.match('/pages/fallback.html'))
    );  
});