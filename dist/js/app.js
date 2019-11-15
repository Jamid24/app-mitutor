var url = window.location.href;
var urlWs ='https://wsbasic-mitutor.herokuapp.com/controller/';
var urlRoot = '/app-mitutor/';
var swLocation = '/app-mitutor/sw.js';

if ( navigator.serviceWorker ) {
    if ( url.includes('localhost') ) {
        urlRoot = '/index.html';
        swLocation = '/sw.js';
        urlWs ='http://localhost/ws-basic-mi-tutor/controller/'
    }
    navigator.serviceWorker.register( swLocation );
}
