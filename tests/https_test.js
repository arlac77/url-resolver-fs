/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  HTTPSScheme = require('../dist/module').HTTPSScheme;

describe('https', () => {
  const scheme = new HTTPSScheme();

  it('has name', () => assert.equal(scheme.name, 'https'));

  it('is secure', () => assert.equal(scheme.isSecure, true));

  it('default port', () => assert.equal(scheme.defaultPort, 443));

  it('can get', done => {
    scheme.get('https://www.heise.de/index.html').then(s => {
      assert.isDefined(s);

      s.on('data', chunk => {
        if (chunk.includes('DOCTYPE')) {
          done();
        }
      });
    });
  });

  it('can stat', () => {
    return scheme.stat('https://www.heise.de/index.html').then(s => assert.equal(s.status, 200));
  });

  describe('with proxy', () => {
    const scheme = new HTTPSScheme({
      proxy: 'http://104.236.241.128:8080/'
        //proxy: 'http://173.212.49.74:8080'
        // INV proxy: 'http://96.80.45.1:80'
        //proxy: 'http://85.28.193.95:8080'
        //proxy: 'http://localhost:8888'
    });
    it('can get', done => {
      scheme.get('https://www.google.com/').then(s => {
        assert.isDefined(s);

        let isDone = false;

        s.on('data', chunk => {
          if (chunk.includes('Google')) {
            if (!isDone) {
              done();
              isDone = true;
            }
          }
        });
      });
    });
  });
});
