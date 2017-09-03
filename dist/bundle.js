/** ****/ (function(modules) { // webpackBootstrap
/** ****/ 	// The module cache
/** ****/ 	let installedModules = {};
/** ****/
/** ****/ 	// The require function
/** ****/ 	function __webpack_require__(moduleId) {
/** ****/
/** ****/ 		// Check if module is in cache
/** ****/ 		if (installedModules[moduleId]) {
/** ****/ 			return installedModules[moduleId].exports;
/** ****/}
/** ****/ 		// Create a new module (and put it into the cache)
/** ****/ 		let module = installedModules[moduleId] = {
/** ****/ 			i: moduleId,
/** ****/ 			l: false,
/** ****/ 			exports: {},
/** ****/ 		};
/** ****/
/** ****/ 		// Execute the module function
/** ****/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/** ****/
/** ****/ 		// Flag the module as loaded
/** ****/ 		module.l = true;
/** ****/
/** ****/ 		// Return the exports of the module
/** ****/ 		return module.exports;
/** ****/}
/** ****/
/** ****/
/** ****/ 	// expose the modules object (__webpack_modules__)
/** ****/ 	__webpack_require__.m = modules;
/** ****/
/** ****/ 	// expose the module cache
/** ****/ 	__webpack_require__.c = installedModules;
/** ****/
/** ****/ 	// define getter function for harmony exports
/** ****/ 	__webpack_require__.d = function(exports, name, getter) {
/** ****/ 		if (!__webpack_require__.o(exports, name)) {
/** ****/ 			Object.defineProperty(exports, name, {
/** ****/ 				configurable: false,
/** ****/ 				enumerable: true,
/** ****/ 				get: getter,
/** ****/ 			});
/** ****/}
/** ****/};
/** ****/
/** ****/ 	// getDefaultExport function for compatibility with non-harmony modules
/** ****/ 	__webpack_require__.n = function(module) {
/** ****/ 		let getter = module && module.__esModule ?
/** ****/ 			function getDefault() {
 return module['default'];
} :
/** ****/ 			function getModuleExports() {
 return module;
};
/** ****/ 		__webpack_require__.d(getter, 'a', getter);
/** ****/ 		return getter;
/** ****/};
/** ****/
/** ****/ 	// Object.prototype.hasOwnProperty.call
/** ****/ 	__webpack_require__.o = function(object, property) {
 return Object.prototype.hasOwnProperty.call(object, property);
};
/** ****/
/** ****/ 	// __webpack_public_path__
/** ****/ 	__webpack_require__.p = '';
/** ****/
/** ****/ 	// Load entry module and return exports
/** ****/ 	return __webpack_require__(__webpack_require__.s = 3);
/** ****/ })
/** **********************************************************************/
/** ****/ ([
/* 0 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


let _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
 return typeof obj;
} : function(obj) {
 return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
};

exports.__esModule = true;
exports.extend = extend;
exports.indexOf = indexOf;
exports.escapeExpression = escapeExpression;
exports.isEmpty = isEmpty;
exports.createFrame = createFrame;
exports.blockParams = blockParams;
exports.appendContextPath = appendContextPath;
let escape = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

let badChars = /[&<>"'`=]/g,
    possible = /[&<>"'`=]/;

function escapeChar(chr) {
  return escape[chr];
}

function extend(obj /* , ...source */) {
  for (let i = 1; i < arguments.length; i++) {
    for (let key in arguments[i]) {
      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
        obj[key] = arguments[i][key];
      }
    }
  }

  return obj;
}

let toString = Object.prototype.toString;

exports.toString = toString;
// Sourced from lodash
// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
/* eslint-disable func-style */
let isFunction = function isFunction(value) {
  return typeof value === 'function';
};
// fallback for older versions of Chrome and Safari
/* istanbul ignore next */
if (isFunction(/x/)) {
  exports.isFunction = isFunction = function isFunction(value) {
    return typeof value === 'function' && toString.call(value) === '[object Function]';
  };
}
exports.isFunction = isFunction;

/* eslint-enable func-style */

