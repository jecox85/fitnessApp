const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/exercises.js',
    '/js/materialize.min.js',
    '/js/ui.js',
    '/css/app.css',
    '/css/materialize.min.css',
    '/pages/about.html',
    '/pages/workoutPage.html',
    '/pages/workoutStart.html',
    '/img/pushup.jpg',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];
console.log(assets);

self.addEventListener('install', function(event){
    //fires when the browser installs the app.
    //Here we are logging the event and the contents of the object passed to the event
    //The purpose of this event is to give the service worker a place to setup the local
    //environment after the installation completes.
    //console.log(`SW: Event fired: ${event.type}`);
    event.waitUntil(caches.open('static').then(function(cache){
        //console.log('SW: Precaching App shell.');
        cache.addAll(assets);
    }))
});
self.addEventListener('activate', function(event){
    //Fires after the service worker completes its installation.
    //It's a place for the service worker to clean up from previous service worker versions.
    //console.log(`SW: Event fired: ${event.type}`);
});
self.addEventListener('fetch', function(event){
    //fires whenever the app requests a resource (file or data)
    //console.log(`SW: Fetching ${event.request.url}`);
    //next, go get the requested resource from the network.
    event.respondWith(fetch(event.request));
    caches.match(event.request).then((response) => {
        return response || fetch(event.request);
    })
})