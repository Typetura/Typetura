import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'js/typetura-umd.js',
    output: {
      name: 'typetura',
      file: pkg.browser,
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
];
