import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
  output: {
    file: pkg.main,
    format: 'cjs'
  },

  external: ['node-fetch'],

  plugins: [
    babel({
      babelrc: false,
      presets: ['stage-3'],
      plugins: [],
      exclude: 'node_modules/**'
    })
  ],

  input: pkg.module
};
