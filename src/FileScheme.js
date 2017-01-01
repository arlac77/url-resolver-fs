/* jslint node: true, esnext: true */

'use strict';

const fs = require('fs');

import URLScheme from './URLScheme';

function invalidURLError(url)
{
  Promise.reject(new Error(`Invalid file url: ${url}`));
}

/**
 * URLScheme for file system access
 */
export default class FileScheme extends URLScheme {

  static get name() {
    return 'file';
  }

  /**
   * Creates a readable stream for the content of th file associated to a given file URL
   * @param {String} url of the a file
   * @returns {Promise}
   * @fulfil {ReadableStream} - of the file content
   */
  get(url, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return Promise.resolve(fs.createReadStream(m[1]));
    }

    return invalidURLError(url);
  }

  /**
   * Read stat of a file assiciacted to a given file URL
   * @param {String} url of the a file
   * @returns {Promise}
   * @fulfil {Object} - as delivered by fs.stat()
   * @reject {Error} - if url is not a file url or fs.stat() error
   */
  stat(url, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return new Promise((fullfill, reject) => {
        fs.stat(m[1], (err, stat) => {
          if (err) {
            reject(err);
          } else {
            fullfill(stat);
          }
        });
      });
    }

    return invalidURLError(url);
  }

  /**
   * Put content of a stream to a file assiciacted to a given file URL
   * @param {String} url of the a file
   * @returns {Promise}
   * @fulfil {Void} - undefined
   * @reject {Error} - if url is not a file url
   */
  put(url, stream, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return new Promise((fullfill, reject) => {
        const w = fs.createWriteStream(m[1]);
        stream.pipe(w);
        fullfill();
      });
    }

    return invalidURLError(url);
  }

  /**
   * Deletes the file assiciacted to a given file URL
   * @param {String} url of the a file
   * @returns {Promise}
   * @fulfil {Void} - undefined
   * @reject {Error} - as delivered by fs.unlink()
   */
  delete(url) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return new Promise((fullfill, reject) => {
        fs.unlink(m[1], (err) => {
          if (err) {
            reject(err);
          } else {
            fullfill();
          }
        });
      });
    }
    
    return invalidURLError(url);
  }

  /**
   * List content of a directory
   * @param {String} url of the a directory
   * @returns {Promise}
   * @fulfil {String[]} - file names
   * @reject {Error} - as delivered by fs.readdir()
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

    return invalidURLError(url);
  }
}
