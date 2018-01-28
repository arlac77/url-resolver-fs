import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  output: {
    file: pkg.main,
    format: 'cjs'
  },

  external: [
    'os',
    'fs',
    'tty',
    'events',
    'util',
    'net',
    'tls',
    'https',
    'btoa',
    'url',
    'node-fetch',
    'http-proxy-agent',
    'https-proxy-agent'
  ],

  plugins: [
    babel({
      babelrc: false,
      presets: ['stage-3'],
      plugins: [],
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ],

  input: pkg.module
};
