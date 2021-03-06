'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global self */

var CACHE_NAME = 'next-prefetcher-v1';
var log = function log() {};

self.addEventListener('install', function () {
  log('Installing Next Prefetcher');
});

self.addEventListener('activate', function (e) {
  log('Activated Next Prefetcher');
  e.waitUntil(_promise2.default.all([resetCache(), notifyClients()]));
});

self.addEventListener('fetch', function (e) {
  var h = e.request.headers;
  var accept = h.getAll ? h.getAll('accept') : h.get('accept').split(',');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator3.default)(accept), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

self.addEventListener('message', function (e) {
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
  result.then(function (result) {
    payload.result = result;
    e.source.postMessage(payload);
  }).catch(function (error) {
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

  return self.caches.open(CACHE_NAME).then(function (cache) {
    return self.fetch(req).then(function (res) {
      return cache.put(req, res);
    });
  });
}

function getResponse(req) {
  return self.caches.open(CACHE_NAME).then(function (cache) {
    return cache.match(req);
  }).then(function (res) {
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

  return self.caches.open(CACHE_NAME).then(function (c) {
    cache = c;
    return cache.keys();
  }).then(function (items) {
    var deleteAll = items.map(function (item) {
      return cache.delete(item);
    });
    return _promise2.default.all(deleteAll);
  });
}

function notifyClients() {
  return self.clients.claim().then(function () {
    return self.clients.matchAll();
  }).then(function (clients) {
    var notifyAll = clients.map(function (client) {
      return client.postMessage({ action: 'NEXT_PREFETCHER_ACTIVATED' });
    });
    return _promise2.default.all(notifyAll);
  });
}