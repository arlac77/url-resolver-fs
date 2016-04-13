/* jslint node: true, esnext: true */

"use strict";

const btoa = require('btoa'),
  http = require('./http-scheme');

class HTTPSScheme extends http {

  static get name() {
    return 'https';
  }

  get type() {
    return HTTPSScheme.name;
  }
}

module.exports = HTTPSScheme;
