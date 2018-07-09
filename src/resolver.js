import { URLScheme } from './url-scheme';
import { Context } from './context';
import { URLMapperScheme } from './url-mapper-scheme';
import { URL } from 'url';

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
 * @param {Object} config
 * @param {URLScheme[]} predefinedConstructors schemes to start with
 * @param {Object} env environment variables as present in process.env
 *
 * @property {Map<string,URLScheme>} schemes
 */
export class Resolver extends URLScheme {
  constructor(config = {}, predefinedConstructors = [], env = {}) {
    super(config);

    Object.defineProperty(this, 'schemes', {
      value: new Map()
    });

    predefinedConstructors.forEach(schemeConstructor => {
      const scheme = new schemeConstructor(
        schemeConstructor.options(schemeConstructor.optionsFromEnvironment(env))
      );
      this.registerScheme(scheme);
    });

    if (config.schemes !== undefined) {
      Object.keys(config.schemes).forEach(name => {
        const schemeConfig = config.schemes[name];

        const scheme =
          schemeConfig.options === undefined
            ? this.schemes.get(schemeConfig.base)
            : new (predefinedConstructors.find(
                pc => pc.name === schemeConfig.base
              ))(schemeConfig.options);

        this.registerScheme(
          schemeConfig.prefix === undefined
            ? scheme
            : new URLMapperScheme(
                scheme,
                name,
                schemeConfig.prefix,
                schemeConfig.options
              )
        );
      });
    }
  }

  /**
   * Register a scheme for later lookup
   * @param {URLScheme} scheme
   */
  registerScheme(scheme) {
    this.schemes.set(scheme.name, scheme);
  }

  /**
   * Get URLScheme for a given url
   * @param {URL} url
   * @return {URLScheme} for a given url or undefined if nothing found
   */
  schemeForURL(url) {
    const protocol = url.protocol;

    if (protocol === undefined) {
      return undefined;
    }

    return this.schemes.get(protocol.replace(/:/, ''));
  }

  /**
   * Resolve for a given url.
   * Passes url to the registered scheme for remapping
   * @param {URL} url to be resolved
   * @return {URL} resolved url or original URL if no remapping found
   */
  resolve(url) {
    const scheme = this.schemeForURL(url);
    return scheme === undefined ? url : scheme.remap(url);
  }

  /**
   * Create a new context
   * @param {URL} base url
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
