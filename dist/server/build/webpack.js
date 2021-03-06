'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _path = require('path');

var _crypto = require('crypto');

var _fs = require('fs');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

var _writeFileWebpackPlugin = require('write-file-webpack-plugin');

var _writeFileWebpackPlugin2 = _interopRequireDefault(_writeFileWebpackPlugin);

var _friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

var _friendlyErrorsWebpackPlugin2 = _interopRequireDefault(_friendlyErrorsWebpackPlugin);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _unlinkFilePlugin = require('./plugins/unlink-file-plugin');

var _unlinkFilePlugin2 = _interopRequireDefault(_unlinkFilePlugin);

var _watchPagesPlugin = require('./plugins/watch-pages-plugin');

var _watchPagesPlugin2 = _interopRequireDefault(_watchPagesPlugin);

var _jsonPagesPlugin = require('./plugins/json-pages-plugin');

var _jsonPagesPlugin2 = _interopRequireDefault(_jsonPagesPlugin);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var documentPage = (0, _path.join)('pages', '_document.js');
var defaultPages = ['_error.js', '_document.js'];
var nextPagesDir = (0, _path.join)(__dirname, '..', '..', 'pages');
var nextNodeModulesDir = (0, _path.join)(__dirname, '..', '..', '..', 'node_modules');
var interpolateNames = new _map2.default(defaultPages.map(function (p) {
  return [(0, _path.join)(nextPagesDir, p), 'dist/pages/' + p];
}));

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(dir) {
    var _this = this;

    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$dev = _ref2.dev,
        dev = _ref2$dev === undefined ? false : _ref2$dev,
        _ref2$quiet = _ref2.quiet,
        quiet = _ref2$quiet === undefined ? false : _ref2$quiet;

    var config, defaultEntries, mainJS, _minChunks, entry, plugins, nodePathList, mainBabelOptions, hasBabelRc, rules, webpackConfig;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dir = (0, _path.resolve)(dir);
            config = (0, _config2.default)(dir);
            defaultEntries = dev ? [(0, _path.join)(__dirname, '..', '..', 'client/webpack-hot-middleware-client')] : [];
            mainJS = dev ? require.resolve('../../client/next-dev') : require.resolve('../../client/next');
            _minChunks = void 0;

            entry = function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                var entries, pages, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, p, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _p, entryName;

                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        entries = { 'main.js': mainJS };
                        _context.next = 3;
                        return (0, _globPromise2.default)('pages/**/*.js', { cwd: dir });

                      case 3:
                        pages = _context.sent;
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 7;

                        for (_iterator = (0, _getIterator3.default)(pages); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                          p = _step.value;

                          entries[(0, _path.join)('bundles', p)] = [].concat(defaultEntries, ['./' + p + '?entry']);
                        }

                        _context.next = 15;
                        break;

                      case 11:
                        _context.prev = 11;
                        _context.t0 = _context['catch'](7);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                      case 15:
                        _context.prev = 15;
                        _context.prev = 16;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                        }

                      case 18:
                        _context.prev = 18;

                        if (!_didIteratorError) {
                          _context.next = 21;
                          break;
                        }

                        throw _iteratorError;

                      case 21:
                        return _context.finish(18);

                      case 22:
                        return _context.finish(15);

                      case 23:
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        _context.prev = 26;
                        for (_iterator2 = (0, _getIterator3.default)(defaultPages); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                          _p = _step2.value;
                          entryName = (0, _path.join)('bundles', 'pages', _p);

                          if (!entries[entryName]) {
                            entries[entryName] = [].concat(defaultEntries, [(0, _path.join)(nextPagesDir, _p) + '?entry']);
                          }
                        }

                        // calculate minChunks of CommonsChunkPlugin for later use
                        _context.next = 34;
                        break;

                      case 30:
                        _context.prev = 30;
                        _context.t1 = _context['catch'](26);
                        _didIteratorError2 = true;
                        _iteratorError2 = _context.t1;

                      case 34:
                        _context.prev = 34;
                        _context.prev = 35;

                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                          _iterator2.return();
                        }

                      case 37:
                        _context.prev = 37;

                        if (!_didIteratorError2) {
                          _context.next = 40;
                          break;
                        }

                        throw _iteratorError2;

                      case 40:
                        return _context.finish(37);

                      case 41:
                        return _context.finish(34);

                      case 42:
                        _minChunks = Math.max(2, pages.filter(function (p) {
                          return p !== documentPage;
                        }).length);

                        return _context.abrupt('return', entries);

                      case 44:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this, [[7, 11, 15, 23], [16,, 18, 22], [26, 30, 34, 42], [35,, 37, 41]]);
              }));

              return function entry() {
                return _ref3.apply(this, arguments);
              };
            }();

            plugins = [new _webpack2.default.LoaderOptionsPlugin({
              options: {
                context: dir,
                customInterpolateName: function customInterpolateName(url, name, opts) {
                  return interpolateNames.get(this.resourcePath) || url;
                }
              }
            }), new _writeFileWebpackPlugin2.default({
              exitOnErrors: false,
              log: false,
              // required not to cache removed files
              useHashIndex: false
            }), new _webpack2.default.optimize.CommonsChunkPlugin({
              name: 'commons',
              filename: 'commons.js',
              minChunks: function minChunks(module, count) {
                // NOTE: it depends on the fact that the entry funtion is always called
                // before applying CommonsChunkPlugin
                return count >= _minChunks;
              }
            }), new _jsonPagesPlugin2.default(), new _caseSensitivePathsWebpackPlugin2.default()];


            if (dev) {
              plugins.push(new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoEmitOnErrorsPlugin(), new _unlinkFilePlugin2.default(), new _watchPagesPlugin2.default(dir));
              if (!quiet) {
                plugins.push(new _friendlyErrorsWebpackPlugin2.default());
              }
            } else {
              plugins.push(new _webpack2.default.DefinePlugin({
                'process.env.NODE_ENV': (0, _stringify2.default)('production')
              }), new _webpack2.default.optimize.UglifyJsPlugin({
                compress: { warnings: false },
                sourceMap: false
              }));
            }

            nodePathList = (process.env.NODE_PATH || '').split(process.platform === 'win32' ? ';' : ':').filter(function (p) {
              return !!p;
            });
            mainBabelOptions = {
              babelrc: true,
              cacheDirectory: true,
              sourceMaps: dev ? 'both' : false,
              presets: []
            };
            hasBabelRc = (0, _fs.existsSync)((0, _path.join)(dir, '.babelrc'));

            if (hasBabelRc) {
              console.log('> Using .babelrc defined in your app root');
            } else {
              mainBabelOptions.presets.push(require.resolve('./babel/preset'));
            }

            rules = (dev ? [{
              test: /\.js(\?[^?]*)?$/,
              loader: 'hot-self-accept-loader',
              include: [(0, _path.join)(dir, 'pages'), nextPagesDir]
            }, {
              test: /\.js(\?[^?]*)?$/,
              loader: 'react-hot-loader/webpack',
              exclude: /node_modules/
            }] : []).concat([{
              test: /\.json$/,
              loader: 'json-loader'
            }, {
              test: /\.(js|json)(\?[^?]*)?$/,
              loader: 'emit-file-loader',
              include: [dir, nextPagesDir],
              exclude: function exclude(str) {
                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                );
              },

              options: {
                name: 'dist/[path][name].[ext]'
              }
            }, {
              loader: 'babel-loader',
              include: nextPagesDir,
              exclude: function exclude(str) {
                return (/node_modules/.test(str) && str.indexOf(nextPagesDir) !== 0
                );
              },

              options: {
                babelrc: false,
                cacheDirectory: true,
                sourceMaps: dev ? 'both' : false,
                presets: [require.resolve('./babel/preset')]
              }
            }, {
              test: /\.js(\?[^?]*)?$/,
              loader: 'babel-loader',
              include: [dir],
              exclude: function exclude(str) {
                return (/node_modules/.test(str)
                );
              },

              options: mainBabelOptions
            }]);
            webpackConfig = {
              context: dir,
              entry: entry,
              output: {
                path: (0, _path.join)(dir, '.next'),
                filename: '[name]',
                libraryTarget: 'commonjs2',
                publicPath: '/_webpack/',
                strictModuleExceptionHandling: true,
                devtoolModuleFilenameTemplate: function devtoolModuleFilenameTemplate(_ref4) {
                  var resourcePath = _ref4.resourcePath;

                  var hash = (0, _crypto.createHash)('sha1');
                  hash.update(Date.now() + '');
                  var id = hash.digest('hex').slice(0, 7);

                  // append hash id for cache busting
                  return 'webpack:///' + resourcePath + '?' + id;
                }
              },
              resolve: {
                modules: [nextNodeModulesDir, 'node_modules'].concat((0, _toConsumableArray3.default)(nodePathList))
              },
              resolveLoader: {
                modules: [nextNodeModulesDir, 'node_modules', (0, _path.join)(__dirname, 'loaders')].concat((0, _toConsumableArray3.default)(nodePathList))
              },
              plugins: plugins,
              module: {
                rules: rules
              },
              devtool: dev ? 'inline-source-map' : false,
              performance: { hints: false }
            };

            if (!config.webpack) {
              _context2.next = 19;
              break;
            }

            console.log('> Using "webpack" config function defined in next.config.js.');
            _context2.next = 18;
            return config.webpack(webpackConfig, { dev: dev });

          case 18:
            webpackConfig = _context2.sent;

          case 19:
            return _context2.abrupt('return', (0, _webpack2.default)(webpackConfig));

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function createCompiler(_x) {
    return _ref.apply(this, arguments);
  }

  return createCompiler;
}();