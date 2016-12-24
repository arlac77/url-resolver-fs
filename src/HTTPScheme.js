/* jslint node: true, esnext: true */

'use strict';

const btoa = require('btoa'),
  HttpsProxyAgent = require('https-proxy-agent'),
  fetch = require('node-fetch'),
  url = require('url');

import URIScheme from './URIScheme';

export default class HTTPScheme extends URIScheme {
  static get name() {
    return 'http';
  }

  constructor(url, options = {}) {
    super(url, options);

    let agent;

    if (options.proxy) {
      agent = new HttpsProxyAgent(options.proxy);
    }

    Object.defineProperties(this, {
      url: {
        get() {
          return url;
        }
      },
      agent: {
        get() {
          return agent;
        }
      },
      credentials: {
        get() {
          return options.credentials;
        }
      }
    });
  }

  get basicAuthorization() {
    return this.credentials ? 'Basic ' + btoa(this.credentials.user + ':' + this.credentials.password) : undefined;
  }

  _fetch(u, options) {
    options = Object.assign({}, {
      agent: this.agent,
    }, options);

    const ba = this.basicAuthorization;

    if (ba !== undefined) {
      options.headers = Object.assign({
        authorization: this.basicAuthorization
      }, options.headers);
    }

    return fetch(this.url === undefined ? u : url.resolve(this.url, u), options);
  }

  get(u, options) {
    return this._fetch(u, options).then(r => r.body);
  }

  stat(u, options = {}) {
    options.method = 'head';
    return this._fetch(u, options);
  }
}