/* istanbul ignore next */
let isArray = Array.isArray || function(value) {
  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
};

exports.isArray = isArray;
// Older IE versions do not directly support indexOf so we must implement our own, sadly.

function indexOf(array, value) {
  for (let i = 0, len = array.length; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function escapeExpression(string) {
  if (typeof string !== 'string') {
    // don't escape SafeStrings, since they're already safe
    if (string && string.toHTML) {
      return string.toHTML();
    } else if (string == null) {
      return '';
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = '' + string;
  }

  if (!possible.test(string)) {
    return string;
  }
  return string.replace(badChars, escapeChar);
}

function isEmpty(value) {
  if (!value && value !== 0) {
    return true;
  } else if (isArray(value) && value.length === 0) {
    return true;
  } else {
    return false;
  }
}

function createFrame(object) {
  let frame = extend({}, object);
  frame._parent = object;
  return frame;
}

function blockParams(params, ids) {
  params.path = ids;
  return params;
}

function appendContextPath(contextPath, id) {
  return (contextPath ? contextPath + '.' : '') + id;
}
/** */}),
/* 1 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

let errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

function Exception(message, node) {
  let loc = node && node.loc,
      line = undefined,
      column = undefined;
  if (loc) {
    line = loc.start.line;
    column = loc.start.column;

    message += ' - ' + line + ':' + column;
  }

  let tmp = Error.prototype.constructor.call(this, message);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (let idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }

  /* istanbul ignore else */
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, Exception);
  }

  try {
    if (loc) {
      this.lineNumber = line;

      // Work around issue under safari where we can't directly set the column value
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(this, 'column', {
          value: column,
          enumerable: true,
        });
      } else {
        this.column = column;
      }
    }
  } catch (nop) {
    /* Ignore if the browser is very particular */
  }
}

Exception.prototype = new Error();

