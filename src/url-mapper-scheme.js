import URLScheme from './url-scheme';
const { URL } = require('url');

function generate(name) {
  return function(url, ...args) {
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
   * @param baseScheme {URLScheme}
   * @param name {string} of the newly created scheme
   * @param prefix {string} urls will be prefixed by this value
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
      })
    );
  }

  /**
   * Remapps url by separating scheme (and direct following '/') from suffix
   * and appending the suffix (in front)
   * @param url {URL} to be remapped
   * @return {URL} remapped url
   */
  remap(url) {
    const m = url.href.match(/^[^:]+:(\/\/)?(.*)/);
    return m ? new URL(this.prefix + m[2]) : url;
  }
}
