/* jslint node: true, esnext: true */

"use strict";

class URIScheme {

  static get name() {
    return 'unknown';
  }

  get type() {
    return URIScheme.name;
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

  fetch(uri, options) {
    return Promise.reject(new Error('Not implemented'));
  }

  history(uri, options) {
    return Promise.reject(new Error('Not implemented'));
  }
}

class URIDerivedScheme extends URIScheme {

  constructor(baseScheme) {
    super();

    Object.defineProperty(this, 'baseScheme', {
      value: baseScheme
    });
  }

  transposeURI(uri) {}
}

exports.URIScheme = URIScheme;
exports.URIDerivedScheme = URIDerivedScheme;
