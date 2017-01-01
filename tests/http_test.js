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
        //console.log(chunk.toString('ascii'));

        if (chunk.includes('DOCTYPE')) {
          done();
        }
      });
    });
  });

  it('can stat', () => {
    return h.stat('http://www.heise.de/index.html').then(s => {
      //console.log(s);
      assert.equal(s.status, 200);
      assert.isDefined(s);
    });
  });
});
