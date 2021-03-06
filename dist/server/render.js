'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serveStaticWithGzip = exports.renderErrorJSON = exports.renderJSON = exports.renderError = exports.render = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var render = exports.render = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, pathname, query, opts) {
    var html;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return renderToHTML(req, res, pathname, opts);

          case 2:
            html = _context.sent;

            sendHTML(res, html, req.method);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function render(_x, _x2, _x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();

var renderError = exports.renderError = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(err, req, res, pathname, query, opts) {
    var html;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return renderErrorToHTML(err, req, res, query, opts);

          case 2:
            html = _context2.sent;

            sendHTML(res, html, req.method);

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function renderError(_x6, _x7, _x8, _x9, _x10, _x11) {
    return _ref2.apply(this, arguments);
  };
}();

var doRender = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, pathname, query) {
    var _ref4 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {},
        err = _ref4.err,
        page = _ref4.page,
        buildId = _ref4.buildId,
        _ref4$dir = _ref4.dir,
        dir = _ref4$dir === undefined ? process.cwd() : _ref4$dir,
        _ref4$dev = _ref4.dev,
        dev = _ref4$dev === undefined ? false : _ref4$dev,
        _ref4$staticMarkup = _ref4.staticMarkup,
        staticMarkup = _ref4$staticMarkup === undefined ? false : _ref4$staticMarkup;

    var _ref5, _ref6, Component, Document, ctx, _ref7, _ref8, props, component, errorComponent, renderPage, docProps, doc;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            page = page || pathname;
            _context3.next = 3;
            return _promise2.default.all([(0, _require2.default)((0, _path.join)(dir, '.next', 'dist', 'pages', page)), (0, _require2.default)((0, _path.join)(dir, '.next', 'dist', 'pages', '_document'))]);

          case 3:
            _ref5 = _context3.sent;
            _ref6 = (0, _slicedToArray3.default)(_ref5, 2);
            Component = _ref6[0];
            Document = _ref6[1];

            Component = Component.default || Component;
            Document = Document.default || Document;
            ctx = { err: err, req: req, res: res, pathname: pathname, query: query };
            _context3.next = 12;
            return _promise2.default.all([(0, _utils.loadGetInitialProps)(Component, ctx), (0, _readPage2.default)((0, _path.join)(dir, '.next', 'bundles', 'pages', page)), (0, _readPage2.default)((0, _path.join)(dir, '.next', 'bundles', 'pages', '_error'))]);

          case 12:
            _ref7 = _context3.sent;
            _ref8 = (0, _slicedToArray3.default)(_ref7, 3);
            props = _ref8[0];
            component = _ref8[1];
            errorComponent = _ref8[2];

            if (!res.finished) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt('return');

          case 19:
            renderPage = function renderPage() {
              var app = (0, _react.createElement)(_app2.default, {
                Component: Component,
                props: props,
                err: err,
                router: new _router.Router(pathname, query)
              });

              var render = staticMarkup ? _server.renderToStaticMarkup : _server.renderToString;

              var html = void 0;
              var head = void 0;
              try {
                html = render(app);
              } finally {
                head = _head2.default.rewind() || (0, _head.defaultHead)();
              }
              return { html: html, head: head };
            };

            _context3.next = 22;
            return (0, _utils.loadGetInitialProps)(Document, (0, _extends3.default)({}, ctx, { renderPage: renderPage }));

          case 22:
            docProps = _context3.sent;
            doc = (0, _react.createElement)(Document, (0, _extends3.default)({
              __NEXT_DATA__: {
                component: component,
                errorComponent: errorComponent,
                props: props,
                pathname: pathname,
                query: query,
                buildId: buildId,
                err: err && dev ? errorToJSON(err) : null
              },
              dev: dev,
              staticMarkup: staticMarkup
            }, docProps));
            return _context3.abrupt('return', '<!DOCTYPE html>' + (0, _server.renderToStaticMarkup)(doc));

          case 25:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function doRender(_x13, _x14, _x15, _x16) {
    return _ref3.apply(this, arguments);
  };
}();

