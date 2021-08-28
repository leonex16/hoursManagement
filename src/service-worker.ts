/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

// Precache all of the assets generated by your build process.
// Their URLs are injected into the manifest variable below.
// This variable must be present somewhere in your service worker file,
// even if you decide not to use precaching. See https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Set up App Shell-style routing, so that all navigation requests
// are fulfilled with your index.html shell. Learn more at
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
	// Return false to exempt requests from being fulfilled by index.html.
	({ request, url }: { request: Request; url: URL }) => {
		// If this isn't a navigation, skip.
		if (request.mode !== 'navigate') {
			return false;
		}

		// If this is a URL that starts with /_, skip.
		if (url.pathname.startsWith('/_')) {
			return false;
		}

		// If this looks like a URL for a resource, because it contains
		// a file extension, skip.
		if (url.pathname.match(fileExtensionRegexp)) {
			return false;
		}

		// Return true to signal that we want to use the handler.
		return true;
	},
	createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'),
);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .png requests like those from in public/
registerRoute(
	// Add in any other file extensions or routing criteria as needed.
	({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
	// Customize this strategy as needed, e.g., by changing to CacheFirst.
	new StaleWhileRevalidate({
		cacheName: 'images',
		plugins: [
			// Ensure that once this runtime cache reaches a maximum size the
			// least-recently used images are removed.
			new ExpirationPlugin({ maxEntries: 50 }),
		],
	}),
);

// This allows the web app to trigger skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener('message', event => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

// Any other custom service worker logic can go here.

// Service worker custom
// const STATIC_CACHE = 'STATIC_CACHE_V1';
// const DYNAMIC_CACHE = 'DYNAMIC_CACHE_V1';

// const APP_SHELL_STATIC = [
// 	'asset-manifest.json',
// 	'favicon.ico',
// 	'icon-192-192.png',
// 	'icon-256-256.png',
// 	'icon-384-384.png',
// 	'icon-512-512.png',
// 	'index.html',
// 	'static/build/static/media/Montserrat-Italic.e7728c27.ttf',
// 	'static/build/static/media/Montserrat-SemiBold.fa8441f3.ttf',
// 	'static/build/static/media/Montserrat-BoldItalic.a32ae5d9.ttf',
// 	'static/build/static/media/Montserrat-ExtraLight.62a749ca.ttf',
// 	'static/build/static/media/Montserrat-Black.46e8b3d6.ttf',
// 	'static/build/static/media/Montserrat-Thin.4a799b11.ttf',
// 	'static/build/static/media/Montserrat-ThinItalic.3096cb47.ttf',
// 	'static/build/static/media/Montserrat-ExtraLightItalic.338d80b0.ttf',
// 	'static/build/static/media/Montserrat-BlackItalic.4404f7c6.ttf',
// 	'static/build/static/media/Montserrat-SemiBoldItalic.b0400063.ttf',
// 	'static/build/static/media/Montserrat-Regular.3cd78665.ttf',
// 	'static/build/static/media/Montserrat-MediumItalic.54b24d99.ttf',
// 	'static/build/static/media/Montserrat-LightItalic.d79f80a4.ttf',
// 	'static/build/static/media/Montserrat-Medium.e2d60bc4.ttf',
// 	'static/build/static/media/Montserrat-ExtraBold.1944c8d1.ttf',
// 	'static/build/static/media/Montserrat-ExtraBoldItalic.6849a97d.ttf',
// 	'static/build/static/media/Montserrat-Bold.079ca05d.ttf',
// 	'static/build/static/media/Montserrat-Light.02afb26f.ttf',
// ];
// const APP_SHELL_DYNAMIC = [];

// self.addEventListener('install', (event: ExtendableEvent) => {
// 	const initializerCache = caches.open(STATIC_CACHE).then(varCache => varCache.addAll(APP_SHELL_STATIC));

// 	event.waitUntil(initializerCache);
// });

// self.addEventListener('activate', (event: ExtendableEvent) => {});

// self.addEventListener('fetch', (event: ExtendableEvent) => {});
