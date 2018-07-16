import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  output: {
    file: pkg.main,
    format: 'cjs',
    interop: false
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
      runtimeHelpers: false,
      externalHelpers: true,
      babelrc: false,
      presets: [
        'stage-3',
        [
          'env',
          {
            targets: {
              node: '10'
            },
            modules: false
          }
        ]
      ],
      plugins: [],
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ],

  input: pkg.module
};
