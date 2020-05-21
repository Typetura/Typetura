import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json';

export default [
  // browser-friendly UMD build
  {
    input: 'src/index.js',
    output: {
      name: 'typetura',
      file: pkg.browser,
      format: 'umd',
    },
    plugins: [
      peerDepsExternal(),
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react'],
      }),
      commonjs(), // so Rollup can convert `ms` to an ES module
      url(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.js',
    external: ['ms', 'typeturajs'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es', sourcmap: true },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(), // so Rollup can find `ms`
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/env', '@babel/preset-react'],
      }),
      commonjs(), // so Rollup can convert `ms` to an ES module
      url(),
    ],
  },
];
