/* jslint node: true, esnext: true */

'use strict';

export default class URIScheme {

  get type() {
    return this.constructor.name();
  }

  get name() {
    return this.type;
  }

  toString() {
    return this.name;
  }

  list(uri, options) {
    return Promise.reject(new Error('Not implemented'));
  }

  get(uri, options) {
    return Promise.reject(new Error('Not implemented'));
  }

  stat(uri, options) {
    return Promise.reject(new Error('Not implemented'));
  }

  put(uri, stream, options) {
    return Promise.reject(new Error('Not implemented'));
  }

  delete(uri) {
    return Promise.reject(new Error('Not implemented'));
  }

  history(uri, options) {
    return Promise.reject(new Error('Not implemented'));
  }
}
