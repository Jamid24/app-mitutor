
const url = window.location.href;
const urlWs ='http://localhost/ws-basic-mi-tutor/controller/';
const swLocation = '/app-mitutor/sw.js';


if ( navigator.serviceWorker ) {
    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }
    navigator.serviceWorker.register( swLocation );
}
