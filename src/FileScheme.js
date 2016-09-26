/* jslint node: true, esnext: true */

'use strict';

const fs = require('fs');

import URIScheme from './URIScheme';

export default class FileScheme extends URIScheme {

  static get name() {
    return 'file';
  }

  fetch(url, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return Promise.resolve(fs.createReadStream(m[1]));
    }

    return Promise.reject(new Error(`Invalid file url: ${url}`));
  }

  list(url, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return new Promise((fullfill, reject) => {
        fs.readdir(m[1], (err, files) => {
          if (err) {
            reject(err);
            return;
          }
          fullfill(files);
        });
      });
    }

    return Promise.reject(new Error(`Invalid file url: ${url}`));
  }
}
