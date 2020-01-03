// Copyright 2018-2020 Typetura LLC.
// https://github.com/typetura/typetura.js

var elementsHaveAttachedListeners = false;

function typeturaInit(el) {
  function typetura() {
    el.forEach(element => {
      element.style.setProperty('--tt-bind', element.offsetWidth);
      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(entries => {
          for (let entry of entries) {
            element.style.setProperty('--tt-bind', Math.round(entry.contentRect.width));
          }
        });
        resizeObserver.observe(element);
      }
    });
  }
  typetura();

  // On resize recalculate width
  if (typeof ResizeObserver === 'undefined') {
    window.onresize = typetura;
  }

  // Create a stylesheet for typetura's custom properties
  var stylesheet = document.createElement('style');
  // Typetura's custom properties
  stylesheet.innerHTML =
    ':root{--tt-ease:linear;--tt-max:1600}*,:before,:after,:root{--tt-key:none;animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused}';
  // Write typetura proprties to the top of the document head to avoid cascade conflicts
  document.head.insertBefore(stylesheet, document.head.firstChild);
}

// Contexts to query with Typetura

var typeturaContexts = [':root', '.typetura'];

// Initiate Typetura on page load

document.onreadystatechange = () => {
  document.body.style.setProperty('opacity', 0);
  document.body.style.setProperty('transition', 'none');
  if (document.readyState === 'complete') {
    typeturaInit(document.querySelectorAll(typeturaContexts));
    document.body.style.setProperty('opacity', 1);
    document.body.style.setProperty('transition', 'opacity .2s ease-out');
  }
};

// After load, query navigation within an SPA

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
  setTimeout(() => {
    typeturaInit(document.querySelectorAll(typeturaContexts));
  }, 500);
});
