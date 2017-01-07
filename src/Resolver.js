/* jslint node: true, esnext: true */

'use strict';

/**
 *
 */
export default class Resolver {
  constructor() {
    Object.defineProperty(this, 'schemes', {
      value: new Map()
    });
  }

  /**
   * register a scheme for later lookup
   * @param {URLScheme} scheme
   */
  registerScheme(scheme) {
    this.schemes.set(scheme.name, scheme);
  }

  /**
   * get URLScheme for a given url
   * @param {string} url
   * @return {URLScheme} for a given url
   */
  schemeForURL(url) {
    const m = url.match(/^([^:]+):/);
    return this.schemes.get(m[1]);
  }

  /**
   * use semeForURl and forward request to the returend scheme
   */
  get(url, ...args) {
    return this.schemeForURL(url).get(url, ...args);
  }

  /**
   * use semeForURl and forward request to the returend scheme
   */
  stat(url, ...args) {
    return this.schemeForURL(url).stat(url, ...args);
  }

  /**
   * use semeForURl and forward request to the returend scheme
   */
  put(url, ...args) {
    return this.schemeForURL(url).put(url, ...args);
  }

  /**
   * use semeForURl and forward request to the returend scheme
   */
  delete(url, ...args) {
    return this.schemeForURL(url).delete(url, ...args);
  }

  /**
   * use semeForURl and forward request to the returend scheme
   */
  list(url, ...args) {
    return this.schemeForURL(url).list(url, ...args);
  }

  /**
   * use semeForURl and forward request to the returend scheme
   */
  history(url, ...args) {
    return this.schemeForURL(url).history(url, ...args);
  }
}
