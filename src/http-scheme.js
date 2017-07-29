import URLScheme from './url-scheme';
import fetch from 'node-fetch';

const url = require('url');
const btoa = require('btoa'),
  HttpProxyAgent = require('http-proxy-agent'),
  HttpsProxyAgent = require('https-proxy-agent');

/**
 * URLScheme for http requests
 */
export default class HTTPScheme extends URLScheme {
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
   * @param [options={}] {object}
   */
  constructor(options = {}) {
    super(url, options);

    this._options = {
      headers: {}
    };

    if (options.proxy !== undefined) {
      this._options.agent = this.isSecure
        ? new HttpsProxyAgent(options.proxy)
        : new HttpProxyAgent(options.proxy);
    }

    if (options.credentials !== undefined) {
      this._options.headers.authorization =
        'Basic ' +
        btoa(options.credentials.user + ':' + options.credentials.password);
    }
  }

  /**
   * @param url {URL}
   * @param [options={}] {object}
   * @return {Promise} fetch result
   */
  async fetch(url, options = {}) {
    const response = await fetch(
      url,
      Object.assign({}, options, this._options, {
        headers: Object.assign({}, this._options.headers, options.headers)
      })
    );

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response);
    }

    return response;
  }

  /**
   * Execute a GET request
   * @param url {URL} source
   * @param [options] {object}
   * @return {Promise} body of the response
   */
  async get(url, options) {
    const response = await this.fetch(url, options);
    return response.body;
  }

  /**
   * Execute a PUT request
   * @param url {URL} destination
   * @param stream {Stream} content to be put to the url
   * @param [options] {object}
   */
  async put(url, stream, options) {
    return this.fetch(
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
   * @param url {URL}
   * @param [options] {object} 
   * @return {object} response object
   */
  async stat(url, options) {
    return this.fetch(
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
