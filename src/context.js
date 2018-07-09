import { URLScheme } from './url-scheme';
import { URL } from 'url';

/**
 * Holds context information
 * @param {Resolver} resolver
 * @param {URL} base
 *
 * @property {Resolver} resolver
 * @property {URL} base the current base URL
 */
export class Context {
  constructor(resolver, base) {
    Object.defineProperty(this, 'resolver', {
      value: resolver
    });

    this._base = base;
  }

  /**
   * @type {URL}
   */
  get base() {
    return this._base;
  }

  set base(url) {
    this._base = url;
  }

  /**
   * @param {URL} url
   * @return {URL}
   */
  resolve(url) {
    return this.resolver.resolve(new URL(url, this.base));
  }

  async handleAuthorization(response, scheme, url, options) {
    console.log(`handle authorization ${url}`);

    return options;
  }
}

URLScheme.methods.forEach(name =>
  Object.defineProperty(Context.prototype, name, {
    value: function(url, ...args) {
      return this.resolver[name](this, new URL(url, this.base), ...args);
    }
  })
);
