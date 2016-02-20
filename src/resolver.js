/* jslint node: true, esnext: true */

const rgm = require('registry-mixin');

class Resolver {
  constructor() {
    rgm.defineRegistryProperties(this, 'scheme', {});
  }

  schemeForURI(uri) {
    const m = uri.match(/^([^:]+):/);
    return this.schemes[m[1]];
  }

  fetch(uri, options) {
    return this.schemeForURI(uri).fetch(uri, options);
  }

}

exports.Resolver = Resolver;
