/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  HTTPScheme = require('../dist/module').HTTPScheme;

describe('http', () => {
  const scheme = new HTTPScheme();
  
  it('has name', () => assert.equal(scheme.name, 'http'));

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
      proxy: 'http://173.212.49.74:8080'
        // proxy: 'http://96.80.45.1:80'
        // proxy: 'http://85.28.193.95:8080'
        //proxy: 'http://localhost:8888'
    });
    xit('can get', done => {
      scheme.get('http://www.mfelten.de/index.html').then(s => {
        assert.isDefined(s);

        s.on('data', chunk => {
          //console.log(chunk.toString());
          if (chunk.includes('Welcome to nginx')) {
            done();
          }
        });
      });
    });

  });
});
