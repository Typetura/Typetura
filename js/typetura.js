var lettersetEl;
var typeturaSelect;
var typeturaStyles;

// -----------------------------------------------
// SETTINGS

// Top level element,
// overwrite to be more specific for better performance.
if (!lettersetEl) {
  lettersetEl = 'body';
}

// Selectors to target
if (!typeturaSelect) {
  typeturaSelect = ['article', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ol', 'ul', 'li', 'blockquote'];
}

// Styles to parse
if (!typeturaStyles) {
  typeturaStyles = [
    'ms-base',
    'ms-ratio',
    'margin',
    'padding',
    'font-size',
    'line-height',
    'variation-ital',
    'variation-opsz',
    'variation-slnt',
    'variation-wdth',
    'variation-wght',
    'variation-grad',
    'variation-xhgt',
  ];
}

// -----------------------------------------------
// DATA

var typeturaContext = document.querySelector(lettersetEl);

// -----------------------------------------------
// HELPERS

// camelize strings
var typeturaCamelize = function(str) {
  return str
    .replace(/-([a-z])/g, function($1) {
      return $1.toUpperCase();
    })
    .replace('-', '')
    .replace(/^(.)/, function($1) {
      return $1.toLowerCase();
    });
};

// -----------------------------------------------
// Modular Scale
// https://github.com/modularscale/modularscale-js

// Function settings
var typeturaMS = {
  base: '1em',
  ratio: 1.5,
};

// Function
function typeturaMSFunc(v, settings) {
  // Parse settings
  // Write initial settings if undefined
  if (settings === undefined) {
    settings = typeturaMS;
  }
  // Initiate values
  var base = parseFloat(settings.base);
  var unit = settings.base.split(base)[1];
  var ratio = settings.ratio;
  // Fill in the blanks with default values
  if (ratio === undefined) {
    ratio = typeturaMS.ratio;
  }
  if (base === undefined) {
    base = typeturaMS.base;
  }

  // Fast calc if not multi stranded
  if (!Array.isArray(base) || base.length === 1) {
    return Math.pow(ratio, v) * base + unit;
  }

  // Normalize bases
  // Find the upper bounds for base values
  var baseHigh = Math.pow(ratio, 1) * base[0];
  for (var i = 1; i < base.length; i++) {
    // shift up if value too low
    while (base[i] / 1 < base[0] / 1) {
      base[i] = Math.pow(ratio, 1) * base[i];
    }
    // Shift down if too high
    while (base[i] / 1 >= baseHigh / 1) {
      base[i] = Math.pow(ratio, -1) * base[i];
    }
  }
  // Sort bases
  base.sort();

  // Figure out what base to use with modulo
  var rBase = Math.round((v / base.length - Math.floor(v / base.length)) * base.length);

  // Return
  return Math.pow(ratio, Math.floor(v / base.length)) * base[rBase] + unit;
}

// -----------------------------------------------
// READ

// parse data from breakpoint list into value + breakpoint arrays
var typeturaParse = function(s) {
  var l = s.split(',');
  var breakpoints = [];
  var values = [];
  for (var i = 0; i < l.length; i++) {
    var x = l[i].split('/');
    if (x[1]) {
      breakpoints.push(parseFloat(x[1].trim()));
      values.push(x[0].trim());
    } else if (x[0]) {
      breakpoints.push(1);
      values.push(x[0].trim());
    }
  }
  if (breakpoints.length > 0) {
    return [breakpoints, values];
  } else {
    return null;
  }
};

// style elements based on parsed data
var typeturaStyle = function(v, w) {
  var u = v[1][0].split(parseFloat(v[1][0]))[1]; // Find the units used

  if (w <= v[0][0]) {
    if (u === 'step') {
      return typeturaMSFunc(parseFloat(v[1][0]));
    }
    return v[1][0]; // Just return the small setting if small
  }
  if (w >= v[0][v[0].length - 1]) {
    if (u === 'step') {
      return typeturaMSFunc(parseFloat(v[1][v[0].length - 1]));
    }
    return v[1][v[0].length - 1]; // Just return the large setting if large
  }

  // Find the breakpoint zone
  var p = 0; // breakpoint (start at 0)

  // Loop through breakpoints to find the correct zone
  for (var i = 0; i < v[0].length; i++) {
    if (w > v[0][i]) {
      p = i;
    }
  }

  var l = (w - v[0][p]) / (v[0][p + 1] - v[0][p]); // Find the location between breakpoints (value between 0-1)
  var s = (parseFloat(v[1][p + 1]) - parseFloat(v[1][p])) * l + parseFloat(v[1][p]); // Map the location to the scale factor

  // If the unit is modular scale
  if (u === 'step') {
    return typeturaMSFunc(s); // Add on the units and return value
  } else {
    return s + u; // Add on the units and return value
  }
};

// -----------------------------------------------
// WRITE
var typeturaWrite = function(typeturaData, typeturaWidth) {
  for (var el in typeturaData) {
    typeturaContext.style.setProperty('--' + el + '-font-variation-settings', ''); // reset so variations don’t compound on old setting
    for (var prop in typeturaData[el]) {
      if (prop === 'ms-base') {
        typeturaMS.base = typeturaStyle(typeturaData[el][prop], typeturaWidth);
      } else if (prop === 'ms-ratio') {
        typeturaMS.ratio = typeturaStyle(typeturaData[el][prop], typeturaWidth);
      } else if (prop.split('-')[0] === 'variation') {
        var currentValue = typeturaContext.style.getPropertyValue('--' + el + '-font-variation-settings');
        var append = '';
        if (currentValue) {
          append = ', ' + currentValue;
        }
        typeturaContext.style.setProperty(
          '--' + el + '-' + 'font-variation-settings',
          '"' + prop.split('-')[1] + '" ' + typeturaStyle(typeturaData[el][prop], typeturaWidth) + append
        );
      } else {
        typeturaContext.style.setProperty('--' + el + '-' + prop, typeturaStyle(typeturaData[el][prop], typeturaWidth));
      }
    }
  }
};

// -----------------------------------------------
// GET DATA
var getTypeturaDataFromDOM = function() {
  var typeturaData = {};

  // Loop through selectors and build data
  for (var i = 0; i < typeturaSelect.length; i++) {
    var selector = typeturaContext.querySelector(typeturaSelect[i]);

    if (!selector) continue;

    for (var j = 0; j < typeturaStyles.length; j++) {
      var styles = typeturaParse(window.getComputedStyle(selector).getPropertyValue('--' + typeturaStyles[j]));

      if (!styles) continue;

      if (!typeturaData[typeturaSelect[i]]) {
        typeturaData[typeturaSelect[i]] = {};
      }

      typeturaData[typeturaSelect[i]][typeturaStyles[j]] = styles;
    }
  }

  return typeturaData;
};

// -----------------------------------------------
// Initiate typetura by building data and setting reference styles
var typeturaInit = function(typeturaData) {
  var typeturaWidth = typeturaContext.offsetWidth;

  if (!typeturaData) {
    typeturaData = getTypeturaDataFromDOM();
  }

  // set up custom props in head
  typeturaWrite(typeturaData, typeturaWidth);

  // Setup custom props on elements
  var elements = typeturaContext.querySelectorAll(typeturaSelect);

  for (var k = 0; k < elements.length; k++) {
    var tag = elements[k].tagName.toLowerCase();

    for (var prop in typeturaData[tag]) {
      if (prop.split('-')[0] === 'ms') {
        // Don’t write anything for ms values
      } else if (prop.split('-')[0] === 'variation') {
        elements[k].style.fontVariationSettings = 'var(--' + tag + '-font-variation-settings)';
      } else {
        elements[k].style[typeturaCamelize(prop)] = 'var(--' + tag + '-' + prop + ')';
      }
    }
  }
};

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = typeturaInit;
  }
  exports.typeturaInit = typeturaInit;
} else {
  window['typeturaInit'] = typeturaInit;

  window.onload = function() {
    window.typeturaInit();
  };

  window.onresize = function() {
    var typeturaWidth = typeturaContext.offsetWidth;

    typeturaWrite(typeturaWidth);
  };
}
