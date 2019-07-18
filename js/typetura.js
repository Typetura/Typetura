function typeturaInit(global, el) {
  // Query the width of the typetura container
  function typetura() {
    document.documentElement.style.setProperty('--tt-width', global.offsetWidth);
    el.forEach(element => {
      element.style.setProperty('--tt-bind', element.offsetWidth);
    });
  }
  typetura();

  // On resize recalculate width
  window.addEventListener('resize', typetura);

  // Create a stylesheet for typetura's custom properties
  var stylesheet = document.createElement('style');
  // Typetura's custom properties
  stylesheet.innerHTML =
    ':root{--tt-ease:linear;--tt-max:1600;--tt-bind:var(--tt-width);}*,:before,:after,:root{--tt-key:none;animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s*var(--tt-bind)/var(--tt-max)) paused}';
  // Write typetura proprties to the top of the document head to avoid cascade conflicts
  document.head.insertBefore(stylesheet, document.head.firstChild);
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    var global = document.getElementById('typetura') || document.documentElement;
    var el = document.querySelectorAll('.typetura');

    // Initialize width variable
    typeturaInit(global, el);
  }
};
