/* jslint node: true, esnext: true */

'use strict';

const btoa = require('btoa'),
  HttpsProxyAgent = require('https-proxy-agent'),
  fetch = require('node-fetch'),
  url = require('url');

import URLScheme from './URLScheme';

export default class HTTPScheme extends URLScheme {
  static get name() {
    return 'http';
  }

  /**
   * @param {object} [options={}]
   */
  constructor(options = {}) {
    super(url, options);

    this._options = {
      headers: {}
    };

    if (options.proxy) {
      this._options.agent = new HttpsProxyAgent(options.proxy);
    }

    if (options.credentials) {
      this._options.headers.authorization = 'Basic ' + btoa(options.credentials.user + ':' + options.credentials.password);
    }
  }

  /**
   * @param {string} url
   * @param {object} [options={}]
   * @return {object} fetch result
   */
  fetch(url, options = {}) {
    return fetch(url, Object.assign({},
      options,
      this._options, {
        headers: Object.assign({}, this._options.headers, options.headers)
      }));
  }


  /**
   * Execute a GET request
   * @param {string} url
   * @param {object} [options]
   * @return {object} body of the response
   */
  get(url, options) {
    return this.fetch(url, options).then(r => r.body);
  }


  /**
   * Execute a PUT request
   * @param {string} url
   * @param {Stream} stream content to be put to the url
   * @param {object} [options]
   */
  put(url, stream, options) {
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
  stat(url, options) {
    return this.fetch(url, Object.assign({
      method: 'head'
    }, options));
  }
}
