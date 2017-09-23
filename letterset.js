var lettersetSelect = [
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'li',
  'blockquote'
];
var lettersetStyles = [
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
var lettersetContext = document.getElementById('letterset');
var lettersetData = {};

// camelize strings
var lettersetCamelize = function(str) {
  return str
    .replace(/-([a-z])/g, function($1) { return $1.toUpperCase(); })
    .replace('-', '')
    .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

// parse data from breakpoint list into value + breakpoint arrays
var lettersetParse = function(s) {
  var l = s.split(',');
  var breakpoints = [];
  var values = [];
  for (var i = 0; i < l.length; i++) {
    var x = l[i].split('»');
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
var lettersetStyle = function(v,w) {
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

var letterset = function() {
  var w = lettersetContext.offsetWidth;

  for(el in lettersetData) {
    lettersetContext.style.setProperty('--' + el + '-font-variation-settings', ''); // reset so variations don’t compound on old setting
    for(prop in lettersetData[el]) {
      if(prop.split('-')[0] === 'variation') {
        var currentValue = lettersetContext.style.getPropertyValue('--' + el + '-font-variation-settings');
        var append = '';
        if(currentValue) {
          append =  ', ' + currentValue;
        }
        lettersetContext.style.setProperty('--' + el + '-' + 'font-variation-settings', '"' + prop.split('-')[1] + '" ' + lettersetStyle(lettersetData[el][prop],w) + append);
      } else {
        lettersetContext.style.setProperty('--' + el + '-' + prop, lettersetStyle(lettersetData[el][prop],w));
      }
    }
  }
}

// Initiate letterset by building data and setting reference styles
var lettersetInit = function() {
  // Loop through selectors and build data
  for (var i = 0; i < lettersetSelect.length; i++) {
    var s = lettersetContext.querySelector(lettersetSelect[i]);
    if(s) {
      for(var j = 0; j < lettersetStyles.length; j++) {
        var v = lettersetParse(getComputedStyle(s).getPropertyValue('--' + lettersetStyles[j]));
        if(v) {
          if(!lettersetData[lettersetSelect[i]]) {
            lettersetData[lettersetSelect[i]] = {};
          }
          lettersetData[lettersetSelect[i]][lettersetStyles[j]] = v;
        }
      }
    }
  }

  // set up custom props in head
  letterset();

  // Setup custom props on elements
  var elements = lettersetContext.querySelectorAll(lettersetSelect);
  for(var i = 0; i < elements.length; i++) {
    var tag = elements[i].tagName.toLowerCase();
    for(prop in lettersetData[tag]) {
      if(prop.split('-')[0] === 'variation') {
        elements[i].style.fontVariationSettings = 'var(--' + tag + '-font-variation-settings)';
      } else {
        elements[i].style[lettersetCamelize(prop)] = 'var(--' + tag + '-' + prop + ')';
      }
    }
  }
}

window.onload = function(){
  lettersetInit();
}

window.onresize = function(){
  letterset();
}