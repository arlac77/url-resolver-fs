/* jslint node: true, esnext: true */

'use strict';

const fs = require('fs');

import URIScheme from './URIScheme';

/**
 * URIScheme for file system access
 */
export default class FileScheme extends URIScheme {

  static get name() {
    return 'file';
  }

  /**
   * Creates a readable stream for the content of th file associated to a given file URL
   * @param {String} url of the a file
   * @returns {Promise}
   * @fulfil {ReadableStream} - of the file content
   */
  fetch(url, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return Promise.resolve(fs.createReadStream(m[1]));
    }

    return Promise.reject(new Error(`Invalid file url: ${url}`));
  }

  /**
   * List content of a directory
   * @param {String} url of the a directory
   * @returns {Promise}
   * @fulfil {String[]} - file names
   * @reject {Error} - as deliverd by fs.readdir()
   */
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