var renderJSON = exports.renderJSON = function () {
  var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, page) {
    var _ref10 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref10$dir = _ref10.dir,
        dir = _ref10$dir === undefined ? process.cwd() : _ref10$dir;

    var pagePath;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _resolve2.default)((0, _path.join)(dir, '.next', 'bundles', 'pages', page));

          case 2:
            pagePath = _context4.sent;
            return _context4.abrupt('return', serveStaticWithGzip(req, res, pagePath));

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function renderJSON(_x18, _x19, _x20) {
    return _ref9.apply(this, arguments);
  };
}();

var renderErrorJSON = exports.renderErrorJSON = function () {
  var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(err, req, res) {
    var _ref12 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref12$dir = _ref12.dir,
        dir = _ref12$dir === undefined ? process.cwd() : _ref12$dir,
        _ref12$dev = _ref12.dev,
        dev = _ref12$dev === undefined ? false : _ref12$dev;

    var component;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _readPage2.default)((0, _path.join)(dir, '.next', 'bundles', 'pages', '_error'));

          case 2:
            component = _context5.sent;


            sendJSON(res, {
              component: component,
              err: err && dev ? errorToJSON(err) : null
            }, req.method);

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function renderErrorJSON(_x22, _x23, _x24) {
    return _ref11.apply(this, arguments);
  };
}();

var serveStaticWithGzip = exports.serveStaticWithGzip = function () {
  var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res, path) {
    var encoding, gzipPath, contentType;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            encoding = (0, _accepts2.default)(req).encodings(['gzip']);

            if (!(encoding !== 'gzip')) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt('return', serveStatic(req, res, path));

          case 3:
            gzipPath = path + '.gz';
            _context6.prev = 4;
            _context6.next = 7;
            return _fs2.default.stat(gzipPath);

          case 7:
            _context6.next = 14;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6['catch'](4);

            if (!(_context6.t0.code === 'ENOENT')) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt('return', serveStatic(req, res, path));

          case 13:
            throw _context6.t0;

          case 14:
            contentType = _mimeTypes2.default.lookup(path) || 'application/octet-stream';

            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Encoding', 'gzip');
            return _context6.abrupt('return', serveStatic(req, res, gzipPath));

          case 18:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[4, 9]]);
  }));

  return function serveStaticWithGzip(_x26, _x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}();

exports.renderToHTML = renderToHTML;
exports.renderErrorToHTML = renderErrorToHTML;
exports.sendHTML = sendHTML;
exports.sendJSON = sendJSON;
exports.serveStatic = serveStatic;

var _path = require('path');

var _react = require('react');

var _server = require('react-dom/server');

var _send = require('send');

var _send2 = _interopRequireDefault(_send);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _accepts = require('accepts');

var _accepts2 = _interopRequireDefault(_accepts);

var _mimeTypes = require('mime-types');

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _require = require('./require');

var _require2 = _interopRequireDefault(_require);

var _resolve = require('./resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _readPage = require('./read-page');

var _readPage2 = _interopRequireDefault(_readPage);

var _router = require('../lib/router');

var _utils = require('../lib/utils');

var _head = require('../lib/head');

var _head2 = _interopRequireDefault(_head);

var _app = require('../lib/app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderToHTML(req, res, pathname, query, opts) {
  return doRender(req, res, pathname, query, opts);
}

function renderErrorToHTML(err, req, res, pathname, query) {
  var opts = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  return doRender(req, res, pathname, query, (0, _extends3.default)({}, opts, { err: err, page: '_error' }));
}

function sendHTML(res, html, method) {
  if (res.finished) return;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', Buffer.byteLength(html));
  res.end(method === 'HEAD' ? null : html);
}

function sendJSON(res, obj, method) {
  if (res.finished) return;

  var json = (0, _stringify2.default)(obj);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(json));
  res.end(method === 'HEAD' ? null : json);
}

function errorToJSON(err) {
  var name = err.name,
      message = err.message,
      stack = err.stack;

  var json = { name: name, message: message, stack: stack };

  if (name === 'ModuleBuildError') {
    // webpack compilation error
    var rawRequest = err.module.rawRequest;

    json.module = { rawRequest: rawRequest };
  }

  return json;
}

function serveStatic(req, res, path) {
  return new _promise2.default(function (resolve, reject) {
    (0, _send2.default)(req, path).on('error', reject).pipe(res).on('finish', resolve);
  });
}