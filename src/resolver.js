import URLScheme from './url-scheme';
import Context from './context';
import URLMapperScheme from './url-mapper-scheme';
const { URL } = require('url');

function generate(name) {
  return function(context, url, ...args) {
    const scheme = this.schemeForURL(url);
    return scheme === undefined
      ? Promise.reject(new Error(`Unknown scheme ${url}`))
      : scheme[name](context, url, ...args);
  };
}

/**
 * Holds a map of url-schemes and dispatches requests
 */
export default class Resolver extends URLScheme {
  /**
   * @param config {object}
   * @param predefined {URLScheme[]} schemes to start with
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
        this.registerScheme(
          new URLMapperScheme(
            this.schemes.get(scheme.base),
            name,
            scheme.prefix
          )
        );
      });
    }
  }

  /**
   * Register a scheme for later lookup
   * @param scheme {URLScheme}
   */
  registerScheme(scheme) {
    this.schemes.set(scheme.name, scheme);
    this.schemes.set(scheme.name + ':', scheme);
  }

  /**
   * Get URLScheme for a given url
   * @param url {URL}
   * @return {URLScheme} for a given url or undefined if nothing found
   */
  schemeForURL(url) {
    return this.schemes.get(url.protocol);
  }

  /**
   * Resolve for a given url.
   * Passes url to the registered scheme for remapping
   * @param url {URL} to be resolved
   * @return {URL} resolved url or original URL if no remapping found
   */
  resolve(url) {
    const scheme = this.schemeForURL(url);
    return scheme === undefined ? url : scheme.remap(url);
  }

  /**
   * Create a new context
   * @param base {URL} base url
   * @return {Context} newly created context
   */
  createContext(base) {
    return new Context(this, base);
  }
}

Resolver.methods.forEach(name =>
  Object.defineProperty(Resolver.prototype, name, {
    value: generate(name)
  })
);
