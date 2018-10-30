(function(){
  document.addEventListener( 'DOMContentLoaded', function () {
    // On resize recalculate width
    window.addEventListener('resize', typetura);
    var e = document.getElementById('typetura') || document.body;
    
    // Query the width of the typetura container
    function typetura() {
      document.body.style.setProperty('--tt-width',e.offsetWidth);
    };

    // Create a stylesheet for typetura's custom properties
    var s = document.createElement("style");
    // Typetura's custom properties
    s.innerHTML = "body{--tt-ease:linear;--tt-max:1600;--tt-bind:var(--tt-width);}*{--tt-key:'';animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s*var(--tt-bind)/var(--tt-max)) paused}";
    // Write typetura proprties to the top of the document head to avoid cascade conflicts
    document.head.insertBefore(s, document.head.firstChild);

    // Initialize width variable
    typetura();
  });
})();