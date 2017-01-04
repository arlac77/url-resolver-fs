/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  HTTPScheme = require('../dist/module').HTTPScheme;

describe('http', () => {
  const h = new HTTPScheme();

  it('can get', done => {
    h.get('http://www.heise.de/index.html').then(s => {
      assert.isDefined(s);

      s.on('data', chunk => {
        if (chunk.includes('DOCTYPE')) {
          done();
        }
      });
    });
  });

  it('can stat', () => {
    return h.stat('http://www.heise.de/index.html').then(s => {
      assert.equal(s.status, 200);
      assert.isDefined(s);
    });
  });

  describe('basic auth', () => {
    const h = new HTTPScheme({
      credentials: {
        password: 'xxx',
        user: 'yyy'
      }
    });

    it('has basicAuthorization', () => {
      assert.equal(h._options.headers.authorization, 'Basic eXl5Onh4eA==');
    });
  });

  describe('with proxy', () => {
    const h = new HTTPScheme({
      proxy: 'http://178.63.101.197:80'
    });
    xit('can get', done => {
      h.get('http://www.heise.de/index.html').then(s => {
        assert.isDefined(s);

        s.on('data', chunk => {
          //console.log(chunk.toString('ascii'));

          if (chunk.includes('DOCTYPE')) {
            done();
          }
        });
      });
    });

  });
});
