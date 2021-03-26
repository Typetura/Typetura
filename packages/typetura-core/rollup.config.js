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
      file: '../../js/typetura.js',
      format: 'umd',
      banner: `/** Copyright 2018-2021 Typetura LLC
 * typetura.js is subject to the Typetura platform licence
 * https://docs.typetura.com/legal/copyright
 * US Patent US10769348B1
 * typetura.com
 */`,
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
      file: '../../js/typetura.min.js',
      format: 'umd',
      banner: `/** Copyright 2018-2021 Typetura LLC
 * typetura.js is subject to the Typetura platform licence
 * https://docs.typetura.com/legal/copyright
 * US Patent US10769348B1
 * typetura.com
 */`,
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
