import { URLScheme } from './url-scheme';
import fetch from 'node-fetch';
import btoa from 'btoa';

import HttpProxyAgent from 'http-proxy-agent';
import HttpsProxyAgent from 'https-proxy-agent';

/**
 * URLScheme for http requests
 * @param {Object} options
 * @param {string} options.proxy
 * @param {Object} options.credentials
 * @param {string} options.credentials.user
 * @param {string} options.credentials.password
 *
 * @property {Object} options
 */
export class HTTPScheme extends URLScheme {
  /**
   * @return {string} 'http'
   */
  static get name() {
    return 'http';
  }

  /**
   * @return {number} 80 the http default port
   */
  static get defaultPort() {
    return 80;
  }

  /**
   * Extract options suitable for the constructor
   * form the given set of environment variables
   * @param {Object} env
   * @return {Object} undefined if no suitable environment variables have been found
   */
  static optionsFromEnvironment(env) {
    if (env !== undefined) {
      if (env.HTTP_PROXY !== undefined) {
        return { proxy: env.HTTP_PROXY };
      }
      if (env.HTTPS_PROXY !== undefined) {
        return { proxy: env.HTTPS_PROXY };
      }
    }

    return undefined;
  }

  constructor(options = {}) {
    super(options);

    Object.defineProperty(this, 'httpOptions', { value: { headers: {} } });

    if (options.proxy !== undefined) {
      this.httpOptions.agent = this.isSecure
        ? new HttpsProxyAgent(options.proxy)
        : new HttpProxyAgent(options.proxy);
    }

    if (options.credentials !== undefined) {
      this.httpOptions.headers.authorization =
        'Basic ' +
        btoa(options.credentials.user + ':' + options.credentials.password);
    }
  }

  /**
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @return {Promise} fetch result
   */
  async fetch(context, url, options = {}) {
    const response = await fetch(
      url,
      Object.assign({}, options, this.httpOptions, {
        headers: Object.assign({}, this.httpOptions.headers, options.headers)
      })
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response);
    }

    return response;
  }

  /**
   * Execute a GET request
   * @param {Context} context execution context
   * @param {URL} url source
   * @param {Object} options
   * @return {Promise} body of the response
   */
  async get(context, url, options) {
    const response = await this.fetch(context, url, options);
    return response.body;
  }

  /**
   * Execute a PUT request
   * @param {Context} context execution context
   * @param {URL} url destination
   * @param {Stream} stream content to be put to the url
   * @param {Object} options
   */
  async put(context, url, stream, options) {
    return this.fetch(
      context,
      url,
      Object.assign(
        {
          method: 'put',
          data: stream
        },
        options
      )
    );
  }

  /**
   * Execute a HEAD request
   * @param {Context} context execution context
   * @param {URL} url
   * @param {Object} options
   * @param {string} options.method
   * @return {Object} response object
   */
  async stat(context, url, options) {
    return this.fetch(
      context,
      url,
      Object.assign(
        {
          method: 'head'
        },
        options
      )
    );
  }
}
