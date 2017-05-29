/* jslint node: true, esnext: true */
'use strict';
import babel from 'rollup-plugin-babel';

export default {
  format: 'cjs',
  plugins: [
    babel({
      babelrc: false,
      presets: [
        'stage-3'
      ],
      plugins: [],
      exclude: 'node_modules/**'
    })
  ]
};
