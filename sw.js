
const pageCached = [

    "index.html",
    "css/main.css",
    "js/main.js",
    "otherPage.html",
    "css/page1.css",
    "js/page1.js",
    "another/another.html",
    "css/page2.css",
    "js/page2.js",
]

const myPages = 'myPages';


self .addEventListener('install',(event) =>{
    console.log("Service worker installed");
    // self.skipWaiting();
    event.waitUntil(
        caches.open(myPages)
        .then((cache)=>{
            cache.addAll(pageCached);
        }).catch(() =>{
            console.log("error in caching",err);
        })
    )
})


self .addEventListener('activate',(event) =>{
    console.log("Service worker activated");
})

self .addEventListener('fetch',(event) =>{
    console.log("Service worker fetching",event.request.url);

    event.respondWith(

        caches.match(event.request).then((file) =>{

            if(file){

                console.log("file founded in cache",file);
                return file;
            }
            console.log("file founded in server" ,event.request.url);
            return fetch(event.request.url);

        })
        .catch((err) =>{
            console.log("error in page caching",err)
        })
    )
})
