(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  // Copyright 2018-2020 Typetura LLC.
  // https://github.com/typetura/typetura.js
  function typeturize(element) {
    element.style.setProperty('--tt-bind', element.offsetWidth);

    if (typeof ResizeObserver !== 'undefined') {
      var resizeObserver = new ResizeObserver(function (entries) {
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
    // Create a stylesheet for typetura's custom properties
    var stylesheet = document.createElement('style'); // Typetura's custom properties

    stylesheet.innerHTML = "\n    :root{\n      --tt-base: ".concat(base, ";\n      --tt-ease:linear;\n      --tt-max:1600\n    }\n    *,:before,:after,:root{\n      --tt-key:none;\n      animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused\n    }"); // Write typetura properties to the top of the document head to avoid cascade conflicts

    document.head.insertBefore(stylesheet, document.head.firstChild);
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
