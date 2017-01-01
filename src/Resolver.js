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
    return this.schemeForURL(url).stat(url, ...args);
  }

  put(url, ...args) {
    return this.schemeForURL(url).put(url, ...args);
  }

  delete(url, ...args) {
    return this.schemeForURL(url).delete(url, ...args);
  }

  list(url, ...args) {
    return this.schemeForURL(url).list(url, ...args);
  }

  history(url, ...args) {
    return this.schemeForURL(url).history(url, ...args);
  }
}
