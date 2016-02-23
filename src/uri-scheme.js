/* jslint node: true, esnext: true */

"use strict";

class URIScheme {

  static get name() {
    return 'unknown';
  }

  get type() {
    return URIScheme.name;
  }

  list(uri, options) {
    return Promise.reject(new Error("not implemented"));
  }

  fetch(uri, options) {
    return Promise.reject(new Error("not implemented"));
  }

  history(uri, options) {
    return Promise.reject(new Error("not implemented"));
  }
}

class URIDerivedScheme extends URIScheme {

  constructor(baseScheme) {
    super();

    Object.defineProperty(this, 'baseScheme', {
      value: baseScheme
    });

  }
}

exports.URIScheme = URIScheme;
exports.URIDerivedScheme = URIDerivedScheme;
