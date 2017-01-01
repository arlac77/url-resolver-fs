/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  {
    Resolver, FileScheme
  } = require('../dist/module');

describe('resolver', () => {
  const r = new Resolver();

  describe('register scheme', () => {
    r.registerScheme(FileScheme);
    it('registered', () => assert.equal(r.schemes.file.name, 'file'));
    it('schemeForURL', () => assert.equal(r.schemeForURL('file:x/y/z').name, 'file'));
  });
});
