import { URLScheme } from './url-scheme';
import { URL } from 'url';

/**
 * Holds context information
 * @param {Resolver} resolver
 * @param {Object} options
 *
 * @property {Resolver} resolver
 * @property {Object} options
 * @property {URL} base the current base URL
 */
export class Context {
  constructor(resolver, options = {}) {
    Object.defineProperties(this, {
      resolver: {
        value: resolver
      },
      options: { value: options }
    });
  }

  /**
   * @type {URL}
   */
  get base() {
    return this.options.base;
  }

  set base(url) {
    this.options.base = url;
  }

  /**
   * @param {URL} url
   * @return {URL}
   */
  resolve(url) {
    return this.resolver.resolve(new URL(url, this.base));
  }

  /**
   * Called when authorization is required for a given realm
   * asks options.provideCredentials() and resolver.provideCredentials()
   * @param {string} realm requested realm
   * @return {Promise<Object>} credentials for the given realm
   */
  async provideCredentials(realm) {
    return (await Promise.all(
      [this.options, this.resolver]
        .filter(p => p !== undefined && p.provideCredentials !== undefined)
        .map(p => p.provideCredentials(realm))
    ))[0];
  }
}

URLScheme.methods.forEach(name =>
  Object.defineProperty(Context.prototype, name, {
    value: function(url, ...args) {
      return this.resolver[name](this, new URL(url, this.base), ...args);
    }
  })
);