exports['default'] = Exception;
module.exports = exports['default'];
/** */}),
/* 2 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;
exports.HandlebarsEnvironment = HandlebarsEnvironment;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

let _utils = __webpack_require__(0);

let _exception = __webpack_require__(1);

let _exception2 = _interopRequireDefault(_exception);

let _helpers = __webpack_require__(8);

let _decorators = __webpack_require__(16);

let _logger = __webpack_require__(18);

let _logger2 = _interopRequireDefault(_logger);

let VERSION = '4.0.10';
exports.VERSION = VERSION;
let COMPILER_REVISION = 7;

exports.COMPILER_REVISION = COMPILER_REVISION;
let REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '== 1.x.x',
  5: '== 2.0.0-alpha.x',
  6: '>= 2.0.0-beta.1',
  7: '>= 4.0.0',
};

exports.REVISION_CHANGES = REVISION_CHANGES;
let objectType = '[object Object]';

function HandlebarsEnvironment(helpers, partials, decorators) {
  this.helpers = helpers || {};
  this.partials = partials || {};
  this.decorators = decorators || {};

  _helpers.registerDefaultHelpers(this);
  _decorators.registerDefaultDecorators(this);
}

HandlebarsEnvironment.prototype = {
  constructor: HandlebarsEnvironment,

  logger: _logger2['default'],
  log: _logger2['default'].log,

  registerHelper: function registerHelper(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple helpers');
      }
      _utils.extend(this.helpers, name);
    } else {
      this.helpers[name] = fn;
    }
  },
  unregisterHelper: function unregisterHelper(name) {
    delete this.helpers[name];
  },

  registerPartial: function registerPartial(name, partial) {
    if (_utils.toString.call(name) === objectType) {
      _utils.extend(this.partials, name);
    } else {
      if (typeof partial === 'undefined') {
        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
      }
      this.partials[name] = partial;
    }
  },
  unregisterPartial: function unregisterPartial(name) {
    delete this.partials[name];
  },

  registerDecorator: function registerDecorator(name, fn) {
    if (_utils.toString.call(name) === objectType) {
      if (fn) {
        throw new _exception2['default']('Arg not supported with multiple decorators');
      }
      _utils.extend(this.decorators, name);
    } else {
      this.decorators[name] = fn;
    }
  },
  unregisterDecorator: function unregisterDecorator(name) {
    delete this.decorators[name];
  },
};

let log = _logger2['default'].log;

exports.log = log;
exports.createFrame = _utils.createFrame;
exports.logger = _logger2['default'];
/** */}),
/* 3 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


let _login = __webpack_require__(4);

_login.loginManager.setParent(document.querySelector('#game'));
_login.loginManager.render();

console.log('Done!');
/** */}),
/* 4 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


Object.defineProperty(exports, '__esModule', {
    value: true,
});

let _createClass = function() {
 function defineProperties(target, props) {
 for (let i = 0; i < props.length; i++) {
 let descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor);
}
} return function(Constructor, protoProps, staticProps) {
 if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor;
};
}();

function _classCallCheck(instance, Constructor) {
 if (!(instance instanceof Constructor)) {
 throw new TypeError('Cannot call a class as a function');
}
}

let loginTemplate = __webpack_require__(5);

let LoginComponent = function() {
    function LoginComponent() {
        _classCallCheck(this, LoginComponent);
    }

    _createClass(LoginComponent, [{
        key: 'setParent',
        value: function setParent(domElement) {
            this.parent = domElement;
        },
    }, {
        key: 'render',
        value: function render() {
            this.parent.innerHTML = loginTemplate({name: 'Johan'});
        },
    }]);

    return LoginComponent;
}();

let loginManager = exports.loginManager = new LoginComponent();
/** */}),
/* 5 */
/** */ (function(module, exports, __webpack_require__) {
let Handlebars = __webpack_require__(6);
function __default(obj) {
 return obj && (obj.__esModule ? obj['default'] : obj);
}
module.exports = (Handlebars['default'] || Handlebars).template({'compiler': [7, '>= 4.0.0'], 'main': function(container, depth0, helpers, partials, data) {
    let helper;

  return 'Hello <h1>'
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing), (typeof helper === 'function' ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}), {'name': 'name', 'hash': {}, 'data': data}) : helper)))
    + '</h1>\r\n';
}, 'useData': true});
/** */}),
/* 6 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


// Create a simple path alias to allow browserify to resolve
// the runtime on a supported path.
module.exports = __webpack_require__(7)['default'];
/** */}),
/* 7 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    let newObj = {}; if (obj != null) {
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj; return newObj;
  }
}

let _handlebarsBase = __webpack_require__(2);

let base = _interopRequireWildcard(_handlebarsBase);

// Each of these augment the Handlebars object. No need to setup here.
// (This is done to easily share code between commonjs and browse envs)

let _handlebarsSafeString = __webpack_require__(19);

let _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

let _handlebarsException = __webpack_require__(1);

let _handlebarsException2 = _interopRequireDefault(_handlebarsException);

let _handlebarsUtils = __webpack_require__(0);

let Utils = _interopRequireWildcard(_handlebarsUtils);

let _handlebarsRuntime = __webpack_require__(20);

let runtime = _interopRequireWildcard(_handlebarsRuntime);

let _handlebarsNoConflict = __webpack_require__(21);

let _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

// For compatibility and usage outside of module systems, make the Handlebars object a namespace
function create() {
  let hb = new base.HandlebarsEnvironment();

  Utils.extend(hb, base);
  hb.SafeString = _handlebarsSafeString2['default'];
  hb.Exception = _handlebarsException2['default'];
  hb.Utils = Utils;
  hb.escapeExpression = Utils.escapeExpression;

  hb.VM = runtime;
  hb.template = function(spec) {
    return runtime.template(spec, hb);
  };

  return hb;
}

let inst = create();
inst.create = create;

_handlebarsNoConflict2['default'](inst);

inst['default'] = inst;

exports['default'] = inst;
module.exports = exports['default'];
/** */}),
/* 8 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;
exports.registerDefaultHelpers = registerDefaultHelpers;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

let _helpersBlockHelperMissing = __webpack_require__(9);

let _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

let _helpersEach = __webpack_require__(10);

let _helpersEach2 = _interopRequireDefault(_helpersEach);

let _helpersHelperMissing = __webpack_require__(11);

let _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

let _helpersIf = __webpack_require__(12);

let _helpersIf2 = _interopRequireDefault(_helpersIf);

let _helpersLog = __webpack_require__(13);

let _helpersLog2 = _interopRequireDefault(_helpersLog);

let _helpersLookup = __webpack_require__(14);

let _helpersLookup2 = _interopRequireDefault(_helpersLookup);

let _helpersWith = __webpack_require__(15);

let _helpersWith2 = _interopRequireDefault(_helpersWith);

function registerDefaultHelpers(instance) {
  _helpersBlockHelperMissing2['default'](instance);
  _helpersEach2['default'](instance);
  _helpersHelperMissing2['default'](instance);
  _helpersIf2['default'](instance);
  _helpersLog2['default'](instance);
  _helpersLookup2['default'](instance);
  _helpersWith2['default'](instance);
}
/** */}),
/* 9 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

let _utils = __webpack_require__(0);

exports['default'] = function(instance) {
  instance.registerHelper('blockHelperMissing', function(context, options) {
    let inverse = options.inverse,
        fn = options.fn;

    if (context === true) {
      return fn(this);
    } else if (context === false || context == null) {
      return inverse(this);
    } else if (_utils.isArray(context)) {
      if (context.length > 0) {
        if (options.ids) {
          options.ids = [options.name];
        }

        return instance.helpers.each(context, options);
      } else {
        return inverse(this);
      }
    } else {
      if (options.data && options.ids) {
        let data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
        options = {data: data};
      }

      return fn(context, options);
    }
  });
};

module.exports = exports['default'];
/** */}),
/* 10 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


let _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
 return typeof obj;
} : function(obj) {
 return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
};

exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

let _utils = __webpack_require__(0);

let _exception = __webpack_require__(1);

let _exception2 = _interopRequireDefault(_exception);

exports['default'] = function(instance) {
  instance.registerHelper('each', function(context, options) {
    if (!options) {
      throw new _exception2['default']('Must pass iterator to #each');
    }

    let fn = options.fn,
        inverse = options.inverse,
        i = 0,
        ret = '',
        data = undefined,
        contextPath = undefined;

    if (options.data && options.ids) {
      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
    }

    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = _utils.createFrame(options.data);
    }

    function execIteration(field, index, last) {
      if (data) {
        data.key = field;
        data.index = index;
        data.first = index === 0;
        data.last = !!last;

        if (contextPath) {
          data.contextPath = contextPath + field;
        }
      }

      ret = ret + fn(context[field], {
        data: data,
        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null]),
      });
    }

    if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
      if (_utils.isArray(context)) {
        for (let j = context.length; i < j; i++) {
          if (i in context) {
            execIteration(i, i, i === context.length - 1);
          }
        }
      } else {
        let priorKey = undefined;

        for (let key in context) {
          if (context.hasOwnProperty(key)) {
            // We're running the iterations one step out of sync so we can detect
            // the last iteration without have to scan the object twice and create
            // an itermediate keys array.
            if (priorKey !== undefined) {
              execIteration(priorKey, i - 1);
            }
            priorKey = key;
            i++;
          }
        }
        if (priorKey !== undefined) {
          execIteration(priorKey, i - 1, true);
        }
      }
    }

    if (i === 0) {
      ret = inverse(this);
    }

    return ret;
  });
};

module.exports = exports['default'];
/** */}),
/* 11 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

let _exception = __webpack_require__(1);

let _exception2 = _interopRequireDefault(_exception);

exports['default'] = function(instance) {
  instance.registerHelper('helperMissing', function() /* [args, ]options */{
    if (arguments.length === 1) {
      // A missing field in a {{foo}} construct.
      return undefined;
    } else {
      // Someone is actually trying to call something, blow up.
      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
    }
  });
};

