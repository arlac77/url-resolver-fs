/* jslint node: true, esnext: true */

'use strict';

import URLScheme from './URLScheme';


function generate(name) {
  return function (url, ...args) {
    return this.baseScheme[name](this.remap(url), ...args);
  };
}

/**
 * Remap url
 * brs:some/path  -> https://myserver.com/repo/some/path
 * name: brs
 * baseScheme: https
 * prefix: https://myserver.com/repo/
 */
export default class URLMapperScheme extends URLScheme {

  /**
   * @param {URLScheme} baseScheme
   * @param {string} name of the newly created scheme
   * @param {string} prefix urls will be prefixed bz this value
   */
  constructor(baseScheme, name, prefix) {
    super();

    Object.defineProperty(this, 'baseScheme', {
      value: baseScheme
    });

    Object.defineProperty(this, 'name', {
      value: name
    });

    Object.defineProperty(this, 'prefix', {
      value: prefix
    });

    this.constructor.methods.forEach(name =>
      Object.defineProperty(this, name, {
        value: generate(name)
      }));
  }

  /**
   * Remapps url by separating sheme (and direct following '/') from suffix
   * and appending adding the suffix (in front)
   * @param {string} url to be remapped
   * @return {string} remapped url
   */
  remap(url) {
    const m = url.match(/^[^:]+:(\/\/)?(.*)/);
    return m ? this.prefix + m[2] : url;
  }
}
