////////////////////////
// SETTINGS

// Wrapper element
var lettersetEl = 'article';

// Selectors to target
var typeturaSelect = [
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ol',
  'ul',
  'li',
  'blockquote'
];
// Styles to parse
var typeturaStyles = [
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
  'variation-xhgt'
];


////////////////////////
// DATA

var typeturaContext = document.querySelector(lettersetEl);
var typeturaData = {};
var typeturaWidth = typeturaContext.offsetWidth;


////////////////////////
// HELPERS

// camelize strings
var typeturaCamelize = function(str) {
  return str
    .replace(/-([a-z])/g, function($1) { return $1.toUpperCase(); })
    .replace('-', '')
    .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

////////////////////////
// READ

// parse data from breakpoint list into value + breakpoint arrays
var typeturaParse = function(s) {
  var l = s.split(',');
  var breakpoints = [];
  var values = [];
  for (var i = 0; i < l.length; i++) {
    var x = l[i].split('~');
    if(x[1]) {
      breakpoints.push(parseFloat(x[1].trim()));
      values.push(x[0].trim());
    }
  }
  if(breakpoints.length > 0) {
    return [breakpoints,values]
  } else {
    return null
  }
}

// style elements based on parsed data
var typeturaStyle = function(v,w) {
  var u = v[1][0].split(parseFloat(v[1][0]))[1]; // Find the units used

  if(w<=v[0][0]) {
    return v[1][0]; // Just return the small setting if small
  }
  if(w>=v[0][v[0].length-1]) {
    return v[1][v[0].length-1]; // Just return the large setting if large
  }

  // Find the breakpoint zone
  var p = 0; // breakpoint (start at 0)

  // Loop through breakpoints to find the correct zone
  for (var i = 0; i < v[0].length; i++) {
    if(w>v[0][i]) {
      var p = i;
    }
  }

  var l = (w - v[0][p]) / (v[0][p+1] - v[0][p]); // Find the location between breakpoints (value between 0-1)
  var s = (parseFloat(v[1][p+1]) - parseFloat(v[1][p])) * l + parseFloat(v[1][p]); // Map the location to the scale factor

  return s + u; // Add on the units and return value
}


////////////////////////
// WRITE

var typetura = function(w) {
  for(el in typeturaData) {
    typeturaContext.style.setProperty('--' + el + '-font-variation-settings', ''); // reset so variations don’t compound on old setting
    for(prop in typeturaData[el]) {
      if(prop.split('-')[0] === 'variation') {
        var currentValue = typeturaContext.style.getPropertyValue('--' + el + '-font-variation-settings');
        var append = '';
        if(currentValue) {
          append =  ', ' + currentValue;
        }
        typeturaContext.style.setProperty('--' + el + '-' + 'font-variation-settings', '"' + prop.split('-')[1] + '" ' + typeturaStyle(typeturaData[el][prop],typeturaWidth) + append);
      } else {
        typeturaContext.style.setProperty('--' + el + '-' + prop, typeturaStyle(typeturaData[el][prop],typeturaWidth));
      }
    }
  }
}


////////////////////////
// INIT

// Initiate typetura by building data and setting reference styles
var typeturaInit = function() {

  // Loop through selectors and build data
  for (var i = 0; i < typeturaSelect.length; i++) {
    var s = typeturaContext.querySelector(typeturaSelect[i]);
    if(s) {
      for(var j = 0; j < typeturaStyles.length; j++) {
        var v = typeturaParse(getComputedStyle(s).getPropertyValue('--' + typeturaStyles[j]));
        if(v) {
          if(!typeturaData[typeturaSelect[i]]) {
            typeturaData[typeturaSelect[i]] = {};
          }
          typeturaData[typeturaSelect[i]][typeturaStyles[j]] = v;
        }
      }
    }
  }

  // set up custom props in head
  typetura(typeturaWidth);

  // Setup custom props on elements
  var elements = typeturaContext.querySelectorAll(typeturaSelect);
  for(var i = 0; i < elements.length; i++) {
    var tag = elements[i].tagName.toLowerCase();
    for(prop in typeturaData[tag]) {
      if(prop.split('-')[0] === 'variation') {
        elements[i].style.fontVariationSettings = 'var(--' + tag + '-font-variation-settings)';
      } else {
        elements[i].style[typeturaCamelize(prop)] = 'var(--' + tag + '-' + prop + ')';
      }
    }
  }
}

window.onload = function(){
  typeturaInit();
}

window.onresize = function(){
  typeturaWidth = typeturaContext.offsetWidth;
  typetura(typeturaWidth);
}