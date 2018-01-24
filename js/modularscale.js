// Values
var minorSecond   = 16/15;
var majorSecond   = 1.125;
var minorThird    = 1.2;
var majorThird    = 1.25;
var perfectFourth = 4/3;
var augFourth     = 1.414;
var perfectFifth  = 1.5;
var minorSixth    = 1.6;
var goldenSection = 1.61803398875;
var majorSixth    = 5/3;
var minorSeventh  = 16/9;
var majorSeventh  = 1.875;
var octave        = 2;
var majorTenth    = 2.5;
var majorEleventh = 8/3;
var majorTwelfth  = 3;
var doubleOctave  = 4;

// Function settings
var modularscale = {
  base: 16,
  ratio: 1.5,
};

// Function
function msFunction(v,settings) {

  // Parse settings
  // Write initial settings if undefined
  if (settings === undefined) {
    settings = modularscale;
  }
  // Initiate values
  var base = settings.base;
  var ratio = settings.ratio;
  // Fill in the blanks with default values
  if (ratio === undefined) {
    ratio = modularscale.ratio;
  }
  if (base === undefined) {
    base = modularscale.base;
  }

  // Fast calc if not multi stranded
  if (!Array.isArray(base) || base.length === 1) {
    return (Math.pow(ratio,v) * base);
  }

  // Normalize bases
  // Find the upper bounds for base values
  var baseHigh = Math.pow(ratio,1) * base[0];
  for (var i = 1; i < base.length; i++) {
    // shift up if value too low
    while (base[i]/1 < base[0]/1) {
      base[i] = Math.pow(ratio,1) * base[i];
    }
    // Shift down if too high
    while (base[i]/1 >= baseHigh/1) {
      base[i] = Math.pow(ratio,-1) * base[i];
    }
  }
  // Sort bases
  base.sort();

  // Figure out what base to use with modulo
  var rBase = Math.round((v / base.length - Math.floor(v/base.length)) * base.length);

  // Return
  return Math.pow(ratio,Math.floor(v/base.length)) * base[rBase];
};

function ms(v,settings) {
  return msFunction(v,settings);
}

module.exports = ms;