module.exports = exports['default'];
/** */}),
/* 12 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

let _utils = __webpack_require__(0);

exports['default'] = function(instance) {
  instance.registerHelper('if', function(conditional, options) {
    if (_utils.isFunction(conditional)) {
      conditional = conditional.call(this);
    }

    // Default behavior is to render the positive path if the value is truthy and not empty.
    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

  instance.registerHelper('unless', function(conditional, options) {
    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
  });
};

module.exports = exports['default'];
/** */}),
/* 13 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

exports['default'] = function(instance) {
  instance.registerHelper('log', function() /* message, options */{
    let args = [undefined],
        options = arguments[arguments.length - 1];
    for (let i = 0; i < arguments.length - 1; i++) {
      args.push(arguments[i]);
    }

    let level = 1;
    if (options.hash.level != null) {
      level = options.hash.level;
    } else if (options.data && options.data.level != null) {
      level = options.data.level;
    }
    args[0] = level;

    instance.log(...args);
  });
};

module.exports = exports['default'];
/** */}),
/* 14 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

exports['default'] = function(instance) {
  instance.registerHelper('lookup', function(obj, field) {
    return obj && obj[field];
  });
};

module.exports = exports['default'];
/** */}),
/* 15 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

let _utils = __webpack_require__(0);

exports['default'] = function(instance) {
  instance.registerHelper('with', function(context, options) {
    if (_utils.isFunction(context)) {
      context = context.call(this);
    }

    let fn = options.fn;

    if (!_utils.isEmpty(context)) {
      let data = options.data;
      if (options.data && options.ids) {
        data = _utils.createFrame(options.data);
        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
      }

      return fn(context, {
        data: data,
        blockParams: _utils.blockParams([context], [data && data.contextPath]),
      });
    } else {
      return options.inverse(this);
    }
  });
};

module.exports = exports['default'];
/** */}),
/* 16 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;
exports.registerDefaultDecorators = registerDefaultDecorators;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

let _decoratorsInline = __webpack_require__(17);

let _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

function registerDefaultDecorators(instance) {
  _decoratorsInline2['default'](instance);
}
/** */}),
/* 17 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

let _utils = __webpack_require__(0);

exports['default'] = function(instance) {
  instance.registerDecorator('inline', function(fn, props, container, options) {
    let ret = fn;
    if (!props.partials) {
      props.partials = {};
      ret = function ret(context, options) {
        // Create a new partials stack frame prior to exec.
        let original = container.partials;
        container.partials = _utils.extend({}, original, props.partials);
        let ret = fn(context, options);
        container.partials = original;
        return ret;
      };
    }

    props.partials[options.args[0]] = options.fn;

    return ret;
  });
};

module.exports = exports['default'];
/** */}),
/* 18 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


exports.__esModule = true;

let _utils = __webpack_require__(0);

var logger = {
  methodMap: ['debug', 'info', 'warn', 'error'],
  level: 'info',

  // Maps a given level value to the `methodMap` indexes above.
  lookupLevel: function lookupLevel(level) {
    if (typeof level === 'string') {
      let levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
      if (levelMap >= 0) {
        level = levelMap;
      } else {
        level = parseInt(level, 10);
      }
    }

    return level;
  },

  // Can be overridden in the host environment
  log: function log(level) {
    level = logger.lookupLevel(level);

    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
      let method = logger.methodMap[level];
      if (!console[method]) {
        // eslint-disable-line no-console
        method = 'log';
      }

      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        message[_key - 1] = arguments[_key];
      }

      console[method](...message); // eslint-disable-line no-console
    }
  },
};

exports['default'] = logger;
module.exports = exports['default'];
/** */}),
/* 19 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';
// Build out our basic SafeString type


exports.__esModule = true;
function SafeString(string) {
  this.string = string;
}

SafeString.prototype.toString = SafeString.prototype.toHTML = function() {
  return '' + this.string;
};

exports['default'] = SafeString;
module.exports = exports['default'];
/** */}),
/* 20 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


let _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
 return typeof obj;
} : function(obj) {
 return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
};

exports.__esModule = true;
exports.checkRevision = checkRevision;
exports.template = template;
exports.wrapProgram = wrapProgram;
exports.resolvePartial = resolvePartial;
exports.invokePartial = invokePartial;
exports.noop = noop;
// istanbul ignore next

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {'default': obj};
}

// istanbul ignore next

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    let newObj = {}; if (obj != null) {
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }newObj['default'] = obj; return newObj;
  }
}

let _utils = __webpack_require__(0);

let Utils = _interopRequireWildcard(_utils);

let _exception = __webpack_require__(1);

let _exception2 = _interopRequireDefault(_exception);

let _base = __webpack_require__(2);

function checkRevision(compilerInfo) {
  let compilerRevision = compilerInfo && compilerInfo[0] || 1,
      currentRevision = _base.COMPILER_REVISION;

  if (compilerRevision !== currentRevision) {
    if (compilerRevision < currentRevision) {
      let runtimeVersions = _base.REVISION_CHANGES[currentRevision],
          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
    } else {
      // Use the embedded version info since the runtime doesn't know about this revision yet
      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
    }
  }
}

function template(templateSpec, env) {
  /* istanbul ignore next */
  if (!env) {
    throw new _exception2['default']('No environment passed to template');
  }
  if (!templateSpec || !templateSpec.main) {
    throw new _exception2['default']('Unknown template object: ' + (typeof templateSpec === 'undefined' ? 'undefined' : _typeof(templateSpec)));
  }

  templateSpec.main.decorator = templateSpec.main_d;

  // Note: Using env.VM references rather than local var references throughout this section to allow
  // for external users to override these as psuedo-supported APIs.
  env.VM.checkRevision(templateSpec.compiler);

  function invokePartialWrapper(partial, context, options) {
    if (options.hash) {
      context = Utils.extend({}, context, options.hash);
      if (options.ids) {
        options.ids[0] = true;
      }
    }

    partial = env.VM.resolvePartial.call(this, partial, context, options);
    let result = env.VM.invokePartial.call(this, partial, context, options);

    if (result == null && env.compile) {
      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
      result = options.partials[options.name](context, options);
    }
    if (result != null) {
      if (options.indent) {
        let lines = result.split('\n');
        for (let i = 0, l = lines.length; i < l; i++) {
          if (!lines[i] && i + 1 === l) {
            break;
          }

          lines[i] = options.indent + lines[i];
        }
        result = lines.join('\n');
      }
      return result;
    } else {
      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
    }
  }

  // Just add water
  let container = {
    strict: function strict(obj, name) {
      if (!(name in obj)) {
        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
      }
      return obj[name];
    },
    lookup: function lookup(depths, name) {
      let len = depths.length;
      for (let i = 0; i < len; i++) {
        if (depths[i] && depths[i][name] != null) {
          return depths[i][name];
        }
      }
    },
    lambda: function lambda(current, context) {
      return typeof current === 'function' ? current.call(context) : current;
    },

    escapeExpression: Utils.escapeExpression,
    invokePartial: invokePartialWrapper,

    fn: function fn(i) {
      let ret = templateSpec[i];
      ret.decorator = templateSpec[i + '_d'];
      return ret;
    },

    programs: [],
    program: function program(i, data, declaredBlockParams, blockParams, depths) {
      let programWrapper = this.programs[i],
          fn = this.fn(i);
      if (data || depths || blockParams || declaredBlockParams) {
        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
      } else if (!programWrapper) {
        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
      }
      return programWrapper;
    },

    data: function data(value, depth) {
      while (value && depth--) {
        value = value._parent;
      }
      return value;
    },
    merge: function merge(param, common) {
      let obj = param || common;

      if (param && common && param !== common) {
        obj = Utils.extend({}, common, param);
      }

      return obj;
    },
    // An empty object to use as replacement for null-contexts
    nullContext: Object.seal({}),

    noop: env.VM.noop,
    compilerInfo: templateSpec.compiler,
  };

  function ret(context) {
    let options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    let data = options.data;

    ret._setup(options);
    if (!options.partial && templateSpec.useData) {
      data = initData(context, data);
    }
    let depths = undefined,
        blockParams = templateSpec.useBlockParams ? [] : undefined;
    if (templateSpec.useDepths) {
      if (options.depths) {
        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
      } else {
        depths = [context];
      }
    }

    function main(context /* , options*/) {
      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
    }
    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
    return main(context, options);
  }
  ret.isTop = true;

  ret._setup = function(options) {
    if (!options.partial) {
      container.helpers = container.merge(options.helpers, env.helpers);

      if (templateSpec.usePartial) {
        container.partials = container.merge(options.partials, env.partials);
      }
      if (templateSpec.usePartial || templateSpec.useDecorators) {
        container.decorators = container.merge(options.decorators, env.decorators);
      }
    } else {
      container.helpers = options.helpers;
      container.partials = options.partials;
      container.decorators = options.decorators;
    }
  };

  ret._child = function(i, data, blockParams, depths) {
    if (templateSpec.useBlockParams && !blockParams) {
      throw new _exception2['default']('must pass block params');
    }
    if (templateSpec.useDepths && !depths) {
      throw new _exception2['default']('must pass parent depths');
    }

    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
  };
  return ret;
}

