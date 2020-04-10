// Copyright 2018-2020 Typetura LLC.
// https://github.com/typetura/typetura.js

import { typeturaInit, typeturize } from './typetura';

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
}

// Contexts to query with Typetura
var typeturaContexts = [':root', '.typetura'];

// Initiate Typetura on page load
document.onreadystatechange = function () {
  if (window.document.readyState === 'interactive') {
    initialize(document.querySelectorAll(typeturaContexts));
  }
};

// Navigation within an SPA
var historyPushState = window.history.pushState;

window.history.pushState = (function () {
  return function pushState() {
    var historyState = historyPushState.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return historyState;
  };
})(window.history.pushState);
window.addEventListener('popstate', function () {
  window.dispatchEvent(new Event('locationchange'));
});
window.addEventListener('locationchange', function () {
  setTimeout(function () {
    initialize(document.querySelectorAll(typeturaContexts));
  }, 500);
});
