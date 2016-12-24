/* jslint node: true, esnext: true */

'use strict';

function notImplementedError()
{
  return Promise.reject(new Error('Not implemented'));
}

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
    return notImplementedError();
  }

  get(uri, options) {
    return notImplementedError();
  }

  stat(uri, options) {
    return notImplementedError();
  }

  put(uri, stream, options) {
    return notImplementedError();
  }

  delete(uri) {
    return notImplementedError();
  }

  history(uri, options) {
    return notImplementedError();
  }
}
