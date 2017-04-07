/* jslint node: true, esnext: true */

'use strict';

import URLScheme from './URLScheme';
import URLMapperScheme from './URLMapperScheme';

function generate(name) {
  return function (url, ...args) {
    const scheme = this.schemeForURL(url);
    return scheme !== undefined ? scheme[name](url, ...args) : Promise.reject(new Error(`Unknwon scheme ${url}`));
  };
}


/**
 * Holds a map of url-schemes and dispatches requests
 */
export default class Resolver extends URLScheme {

  /**
   * @param {object} config
   * @param {URLScheme[]} predefined schemes to start with
   */
  constructor(config = {}, predefined = []) {
    super();

    Object.defineProperty(this, 'schemes', {
      value: new Map()
    });

    predefined.forEach(scheme => this.registerScheme(scheme));

    if (config.schemes !== undefined) {
      Object.keys(config.schemes).forEach(name => {
        const scheme = config.schemes[name];
        this.registerScheme(new URLMapperScheme(this.schemes.get(scheme.base), name, scheme.prefix));
      });
    }

    this.constructor.methods.forEach(name =>
      Object.defineProperty(this, name, {
        value: generate(name)
      }));
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
   * @return {URLScheme} for a given url or undefined if nothing found
   */
  schemeForURL(url) {
    const m = url.match(/^([^:]+):/);
    return this.schemes.get(m[1]);
  }

  /**
   * Resolve for a given url.
   * Passes url to the registered scheme for remapping
   * @param {string} url
   * @return {string} resolved url or undefined if nothing found
   */
  resolve(url) {
    const scheme = this.schemeForURL(url);
    return scheme !== undefined ? scheme.remap(url) : undefined;
  }
}
