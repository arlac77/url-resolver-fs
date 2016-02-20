/*global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  resolver = require('../src/resolver'),
  uri = require('../src/uri-scheme');

class myScheme extends uri.URIScheme {

  get name() {
    return 'my';
  }
  get type() {
    return myScheme.name;
  }
}

describe('resolver', () => {
  const r = new resolver.Resolver();
  const ms = new myScheme();

  describe('register scheme', () => {
    r.registerScheme(myScheme);
    it('registered', () => assert.equals(r.schemes.my.name, 'my'));
  });
});
