/**
 * Copyright 2018-2021 Typetura LLC
 * typetura.com

 * typetura.js is subject to the Typetura platform licence
 * https://docs.typetura.com/legal/copyright

 * US Patent US10769348B1
 */
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

  var typeturize = function typeturize(element) {
    if (typeof window.ResizeObserver !== 'undefined') {
      var resizeObserver = new window.ResizeObserver(function (entries) {
        window.requestAnimationFrame(function () {
          if (!Array.isArray(entries) || !entries.length) {
            return;
          }

          var _iterator = _createForOfIteratorHelper(entries),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var entry = _step.value;

              if (entry.contentRect) {
                entry.target.style.setProperty('--tt-bind', entry.contentRect.width);
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
      });
      resizeObserver.observe(element);
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

  window.typetura = window.typetura || {
    classes: ['typetura'],
    base: 20,
    scale: 1
  };
  typeturaInit(window.typetura);

})));
