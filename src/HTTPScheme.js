/* jslint node: true, esnext: true */

'use strict';

const btoa = require('btoa'),
  HttpProxyAgent = require('http-proxy-agent'),
  HttpsProxyAgent = require('https-proxy-agent'),
  fetch = require('node-fetch'),
  url = require('url');

import URLScheme from './URLScheme';

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
   * @param {object} [options={}]
   */
  constructor(options = {}) {
    super(url, options);

    this._options = {
      headers: {}
    };

    if (options.proxy !== undefined) {
      this._options.agent = this.isSecure ? new HttpsProxyAgent(options.proxy) : new HttpProxyAgent(options.proxy);
    }

    if (options.credentials !== undefined) {
      this._options.headers.authorization = 'Basic ' + btoa(options.credentials.user + ':' + options.credentials.password);
    }
  }

  /**
   * @param {string} url
   * @param {object} [options={}]
   * @return {object} fetch result
   */
  async fetch(url, options = {}) {
    const response = await fetch(url, Object.assign({},
      options,
      this._options, {
        headers: Object.assign({}, this._options.headers, options.headers)
      }));

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response);
    }

    return response;
  }


  /**
   * Execute a GET request
   * @param {string} url source
   * @param {object} [options]
   * @return {object} body of the response
   */
  async get(url, options) {
    const response = await this.fetch(url, options);
    return response.body;
  }

  /**
   * Execute a PUT request
   * @param {string} url destination
   * @param {Stream} stream content to be put to the url
   * @param {object} [options]
   */
  async put(url, stream, options) {
    return this.fetch(url, Object.assign({
      method: 'put',
      data: stream
    }, options));
  }

  /**
   * Execute a HEAD request
   * @param {string} url
   * @param {object} [options]
   * @return {object} response object
   */
  async stat(url, options) {
    return this.fetch(url, Object.assign({
      method: 'head'
    }, options));
  }
}
