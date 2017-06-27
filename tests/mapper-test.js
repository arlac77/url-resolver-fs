/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  {
    HTTPScheme, URLMapperScheme
  } = require('../dist/module');

describe('mapper', () => {
  describe('prefix only', () => {
    const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'http://www.heise.de/');

    it('can simple map', () =>
      assert.equal(mapper.remap('myscheme:some/path'), 'http://www.heise.de/some/path')
    );

    it('can get', done => {
      mapper.get('myscheme:index.html').then(s => {
        assert.isDefined(s);

        s.on('data', chunk => {
          if (chunk.includes('DOCTYPE')) {
            done();
          }
        });
      });
    });

    it('can stat', () => mapper.stat('myscheme:index.html').then(s => assert.equal(s.status, 200)));
  });
});