function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
  function prog(context) {
    let options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    let currentDepths = depths;
    if (depths && context != depths[0] && !(context === container.nullContext && depths[0] === null)) {
      currentDepths = [context].concat(depths);
    }

    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
  }

  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

  prog.program = i;
  prog.depth = depths ? depths.length : 0;
  prog.blockParams = declaredBlockParams || 0;
  return prog;
}

function resolvePartial(partial, context, options) {
  if (!partial) {
    if (options.name === '@partial-block') {
      partial = options.data['partial-block'];
    } else {
      partial = options.partials[options.name];
    }
  } else if (!partial.call && !options.name) {
    // This is a dynamic partial that returned a string
    options.name = partial;
    partial = options.partials[partial];
  }
  return partial;
}

function invokePartial(partial, context, options) {
  // Use the current closure context to save the partial-block if this partial
  let currentPartialBlock = options.data && options.data['partial-block'];
  options.partial = true;
  if (options.ids) {
    options.data.contextPath = options.ids[0] || options.data.contextPath;
  }

  let partialBlock = undefined;
  if (options.fn && options.fn !== noop) {
    (function() {
      options.data = _base.createFrame(options.data);
      // Wrapper function to get access to currentPartialBlock from the closure
      let fn = options.fn;
      partialBlock = options.data['partial-block'] = function partialBlockWrapper(context) {
        let options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        // Restore the partial-block from the closure for the execution of the block
        // i.e. the part inside the block of the partial call.
        options.data = _base.createFrame(options.data);
        options.data['partial-block'] = currentPartialBlock;
        return fn(context, options);
      };
      if (fn.partials) {
        options.partials = Utils.extend({}, options.partials, fn.partials);
      }
    })();
  }

  if (partial === undefined && partialBlock) {
    partial = partialBlock;
  }

  if (partial === undefined) {
    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
  } else if (partial instanceof Function) {
    return partial(context, options);
  }
}

