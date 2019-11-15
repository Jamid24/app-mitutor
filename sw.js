// imports
importScripts('dist/js/sw-utils.js');

const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    // '/',
    'index.html',
    'pages/home.html',
    'pages/calendar.html',
    'pages/settings.html',
    'pages/footer.html',
    'pages/main-sidebar.html',
    'pages/navbar.html',
    'dist/img/favicon.ico',
    'dist/img/logo_mi_tutor.png',
    'dist/img/logo_small_mitutor.png',
    'dist/img/select-photo.jpg',
    'dist/img/user2-160x160.jpg',
    'dist/img/slider/banner1.png',
    'dist/img/slider/banner2.png',
    'dist/img/slider/banner3.png',
    'dist/img/slider/banner4.png',
    'dist/img/icons/Icon-36.png',
    'dist/img/icons/Icon-48.png',
    'dist/img/icons/Icon-72.png',
    'dist/img/icons/Icon-96.png',
    'dist/img/icons/Icon-144.png',
    'dist/img/icons/Icon-152.png',
    'dist/img/icons/Icon-192.png',
    'dist/img/icons/Icon-512.png',
    'dist/img/icons-ios/Icon-76.png',
    'dist/img/icons-ios/Icon-80.png',
    'dist/img/icons-ios/Icon-128.png',
    'dist/img/icons-ios/Icon-152.png',
    'dist/img/icons-ios/Icon-167.png',
    'dist/img/icons-ios/Icon-172.png',
    'dist/img/icons-ios/Icon-180.png',
    'dist/img/icons-ios/Icon-196.png',
    'dist/img/icons-ios/Icon-256.png',
    'dist/img/icons-ios/Icon-512.png',
    'dist/img/icons-ios/Icon-1024.png',
    'dist/css/custom.css',
    'dist/js/main.js',
    'dist/js/main-content.js',
    'dist/js/main-calendar.js',
    'dist/js/app.js',
    'dist/js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'plugins/fontawesome-free/css/all.min.css',
    'plugins/icheck-bootstrap/icheck-bootstrap.min.css',
    'dist/css/adminlte.min.css',
    'plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css',
    'plugins/fullcalendar/main.min.css',
    'plugins/fullcalendar-daygrid/main.min.css',
    'plugins/fullcalendar-timegrid/main.min.css',
    'plugins/fullcalendar-bootstrap/main.min.css',
    'plugins/jquery/jquery.min.js',
    'plugins/jquery-ui/jquery-ui.min.js',
    'plugins/bootstrap/js/bootstrap.bundle.min.js',
    'plugins/fullcalendar-bootstrap/main.min.js',
    'plugins/fullcalendar/locales/es.js',
    'plugins/moment/moment.min.js',
    'dist/js/adminlte.min.js'
];

self.addEventListener('install', e => {
    const cacheStatic = caches.open( STATIC_CACHE ).then(cache =>
        cache.addAll( APP_SHELL ));
    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache =>
        cache.addAll( APP_SHELL_INMUTABLE ));
    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );
});

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then( keys => {
        keys.forEach( key => {
            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }
        });
    });
    e.waitUntil( respuesta );
});

self.addEventListener( 'fetch', e => {
    const respuesta = caches.match( e.request ).then( res => {
        if ( res ) {
            return res;
        } else {
            return fetch( e.request ).then( newRes => {
                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );
            });
        }

    });
    e.respondWith( respuesta );
});
