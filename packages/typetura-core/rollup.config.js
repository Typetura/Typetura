import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

export default [
  // browser-friendly UMD build
  {
    input: 'src/typetura-umd.js',
    output: {
      name: 'typetura',
      file: 'js/typetura.js',
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env'],
      }),
      commonjs(), // so Rollup can convert `ms` to an ES module
    ],
  },
  {
    input: 'src/typetura-umd.js',
    output: {
      name: 'typetura',
      file: 'js/typetura.min.js',
      format: 'umd',
    },
    plugins: [
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env'],
      }),
      commonjs(), // so Rollup can convert `ms` to an ES module
      minify(),
    ],
  },
];
