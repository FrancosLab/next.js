'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _patchReact = require('./patch-react');

var _patchReact2 = _interopRequireDefault(_patchReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// apply patch first
(0, _patchReact2.default)(function (err) {
  console.error(err);

  _promise2.default.resolve().then(function () {
    onError(err);
  });
});

require('react-hot-loader/patch');

var next = window.next = require('./');

next.default(onError);

function onError(err) {
  // just show the debug screen but don't render ErrorComponent
  // so that the current component doesn't lose props
  next.render({ err: err });
}