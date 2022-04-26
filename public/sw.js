import {offlineFallback, staticResourceCache} from 'workbox-recipes';
import {clientsClaim} from 'workbox-core';
import {precacheAndRoute} from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);

clientsClaim();
self.skipWaiting();

staticResourceCache();

offlineFallback({
  pageFallback: '/index.html',
});
