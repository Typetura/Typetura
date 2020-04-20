(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}((function () { 'use strict';

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

	// Copyright 2018-2020 Typetura LLC.
	function typeturize(element) {
	  console.log(element);
	  element.style.setProperty('--tt-bind', element.offsetWidth);

	  if (typeof ResizeObserver_2 !== 'undefined') {
	    var resizeObserver = new ResizeObserver_2(function (entries) {
	      for (var j = 0; j < entries.length; j++) {
	        var entry = entries[j];
	        element.style.setProperty('--tt-bind', Math.round(entry.contentRect.width));
	      }
	    });
	    resizeObserver.observe(element);
	  }
	}
	function typeturaInit() {
	  var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
	  var stylesheet = createStyleSheet(base); // Write typetura properties to the top of the document head to avoid cascade conflicts

	  document.head.insertBefore(stylesheet, document.head.firstChild);
	  typeturize(document.getRootNode());
	}

	function createStyleSheet(base) {
	  // Create a stylesheet for typetura's custom properties
	  var stylesheet = document.createElement('style'); // Typetura's custom properties

	  stylesheet.innerHTML = "\n    :root{\n      --tt-base: ".concat(base, ";\n      --tt-ease:linear;\n      --tt-max:1600\n    }\n    *,:before,:after,:root{\n      --tt-key:none;\n      animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused\n    }");
	  return stylesheet;
	}

	// Copyright 2018-2020 Typetura LLC.

	function initialize(el) {
	  typeturaInit();

	  function typetura() {
	    for (var i = 0; i < el.length; i++) {
	      var element = el[i];
	      typeturize(element);
	    }
	  }

	  typetura();
	  window.onresize = typetura;
	} // Contexts to query with Typetura


	var typeturaContexts = [':root', '.typetura']; // Initiate Typetura on page load

	document.onreadystatechange = function () {
	  if (window.document.readyState === 'interactive') {
	    initialize(document.querySelectorAll(typeturaContexts));
	  }
	}; // Navigation within an SPA


	var historyPushState = window.history.pushState;

	window.history.pushState = function () {
	  return function pushState() {
	    var historyState = historyPushState.apply(this, arguments);
	    window.dispatchEvent(new Event('pushstate'));
	    window.dispatchEvent(new Event('locationchange'));
	    return historyState;
	  };
	}();

	window.addEventListener('popstate', function () {
	  window.dispatchEvent(new Event('locationchange'));
	});
	window.addEventListener('locationchange', function () {
	  setTimeout(function () {
	    initialize(document.querySelectorAll(typeturaContexts));
	  }, 500);
	});

})));
