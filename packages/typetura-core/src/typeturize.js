/*!
Copyright 2018-2021 Typetura LLC
US Patent US10769348B1
typetura.com
*/

import { ResizeObserver } from 'resize-observer';

const typeturize = (element) => {
  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentBoxSize) {
          entry.target.style.setProperty('--tt-bind', entry.contentRect.width);
        }
      }
    });
    resizeObserver.observe(element);
  } else {
    element.style.setProperty('--tt-bind', element.offsetWidth);
  }
};

export default typeturize;
