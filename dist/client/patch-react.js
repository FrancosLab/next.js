'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var patched = false; // monkeypatch React for fixing https://github.com/facebook/react/issues/2461
// based on https://gist.github.com/Aldredcz/4d63b0a9049b00f54439f8780be7f0d8

exports.default = function () {
  var handleError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  if (patched) {
    throw new Error('React is already monkeypatched');
  }

  patched = true;

  var createElement = _react2.default.createElement;


  _react2.default.createElement = function (Component) {
    if (typeof Component === 'function') {
      var _Component = Component,
          prototype = _Component.prototype;

      // assumes it's a class component if render method exists.

      var isClassComponent = Boolean(prototype && prototype.render) ||
      // subclass of React.Component or PureComponent with no render method.
      // There's no render method in prototype
      // when it's created with class-properties.
      prototype instanceof _react2.default.Component || prototype instanceof _react2.default.PureComponent;

      if (isClassComponent) {
        if (prototype.render) {
          prototype.render = wrapRender(prototype.render);
        }

        // wrap the render method in runtime when the component initialized
        // for class-properties.
        Component = wrap(Component, withWrapOwnRender);
      } else {
        // stateless component
        Component = wrapRender(Component);
      }
    }

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return createElement.call.apply(createElement, [this, Component].concat(rest));
  };

  var componentPrototype = _react2.default.Component.prototype;
  var forceUpdate = componentPrototype.forceUpdate;


  componentPrototype.forceUpdate = function () {
    if (this.render) {
      this.render = wrapRender(this.render);
    }

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return forceUpdate.apply(this, args);
  };

  function wrapRender(render) {
    return wrap(render, withHandleError);
  }

  function withHandleError(fn) {
    try {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      return fn.apply(this, args);
    } catch (err) {
      handleError(err);
      return null;
    }
  }

  function withWrapOwnRender(fn) {
    for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
      args[_key4 - 1] = arguments[_key4];
    }

    var result = fn.apply(this, args);
    if (this.render && this.hasOwnProperty('render')) {
      this.render = wrapRender(this.render);
    }
    return result;
  }
};

function wrap(fn, around) {
  if (fn.__wrapped) {
    return fn.__wrapped;
  }

  var _fn = function _fn() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return around.call.apply(around, [this, fn].concat(args));
  };

  // copy all properties
  (0, _assign2.default)(_fn, fn);

  _fn.prototype = fn.prototype;

  _fn.__wrapped = fn.__wrapped = _fn;

  return _fn;
}