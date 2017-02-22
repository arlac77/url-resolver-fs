/* jslint node: true, esnext: true */

'use strict';

function notImplementedError() {
  return Promise.reject(new Error('Not implemented'));
}

export default class URLScheme {

  /**
   * supported methods
   */
  static get methods() {
    return ['get', 'stat', 'put', 'delete', 'list', 'history'];
  }

  /**
   * @return {boolean} false
   */
  static get isSecure() {
    return false;
  }

  /**
   * @return {mumber} undefined by default
   */
  static get defaultPort() {
    return undefined;
  }

  get type() {
    return this.constructor.name;
  }

  get name() {
    return this.type;
  }

  /**
   * @return {number} default from static defaultPort
   */
  get defaultPort() {
    return this.constructor.defaultPort;
  }

  /**
   * @return {boolean} default from static isSecure
   */
  get isSecure() {
    return this.constructor.isSecure;
  }

  toString() {
    return this.name;
  }

  /**
   * List content of a collection (directory)
   * @param {string} url
   * @param {object} options
   * @return {Promise} resolves to iterable entries
   */
  list(url, options) {
    return notImplementedError();
  }

  get(url, options) {
    return notImplementedError();
  }

  stat(url, options) {
    return notImplementedError();
  }

  put(url, stream, options) {
    return notImplementedError();
  }

  delete(url) {
    return notImplementedError();
  }

  history(url, options) {
    return notImplementedError();
  }
}
