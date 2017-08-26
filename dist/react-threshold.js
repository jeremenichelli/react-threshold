(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactThreshold"] = factory(require("react"), require("react-dom"));
	else
		root["ReactThreshold"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _reactDom = __webpack_require__(2);

var _threshold2 = __webpack_require__(3);

var _threshold3 = _interopRequireDefault(_threshold2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReactThreshold = function (_Component) {
  _inherits(ReactThreshold, _Component);

  function ReactThreshold(props) {
    _classCallCheck(this, ReactThreshold);

    /*
     * initialize state with negative
     * values to avoid unnecessary update
     */
    var _this = _possibleConstructorReturn(this, (ReactThreshold.__proto__ || Object.getPrototypeOf(ReactThreshold)).call(this, props));

    _this.state = {
      area: 0,
      trajectory: {
        x: -1,
        y: -1
      }
    };

    var throttleInterval = _this.props.throttleInterval;


    _this._updateState = throttle(_this._updateState.bind(_this), throttleInterval);
    return _this;
  }

  _createClass(ReactThreshold, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // memoize constant properties
      this._element = (0, _reactDom.findDOMNode)(this.child);

      // run initial check
      this._updateState();

      // start listening for changes
      window.addEventListener('scroll', this._updateState);
      window.addEventListener('resize', this._updateState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this._updateState);
      window.removeEventListener('resize', this._updateState);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof this.props.children.type !== 'function') {
        throw new TypeError('[react-threshold] single component as children expected');
      }
    }
  }, {
    key: '_updateState',
    value: function _updateState() {
      var _this2 = this;

      var _threshold = (0, _threshold3.default)(this._element),
          area = _threshold.area,
          trajectory = _threshold.trajectory;

      this.setState(function () {
        var updatedMetrics = { area: area, trajectory: trajectory };

        _this2.props.onUpdate(updatedMetrics);

        return updatedMetrics;
      });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      // if element is not visible prevent updates
      var xVisible = nextState.trajectory.x >= 0 && nextState.trajectory.x <= 1;
      var yVisible = nextState.trajectory.y >= 0 && nextState.trajectory.y <= 1;

      return xVisible && yVisible || this.props.forceUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return (0, _react.cloneElement)(this.props.children, {
        area: this.state.area,
        trajectory: this.state.trajectory,
        ref: function ref(child) {
          return _this3.child = child;
        }
      });
    }
  }]);

  return ReactThreshold;
}(_react.Component);

ReactThreshold.defaultProps = {
  forceUpdate: false,
  onUpdate: function onUpdate(f) {
    return f;
  },
  throttleInterval: 100
};

/**
 * Prevents unnecessary calls through time interval polling
 * @method throttle
 * @param {Function} fn
 * @returns {Function}
 */
var throttle = function throttle(fn, interval) {
  var timer = null;

  return function throttledAction() {
    if (timer) {
      return;
    }
    timer = setTimeout(function () {
      fn.apply(this, arguments);
      timer = null;
    }, interval);
  };
};

exports.default = ReactThreshold;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* threshold v0.3.0 - 2017 Jeremias Menichelli - MIT License */
(function (global, factory) {
  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.threshold = factory();
})(undefined, function () {
  'use strict';

  /**
   * Returns metrics regarding an element's position in the viewport
   * @method threshold
   * @param {Node} element
   * @returns {Object}
   */

  function threshold(element) {
    var rects = element.getBoundingClientRect();

    var upperThreshold = (threshold._viewport.height - rects.top) / rects.height;
    var bottomThreshold = rects.bottom / rects.height;

    var leftThreshold = (threshold._viewport.width - rects.left) / rects.width;
    var rightThreshold = rects.right / rects.width;

    var horizontalTrajectory = rects.width + threshold._viewport.width;
    var verticalTrajectory = rects.height + threshold._viewport.height;

    /**
     * area
     *
     * This value represents the area of the component present in the viewport
     *
     * It is calculated by using the min value between the distance from the
     * top, right, bottom and left edges of the element and its height and weight
     *
     */

    var minXArea = Math.min(leftThreshold, rightThreshold);
    var xArea = Math.min(1, Math.max(minXArea, 0));

    var minYArea = Math.min(upperThreshold, bottomThreshold);
    var yArea = Math.min(1, Math.max(minYArea, 0));

    /**
     * trajectory
     *
     * This value represents the translation of the element from the moment
     * it enters the viewport until it gets out
     *
     * It is calculated by measuring the distance between the top and left edge
     * of the viewport and the bottom and right edge of the element
     *
     */
    var xTrajectory = (horizontalTrajectory - rects.right) / horizontalTrajectory;
    var yTrajectory = (verticalTrajectory - rects.bottom) / verticalTrajectory;

    return {
      area: xArea * yArea,
      trajectory: {
        x: xTrajectory,
        y: yTrajectory
      }
    };
  }

  // set as property for testing purposes
  threshold._viewport = {
    height: window.innerHeight,
    width: window.innerWidth
  };

  /**
   * Updates memoized viewport metrics
   * @method updateViewport
   */
  function updateViewport() {
    threshold._viewport.height = window.innerHeight;
    threshold._viewport.width = window.innerWidth;
  }

  // update viewport metrics when window is resized
  window.addEventListener('scroll', updateViewport);

  return threshold;
});

/***/ })
/******/ ]);
});