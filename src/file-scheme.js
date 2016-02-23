/* jslint node: true, esnext: true */

"use strict";

const fs = require('fs'),
  urs = require('./uri-scheme');


class FileScheme extends urs.URIScheme {

  static get name() {
    return "file";
  }

  get type() {
    return FileScheme.name;
  }

  fetch(url, options) {
    const m = url.match(/^file:\/\/(.*)/);
    if (m) {
      return Promise.resolve(fs.createReadFile(m[1]));
    }

    return Promise.reject(new Error(`invalid url: ${url}`));
  }
}

exports.FileScheme = FileScheme;
