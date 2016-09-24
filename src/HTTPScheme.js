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

  get type() {
    return HTTPScheme.name;
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
    return 'Basic ' + btoa(this.credentials.user + ':' + this.credentials.password);
  }

  _fetch(u, options) {
    options = Object.assign({}, {
      agent: this.agent,
    }, options);

    options.headers = Object.assign({
      authorization: this.basicAuthorization
    }, options.headers);

    return fetch(this.url === undefined ? u : url.resolve(this.url, u), options);
  }

  fetch(u, options) {
    return this._fetch(u, options).then(r => r.body);
  }
}
