import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
  input: 'tests/**/*-test.js',
  external: [
    'ava',
    'btoa',
    'url',
    'http',
    'node-fetch',
    'http-proxy-agent',
    'https-proxy-agent'
  ],

  plugins: [
    babel({
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
      exclude: 'node_modules/**'
    }),
    multiEntry()
  ],

  output: {
    file: 'build/bundle-test.js',
    format: 'cjs',
    sourcemap: true,
    interop: false
  }
};
