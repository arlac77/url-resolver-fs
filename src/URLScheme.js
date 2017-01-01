/* jslint node: true, esnext: true */

'use strict';

function notImplementedError()
{
  return Promise.reject(new Error('Not implemented'));
}

export default class URLScheme {

  get type() {
    return this.constructor.name();
  }

  get name() {
    return this.type;
  }

  toString() {
    return this.name;
  }

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
