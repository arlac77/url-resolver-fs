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
    const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'https://myserver.com/repo/');

    it('can simple map', () =>
      assert.equal(mapper.remap('myscheme:some/path'), 'https://myserver.com/repo/some/path')
    );
  });

});
