import { ResizeObserver } from 'resize-observer';

const typeturize = (element) => {
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
};

export default typeturize;
