import HTTPScheme from './http-scheme';

/**
 * URLScheme for http requests
 */
export default class HTTPSScheme extends HTTPScheme {
  /**
   * @return {string} 'https'
   */
  static get name() {
    return 'https';
  }

  /**
   * @return {number} 443 the https default port
   */
  static get defaultPort() {
    return 443;
  }

  /**
   * @return {boolean} true
   */
  static get isSecure() {
    return true;
  }
}
