/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  HTTPSScheme = require('../dist/module').HTTPSScheme;

describe('https', () => {
  const h = new HTTPSScheme();

  it('can get', done => {
    h.get('https://www.heise.de/index.html').then(s => {
      assert.isDefined(s);

      s.on('data', chunk => {
        if (chunk.includes('DOCTYPE')) {
          done();
        }
      });
    });
  });

  it('can stat', () => {
    return h.stat('https://www.heise.de/index.html').then(s => assert.equal(s.status, 200));
  });

  describe('with proxy', () => {
    const h = new HTTPSScheme({
      proxy: 'http://173.212.49.74:8080'
        //proxy: 'http://96.80.45.1:80'
        //proxy: 'http://85.28.193.95:8080'
        //proxy: 'http://localhost:8888'
    });
    xit('can get', done => {
      h.get('https://www.mfelten.de/index.html').then(s => {
        assert.isDefined(s);

        s.on('data', chunk => {
          console.log(chunk.toString());
          if (chunk.includes('Welcome to nginx')) {
            done();
          }
        });
      });
    });
  });
});
