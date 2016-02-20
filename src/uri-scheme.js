/* jslint node: true, esnext: true */

"use strict";

class URIScheme {

  get name() {
    return 'unknown';
  }
  get type() {
    return URIScheme.name;
  }

}

exports.URIScheme = URIScheme;
