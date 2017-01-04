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
   * @param options
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
   * @param {String} url
   * @param {Object} options
   */
  fetch(url, options = {}) {
    return fetch(url, Object.assign({},
      options,
      this._options, {
        headers: Object.assign({}, this._options.headers, options.headers)
      }));
  }

  get(url, options) {
    return this.fetch(url, options).then(r => r.body);
  }

  put(url, stream, options = {}) {
    return this.fetch(url, Object.assign({
      method: 'put',
      data: stream
    }, options));
  }

  stat(url, options = {}) {
    return this.fetch(url, Object.assign({
      method: 'head'
    }, options));
  }
}
