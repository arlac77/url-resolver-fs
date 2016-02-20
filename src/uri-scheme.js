/* jslint node: true, esnext: true */

"use strict";

class URIScheme {

  static get name() {
    return 'unknown';
  }

  get type() {
    return URIScheme.name;
  }

}

class URIMapperScheme extends URIScheme {

  constructor(baseScheme) {
    super();

    Object.defineProperty(this, 'baseScheme', {
      value: baseScheme
    });
  }
}

exports.URIScheme = URIScheme;
exports.URIMapperScheme = URIMapperScheme;
