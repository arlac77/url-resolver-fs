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

    Object.defineProperty(this, 'base', {
      value: base
    });
  }

  resolve(url) {
    console.log(`${new URL(url, this.base)}`);
    return this.resolver.resolve(new URL(url, this.base));
  }
}
