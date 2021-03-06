/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global self */

var CACHE_NAME = 'next-prefetcher-v1';
var log = () => {};

self.addEventListener('install', () => {
  log('Installing Next Prefetcher');
});

self.addEventListener('activate', e => {
  log('Activated Next Prefetcher');
  e.waitUntil(Promise.all([resetCache(), notifyClients()]));
});

self.addEventListener('fetch', e => {
  var h = e.request.headers;
  var accept = h.getAll ? h.getAll('accept') : h.get('accept').split(',');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = accept[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var a = _step.value;

      // bypass Server Sent Events
      if (a === 'text/event-stream') return;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  e.respondWith(getResponse(e.request));
});

self.addEventListener('message', e => {
  switch (e.data.action) {
    case 'ADD_URL':
      {
        log('CACHING ', e.data.url);
        sendReply(e, cacheUrl(e.data.url));
        break;
      }
    case 'RESET':
      {
        log('RESET');
        sendReply(e, resetCache());
        break;
      }
    default:
      console.error('Unknown action: ' + e.data.action);
  }
});

function sendReply(e, result) {
  var payload = { action: 'REPLY', actionType: e.data.action, replyFor: e.data.id };
  result.then(result => {
    payload.result = result;
    e.source.postMessage(payload);
  }).catch(error => {
    payload.error = error.message;
    e.source.postMessage(payload);
  });
}

function cacheUrl(url) {
  var req = new self.Request(url, {
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json'
    }
  });

  return self.caches.open(CACHE_NAME).then(cache => {
    return self.fetch(req).then(res => cache.put(req, res));
  });
}

function getResponse(req) {
  return self.caches.open(CACHE_NAME).then(cache => cache.match(req)).then(res => {
    if (res) {
      log('CACHE HIT: ' + req.url);
      return res;
    } else {
      log('CACHE MISS: ' + req.url);
      return self.fetch(req);
    }
  });
}

function resetCache() {
  var cache = void 0;

  return self.caches.open(CACHE_NAME).then(c => {
    cache = c;
    return cache.keys();
  }).then(function (items) {
    var deleteAll = items.map(item => cache.delete(item));
    return Promise.all(deleteAll);
  });
}

function notifyClients() {
  return self.clients.claim().then(() => self.clients.matchAll()).then(clients => {
    var notifyAll = clients.map(client => {
      return client.postMessage({ action: 'NEXT_PREFETCHER_ACTIVATED' });
    });
    return Promise.all(notifyAll);
  });
}

/***/ })
/******/ ]);