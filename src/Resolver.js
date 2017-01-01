/* jslint node: true, esnext: true */

'use strict';

import {
  defineRegistryProperties
} 
from 'registry-mixin';

/**
 *
 */
export default class Resolver {
  constructor() {
    defineRegistryProperties(this, 'scheme', {});
  }

  /**
   * get URLScheme for a given url
   * @param {String} url
   * @return {URLScheme} for a given url
   */
  schemeForURL(url) {
    const m = url.match(/^([^:]+):/);
    return this.schemes[m[1]];
  }

  get(url, ...args) {
    return this.schemeForURL(url).get(url, ...args);
  }

  stat(url, ...args) {
    return this.schemeForURL(uri).stat(url, ...args);
  }

  put(url, ...args) {
    return this.schemeForURL(uri).put(url, ...args);
  }

  delete(url, ...args) {
    return this.schemeForURL(uri).delete(url, ...args);
  }
  
  list(url, ...args) {
    return this.schemeForURL(uri).list(url, ...args);
  }

  history(url, ...args) {
    return this.schemeForURL(uri).history(url, ...args);
  }
}
