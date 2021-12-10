//Does the browser support service workers?
//Service workers only work on a TLS connection (HTTPS)
if('serviceWorker' in navigator){
    //defer service working installation until page completes loading
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((reg) =>{
            console.log(`Service worker registration (Scope: ${reg.scope}`);
        }).catch(error => {
            console.log(`Service Worker Error (${error})`);
        });
    });
}
else{
    console.log('Service worker is not available.');
}


