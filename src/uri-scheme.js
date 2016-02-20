/* jslint node: true, esnext: true */

class URIScheme {

  get name() {
    return 'unknown';
  }
  get type() {
    return URIScheme.name;
  }

}

exports.URIScheme = URIScheme;
