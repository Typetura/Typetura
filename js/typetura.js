function typeturaInit(els) {
  function typetura() {
    // Loop through bound elements
    els.forEach(e => {
      e.style.setProperty('--tt-bind', (e.offsetWidth / getComputedStyle(e).getPropertyValue('--tt-max')) * -1 + 's');
    });
  }
  typetura();

  // On resize recalculate width
  window.addEventListener('resize', typetura);

  // Create a stylesheet for typetura's custom properties
  var stylesheet = document.createElement('style');
  // Typetura's custom properties
  stylesheet.innerHTML =
    ':root{--tt-ease:linear;--tt-max:1600}*,:before,:after,:root{--tt-key:none;animation:var(--tt-key) 1s var(--tt-ease) 1 var(--tt-bind) both paused}';
  // Write typetura proprties to the top of the document head to avoid cascade conflicts
  document.head.insertBefore(stylesheet, document.head.firstChild);
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    var els = document.querySelectorAll([':root', '.typetura']);
    typeturaInit(els);
  }
};
