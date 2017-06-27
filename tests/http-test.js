/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  url = require('url'),
  http = require('http'),
  {
    HTTPScheme
  } = require('../dist/module');

http.createServer((request, response) => {

  const [host, port] = request.headers.host.split(/:/);
  const {
    pathname
  } = url.parse(request.url);

  const r = {
    host: host,
    port: port,
    path: pathname,
    method: request.method,
    headers: request.headers
  };

  const proxyRequest = http.request(r, proxyResponse => {
    response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    proxyResponse.pipe(response);
  });
  request.pipe(proxyRequest);
}).listen(8888);

describe('http', () => {
  const scheme = new HTTPScheme();

  it('has name', () => assert.equal(scheme.name, 'http'));

  it('is secure', () => assert.equal(scheme.isSecure, false));

  it('default port', () => assert.equal(scheme.defaultPort, 80));

  it('can get', done => {
    scheme.get('http://www.heise.de/index.html').then(s => {
      assert.isDefined(s);

      s.on('data', chunk => {
        if (chunk.includes('DOCTYPE')) {
          done();
        }
      });
    });
  });

  it('can stat', () => scheme.stat('http://www.heise.de/index.html').then(s => assert.equal(s.status, 200)));

  describe('basic auth', () => {
    const scheme = new HTTPScheme({
      credentials: {
        password: 'xxx',
        user: 'yyy'
      }
    });

    it('has basicAuthorization', () => assert.equal(scheme._options.headers.authorization, 'Basic eXl5Onh4eA=='));
  });

  describe('with proxy', () => {
    const scheme = new HTTPScheme({
      proxy: 'http://localhost:8888'
    });
    it('can get', done => {
      scheme.get('http://www.google.de/').then(s => {
        assert.isDefined(s);

        let isDone = false;
        s.on('data', chunk => {
          //console.log(chunk.toString());
          if (chunk.includes('google')) {

            if (!isDone) {
              done();
              isDone = true;
            }

            return;
          }
        });
      });
    });
  });
});
