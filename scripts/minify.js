var compressor = require('node-minify');

// With Promise
var promise = compressor.minify({
  compressor: 'uglifyjs',
  input: './js/typetura.js',
  output: './js/typetura.min.js',
});

promise
  .then(function(min) {
    console.log('Successfully Minified File!');
  })
  .catch(function(error) {
    console.log('Failed to minify file.', error);
  });
