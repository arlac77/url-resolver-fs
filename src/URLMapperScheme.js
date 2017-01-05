/* jslint node: true, esnext: true */

'use strict';

import URLScheme from './URLScheme';

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
  }

  list(url, ...args) {
    return this.baseScheme.list(this.remap(url), ...args);
  }

  get(url, ...args) {
    return this.baseScheme.get(this.remap(url), ...args);
  }

  put(url, ...args) {
    return this.baseScheme.put(this.remap(url), ...args);
  }

  delete(url, ...args) {
    return this.baseScheme.delete(this.remap(url), ...args);
  }

  stat(url, ...args) {
    return this.baseScheme.stat(this.remap(url), ...args);
  }

  history(url, ...args) {
    return this.baseScheme.history(this.remap(url), ...args);
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
