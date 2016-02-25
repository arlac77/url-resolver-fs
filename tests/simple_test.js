/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  resolver = require('../src/resolver'),
  uri = require('../src/uri-scheme'),
  FileScheme = require('../src/file-scheme');

describe('resolver', () => {
  const r = new resolver.Resolver();

  describe('register scheme', () => {
    r.registerScheme(FileScheme);
    it('registered', () => assert.equal(r.schemes.file.name, 'file'));
    it('schemeForURI', () => assert.equal(r.schemeForURI('file:x/y/z').name, 'file'));
  });
});
