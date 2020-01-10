// Copyright 2018-2020 Typetura LLC.
// https://github.com/typetura/typetura.js

function typeturaInit(el) {
  function typetura() {
    el.forEach(function(element) {
      element.style.setProperty('--tt-bind', element.offsetWidth);
      if (typeof ResizeObserver !== 'undefined') {
        var resizeObserver = new ResizeObserver(function(entries) {
          for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];

            element.style.setProperty('--tt-bind', Math.round(entry.contentRect.width));
          }
        });
        resizeObserver.observe(element);
      }
    });
  }
  typetura();

  // Create a stylesheet for typetura's custom properties
  var stylesheet = document.createElement('style');
  // Typetura's custom properties
  stylesheet.innerHTML =
    ':root{--tt-ease:linear;--tt-max:1600}*,:before,:after,:root{--tt-key:none;animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused}';
  // Write typetura proprties to the top of the document head to avoid cascade conflicts
  document.head.insertBefore(stylesheet, document.head.firstChild);

  // On resize recalculate width
  if (typeof ResizeObserver === 'undefined') {
    window.onresize = typetura;
  }
}

// Contexts to query with Typetura
var typeturaContexts = [':root', '.typetura'];

// Initiate Typetura on page load
document.onreadystatechange = function() {
  if (window.doument.readyState === 'complete') {
    typeturaInit(document.querySelectorAll(typeturaContexts));
  }
};

// Navigation within an SPA
var historyPushState = window.history.pushState;

window.history.pushState = (function() {
  return function pushState() {
    var historyState = historyPushState.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return historyState;
  };
})(window.history.pushState);
window.addEventListener('popstate', function() {
  window.dispatchEvent(new Event('locationchange'));
});
window.addEventListener('locationchange', function() {
  setTimeout(function() {
    typeturaInit(document.querySelectorAll(typeturaContexts));
  }, 500);
});
