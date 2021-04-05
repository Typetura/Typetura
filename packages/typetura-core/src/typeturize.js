const typeturize = (element) => {
  if (typeof window.ResizeObserver !== 'undefined') {
    const resizeObserver = new window.ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        for (const entry of entries) {
          if (entry.contentRect) {
            entry.target.style.setProperty('--tt-bind', entry.contentRect.width);
          }
        }
      });
    });
    resizeObserver.observe(element);
  }
};

export default typeturize;
