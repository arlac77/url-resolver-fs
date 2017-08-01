const { URL } = require('url');

/**
 * Holds context information
 * base - the current base URL
 *
 */
export default class Context {
  constructor(resolver, base) {
    Object.defineProperty(this, 'resolver', {
      value: resolver
    });

    this._base = base;
  }

  get base() {
    return this._base;
  }

  set base(url) {
    this._base = url;
  }

  async list(url, options) {
    return this.resolver.list(this, new URL(url, this.base), options);
  }

  async history(url, options) {
    return this.resolver.history(this, new URL(url, this.base), options);
  }

  async put(url, stream, options) {
    return this.resolver.get(this, new URL(url, this.base), stream, options);
  }

  async get(url, options) {
    return this.resolver.get(this, new URL(url, this.base), options);
  }

  async stat(url, options) {
    return this.resolver.stat(this, new URL(url, this.base), options);
  }

  async delete(url) {
    return this.resolver.stat(this, new URL(url, this.base));
  }

  resolve(url) {
    return this.resolver.resolve(new URL(url, this.base));
  }
}
