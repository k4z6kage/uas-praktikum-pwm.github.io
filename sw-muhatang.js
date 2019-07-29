const CACHE_NAME = "ayongekost-cache";
var urlsToCache = [
    '.',
    'bootstrap/css/bootstrap.min.csss',
    'images/ayam-goreng-sambal-pedas.jpg',
    'images/bakso.jpg',
    'images/martabak.jpg',
    'images/mie-kuah.jpg',
    'images/sate-kambing.jpg',
    'images/tahu-goreng.jpg',
    'index.html',
    'pages/offline.html',
    'pages/404.html'
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://readerapi.codepolitan.com/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function(response) {
        return response || fetch (event.request);
      })
    )
  }
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// (function() {
//   'use strict';

//   var filesToCache = [
//     '.',
//     'bootstrap/css/bootstrap.min.csss',
//     'images/ayam-goreng-sambal-pedas.jpg',
//     'images/bakso.jpg',
//     'images/martabak.jpg',
//     'images/mie-kuah.jpg',
//     'images/sate-kambing.jpg',
//     'images/tahu-goreng.jpg',
//     'index.html',
//     'pages/offline.html',
//     'pages/404.html'
//   ];

//   var staticCacheName = 'pages-cache-v2';

//   self.addEventListener('install', function(event) {
//     console.log('Attempting to install service worker and cache static assets');
//     event.waitUntil(
//       caches.open(staticCacheName)
//       .then(function(cache) {
//         return cache.addAll(filesToCache);
//       })
//     );
//   });

//   self.addEventListener('fetch', function(event) {
//     console.log('Fetch event for ', event.request.url);
//     event.respondWith(
//       caches.match(event.request).then(function(response) {
//         if (response) {
//           console.log('Found ', event.request.url, ' in cache');
//           return response;
//         }
//         console.log('Network request for ', event.request.url);
//         return fetch(event.request).then(function(response) {
//           if (response.status === 404) {
//             return caches.match('pages/404.html');
//           }
//           return caches.open(staticCacheName).then(function(cache) {
//             if (event.request.url.indexOf('test') < 0) {
//               cache.put(event.request.url, response.clone());
//             }
//             return response;
//           });
//         });
//       }).catch(function(error) {
//         console.log('Error, ', error);
//         return caches.match('pages/offline.html');
//       })
//     );
//   });

//   self.addEventListener('activate', function(event) {
//     console.log('Activating new service worker...');

//     var cacheWhitelist = [staticCacheName];

//     event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.map(function(cacheName) {
//             if (cacheWhitelist.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );
//   });

// })();
//fetch data json


  let alamatJson=new Request('lezatos.json');
  fetch(alamatJson)
    .then( function(resp){
      return resp.json();
    })
    .then(function(data){
      let output='';
       data.forEach(function(menu){
        output +=`
       <div class="col-md-4 mb-5">  
        <h4 class="card-title">${menu.Judul}</h4>
            <div class="card">
                <img class="card-img-top" src="${menu.Gambar}" alt="gambar belum di load">
              <div class="card-body">
                <p class="card-text">Deskripsi ${menu.deskripsi}</p>
              </div>
            <div class="card-footer">
                <a href="info kost/kost1.html" class="btn btn-primary">Find Out More!</a>
            </div>
            </div>
        </div>    
        `;
       });
    var tampil=document.getElementById('menu').innerHTML=output;   
}).catch(function(error){
  console.log(error);
});






