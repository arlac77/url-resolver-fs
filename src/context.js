/**
 * Holds context information
 *
 */
export default class Context {
  constructor(resolver) {
    Object.defineProperty(this, 'resolver', {
      value: resolver
    });

  }
}