function noop() {
  return '';
}

function initData(context, data) {
  if (!data || !('root' in data)) {
    data = data ? _base.createFrame(data) : {};
    data.root = context;
  }
  return data;
}

function executeDecorators(fn, prog, container, depths, data, blockParams) {
  if (fn.decorator) {
    let props = {};
    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
    Utils.extend(prog, props);
  }
  return prog;
}
/** */}),
/* 21 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';
/* WEBPACK VAR INJECTION */(function(global) {/* global window */
exports.__esModule = true;

exports['default'] = function(Handlebars) {
  /* istanbul ignore next */
  let root = typeof global !== 'undefined' ? global : window,
      $Handlebars = root.Handlebars;
  /* istanbul ignore next */
  Handlebars.noConflict = function() {
    if (root.Handlebars === Handlebars) {
      root.Handlebars = $Handlebars;
    }
    return Handlebars;
  };
};

module.exports = exports['default'];
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)));
/** */}),
/* 22 */
/** */ (function(module, exports, __webpack_require__) {
'use strict';


let _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function(obj) {
 return typeof obj;
} : function(obj) {
 return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
};

let g;

// This works in non-strict mode
g = function() {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function('return this')() || (1, eval)('this');
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;
/** */}),
/** ****/ ]);
// # sourceMappingURL=bundle.js.map
