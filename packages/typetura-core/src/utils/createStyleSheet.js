const createStyleSheet = ({ base, scale }) => {
  // Create a stylesheet for typetura's custom properties
  const stylesheet = document.createElement('style');
  // Typetura's custom properties
  stylesheet.innerHTML = `html{--tt-base: ${base};--tt-scale: ${scale};--tt-ease:linear;--tt-max:1600}*,:before,:after,html{--tt-key:none;animation:var(--tt-key) 1s var(--tt-ease) 1 calc(-1s * var(--tt-bind) / var(--tt-max)) both paused}`;

  return stylesheet;
};

export default createStyleSheet;
