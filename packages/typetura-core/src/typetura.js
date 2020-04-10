// Copyright 2018-2020 Typetura LLC.
// https://github.com/typetura/typetura.js

import { ResizeObserver } from 'resize-observer';

export function typeturize(element) {
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

export function typeturaInit(base = 20) {
  // Create a stylesheet for typetura's custom properties
  var stylesheet = document.createElement('style');
  // Typetura's custom properties
  stylesheet.innerHTML = `
    :root{
      --tt-base: ${base};
      --tt-ease:linear;
      --tt-max:1600
    }
    *,:before,:after,:root{
      --tt-key:none;
      animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused
    }`;
  // Write typetura properties to the top of the document head to avoid cascade conflicts
  document.head.insertBefore(stylesheet, document.head.firstChild);
  typeturize(document.getRootNode());
}
