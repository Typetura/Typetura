const typeturize = (element) => {
  if (typeof window.ResizeObserver !== 'undefined') {
    const resizeObserver = new window.ResizeObserver((entries) => {
      for (const entry of entries) {
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
