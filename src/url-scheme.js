function notImplementedError() {
  return Promise.reject(new Error('Not implemented'));
}

/**
 * @param {Object} options raw config
 *
 * @property {Object} options raw config
 */
export class URLScheme {
  /**
   * supported methods
   * @return {string[]} 'get', 'stat', 'put', 'delete', 'list', 'history'
   */
  static get methods() {
    return ['get', 'stat', 'put', 'delete', 'list', 'history'];
  }

  /**
   * @return {boolean} false
   */
  static get isSecure() {
    return false;
  }

  /**
   * @return {mumber} undefined by default
   */
  static get defaultPort() {
    return undefined;
  }

  /**
   * Default configuration options
   * @return {Object}
   */
  static get defaultOptions() {
    return {};
  }

  /**
   * Extract options suitable for the constructor
   * form the given set of environment variables
   * @param {Object} env
   * @return {Object} undefined if no suitable environment variables have been found
   */
  static optionsFromEnvironment(env) {
    return undefined;
  }

  /**
   * Pepare configuration by mixing together defaultOptions with actual options
   * @param {Object} options raw config
   * @return {Object} combined options
   */
  static options(options) {
    return Object.assign(this.defaultOptions, options);
  }

  constructor(options) {
    Object.defineProperty(this, 'options', { value: options });
  }

  /**
   * Should be overwritten to reflect the scheme name
   * @return {string} scheme name (defaults to the class name)
   */
  get name() {
    return this.constructor.name;
  }

  /**
   * @return {number} default from static defaultPort
   */
  get defaultPort() {
    return this.constructor.defaultPort;
  }

  /**
   * @return {boolean} default from static isSecure
   */
  get isSecure() {
    return this.constructor.isSecure;
  }

  toString() {
    return this.name;
  }

  /**
   * List collection (directory)
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @return {Promise} resolves to iterable entries
   */
  async *list(context, url, options) {
    return notImplementedError();
  }

  /**
   * Get content of a url
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @return {Promise} resolves to the content
   */
  async get(context, url, options) {
    return notImplementedError();
  }

  /**
   * Delivers meta information for a given url
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @return {Promise} resolves to one entry
   */
  async stat(context, url, options) {
    return notImplementedError();
  }

  /**
   * Put the content of a stream to a given url
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Stream} stream
   * @param {Object} options
   * @return {Promise} resolves if stream has ben put to the url
   */
  async put(context, url, stream, options) {
    return notImplementedError();
  }

  /**
   * Deletes object at a given url
   * @param {Context} context execution context
   * @param {URL} url
   * @return {Promise} resolves to the history of the object at the given url
   */
  async delete(context, url) {
    return notImplementedError();
  }

  /**
   * Deliver history information for a given url
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @return {Promise} resolves to the history of the object at the given url
   */
  async *history(context, url, options) {
    return notImplementedError();
  }
}
