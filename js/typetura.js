// Copyright 2018-2021 Typetura LLC
// US Patent US10769348B1
// typetura.com
(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o) {
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) {
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var it,
        normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var ContentRect_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var ContentRect = function (target) {
      if ('getBBox' in target) {
          var box = target.getBBox();
          return Object.freeze({
              height: box.height,
              left: 0,
              top: 0,
              width: box.width,
          });
      }
      else { // if (target instanceof HTMLElement) { // also includes all other non-SVGGraphicsElements
          var styles = window.getComputedStyle(target);
          return Object.freeze({
              height: parseFloat(styles.height || '0'),
              left: parseFloat(styles.paddingLeft || '0'),
              top: parseFloat(styles.paddingTop || '0'),
              width: parseFloat(styles.width || '0'),
          });
      }
  };
  exports.ContentRect = ContentRect;

  });

  unwrapExports(ContentRect_1);
  var ContentRect_2 = ContentRect_1.ContentRect;

  var ResizeObservation_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });

  var ResizeObservation = /** @class */ (function () {
      function ResizeObservation(target) {
          this.target = target;
          this.$$broadcastWidth = this.$$broadcastHeight = 0;
      }
      Object.defineProperty(ResizeObservation.prototype, "broadcastWidth", {
          get: function () {
              return this.$$broadcastWidth;
          },
          enumerable: true,
          configurable: true
      });
      Object.defineProperty(ResizeObservation.prototype, "broadcastHeight", {
          get: function () {
              return this.$$broadcastHeight;
          },
          enumerable: true,
          configurable: true
      });
      ResizeObservation.prototype.isActive = function () {
          var cr = ContentRect_1.ContentRect(this.target);
          return !!cr
              && (cr.width !== this.broadcastWidth
                  || cr.height !== this.broadcastHeight);
      };
      return ResizeObservation;
  }());
  exports.ResizeObservation = ResizeObservation;

  });

  unwrapExports(ResizeObservation_1);
  var ResizeObservation_2 = ResizeObservation_1.ResizeObservation;

  var ResizeObserverEntry_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });

  var ResizeObserverEntry = /** @class */ (function () {
      function ResizeObserverEntry(target) {
          this.target = target;
          this.contentRect = ContentRect_1.ContentRect(target);
      }
      return ResizeObserverEntry;
  }());
  exports.ResizeObserverEntry = ResizeObserverEntry;

  });

  unwrapExports(ResizeObserverEntry_1);
  var ResizeObserverEntry_2 = ResizeObserverEntry_1.ResizeObserverEntry;

  var ResizeObserver_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });


  var resizeObservers = [];
  var ResizeObserver = /** @class */ (function () {
      function ResizeObserver(callback) {
          /** @internal */
          this.$$observationTargets = [];
          /** @internal */
          this.$$activeTargets = [];
          /** @internal */
          this.$$skippedTargets = [];
          var message = callbackGuard(callback);
          if (message) {
              throw TypeError(message);
          }
          this.$$callback = callback;
          resizeObservers.push(this);
      }
      ResizeObserver.prototype.observe = function (target) {
          var message = targetGuard('observe', target);
          if (message) {
              throw TypeError(message);
          }
          var index = findTargetIndex(this.$$observationTargets, target);
          if (index > 0) {
              return;
          }
          this.$$observationTargets.push(new ResizeObservation_1.ResizeObservation(target));
          startLoop();
      };
      ResizeObserver.prototype.unobserve = function (target) {
          var message = targetGuard('unobserve', target);
          if (message) {
              throw TypeError(message);
          }
          var index = findTargetIndex(this.$$observationTargets, target);
          if (index < 0) {
              return;
          }
          this.$$observationTargets.splice(index, 1);
          checkStopLoop();
      };
      ResizeObserver.prototype.disconnect = function () {
          this.$$observationTargets = [];
          this.$$activeTargets = [];
      };
      return ResizeObserver;
  }());
  exports.ResizeObserver = ResizeObserver;
  function callbackGuard(callback) {
      if (typeof (callback) === 'undefined') {
          return "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.";
      }
      if (typeof (callback) !== 'function') {
          return "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.";
      }
  }
  function targetGuard(functionName, target) {
      if (typeof (target) === 'undefined') {
          return "Failed to execute '" + functionName + "' on 'ResizeObserver': 1 argument required, but only 0 present.";
      }
      if (!(target instanceof window.Element)) {
          return "Failed to execute '" + functionName + "' on 'ResizeObserver': parameter 1 is not of type 'Element'.";
      }
  }
  function findTargetIndex(collection, target) {
      for (var index = 0; index < collection.length; index += 1) {
          if (collection[index].target === target) {
              return index;
          }
      }
      return -1;
  }
  var gatherActiveObservationsAtDepth = function (depth) {
      resizeObservers.forEach(function (ro) {
          ro.$$activeTargets = [];
          ro.$$skippedTargets = [];
          ro.$$observationTargets.forEach(function (ot) {
              if (ot.isActive()) {
                  var targetDepth = calculateDepthForNode(ot.target);
                  if (targetDepth > depth) {
                      ro.$$activeTargets.push(ot);
                  }
                  else {
                      ro.$$skippedTargets.push(ot);
                  }
              }
          });
      });
  };
  var hasActiveObservations = function () {
      return resizeObservers.some(function (ro) { return !!ro.$$activeTargets.length; });
  };
  var hasSkippedObservations = function () {
      return resizeObservers.some(function (ro) { return !!ro.$$skippedTargets.length; });
  };
  var broadcastActiveObservations = function () {
      var shallowestTargetDepth = Infinity;
      resizeObservers.forEach(function (ro) {
          if (!ro.$$activeTargets.length) {
              return;
          }
          var entries = [];
          ro.$$activeTargets.forEach(function (obs) {
              var entry = new ResizeObserverEntry_1.ResizeObserverEntry(obs.target);
              entries.push(entry);
              obs.$$broadcastWidth = entry.contentRect.width;
              obs.$$broadcastHeight = entry.contentRect.height;
              var targetDepth = calculateDepthForNode(obs.target);
              if (targetDepth < shallowestTargetDepth) {
                  shallowestTargetDepth = targetDepth;
              }
          });
          ro.$$callback(entries, ro);
          ro.$$activeTargets = [];
      });
      return shallowestTargetDepth;
  };
  var deliverResizeLoopErrorNotification = function () {
      var errorEvent = new window.ErrorEvent('ResizeLoopError', {
          message: 'ResizeObserver loop completed with undelivered notifications.',
      });
      window.dispatchEvent(errorEvent);
  };
  var calculateDepthForNode = function (target) {
      var depth = 0;
      while (target.parentNode) {
          target = target.parentNode;
          depth += 1;
      }
      return depth;
  };
  var notificationIteration = function () {
      var depth = 0;
      gatherActiveObservationsAtDepth(depth);
      while (hasActiveObservations()) {
          depth = broadcastActiveObservations();
          gatherActiveObservationsAtDepth(depth);
      }
      if (hasSkippedObservations()) {
          deliverResizeLoopErrorNotification();
      }
  };
  var animationFrameCancelToken;
  var startLoop = function () {
      if (animationFrameCancelToken)
          return;
      runLoop();
  };
  var runLoop = function () {
      animationFrameCancelToken = window.requestAnimationFrame(function () {
          notificationIteration();
          runLoop();
      });
  };
  var checkStopLoop = function () {
      if (animationFrameCancelToken && !resizeObservers.some(function (ro) { return !!ro.$$observationTargets.length; })) {
          window.cancelAnimationFrame(animationFrameCancelToken);
          animationFrameCancelToken = undefined;
      }
  };
  var install = function () {
      return window.ResizeObserver = ResizeObserver;
  };
  exports.install = install;

  });

  unwrapExports(ResizeObserver_1);
  var ResizeObserver_2 = ResizeObserver_1.ResizeObserver;
  var ResizeObserver_3 = ResizeObserver_1.install;

  var typeturize = function typeturize(element) {
    if (typeof ResizeObserver_2 !== 'undefined') {
      var resizeObserver = new ResizeObserver_2(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;

            if (entry.contentBoxSize) {
              entry.target.style.setProperty('--tt-bind', entry.contentRect.width);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      });
      resizeObserver.observe(element);
    } else {
      element.style.setProperty('--tt-bind', element.offsetWidth);
    }
  };

  var createStyleSheet = function createStyleSheet(_ref) {
    var base = _ref.base,
        scale = _ref.scale;
    // Create a stylesheet for typetura's custom properties
    var stylesheet = document.createElement('style'); // Typetura's custom properties

    stylesheet.innerHTML = "html{--tt-base: ".concat(base, ";--tt-scale: ").concat(scale, ";--tt-ease:linear;--tt-max:1600}*,:before,:after,html{--tt-key:none;animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused}");
    return stylesheet;
  };

  var typeturaInit = function typeturaInit() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _options$classes = options.classes,
        classes = _options$classes === void 0 ? ['typetura'] : _options$classes,
        _options$base = options.base,
        base = _options$base === void 0 ? 20 : _options$base,
        _options$scale = options.scale,
        scale = _options$scale === void 0 ? 1 : _options$scale;
    return new Promise(function (resolve, reject) {
      // Look for new elements on the page that might be Typetura contexts.
      var mutationObserver = new window.MutationObserver(mutations);
      mutationObserver.observe(document.documentElement, {
        childList: true,
        attributes: false,
        subtree: true
      }); // Loop through new elements and attach resize observations.

      function mutations(mutationsList) {
        mutationsList.forEach(function (mutation) {
          var nodes = mutation.addedNodes;
          nodes.forEach(function (node) {
            if (node.classList) {
              if (node.classList.contains(classes)) {
                typeturize(node);
              }
            }
          });
        });
      }

      var stylesheet = createStyleSheet({
        base: base,
        scale: scale
      }); // Initiate Typetura on the root element

      typeturize(document.documentElement); // Write typetura properties to the top of the document head to avoid cascade conflicts

      document.head.insertBefore(stylesheet, document.head.firstChild);
      resolve();
    });
  };

  window.typetura = {
    classes: ['typetura'],
    base: 20,
    scale: 1
  };
  typeturaInit(window.typetura);

})));
