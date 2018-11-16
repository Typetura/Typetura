function typeturaInit(element) {
  // Query the width of the typetura container
  function typetura() {
    document.body.style.setProperty('--tt-width', element.offsetWidth);
  }
  typetura();

  // On resize recalculate width
  window.addEventListener('resize', typetura);

  // Create a stylesheet for typetura's custom properties
  var stylesheet = document.createElement('style');
  // Typetura's custom properties
  stylesheet.innerHTML =
    "body{--tt-ease:linear;--tt-max:1600;--tt-bind:var(--tt-width);}*{--tt-key:'';animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s*var(--tt-bind)/var(--tt-max)) paused}";
  // Write typetura proprties to the top of the document head to avoid cascade conflicts
  document.head.insertBefore(stylesheet, document.head.firstChild);
}

document.addEventListener('DOMContentLoaded', function() {
  var element = document.getElementById('typetura') || document.body;

  // Initialize width variable
  typeturaInit(element);
});
