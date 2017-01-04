/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  {
    Resolver, HTTPScheme, URLMapperScheme
  } = require('../dist/module');

describe('resolver', () => {
  const resolver = new Resolver();

  const http = new HTTPScheme();
  resolver.registerScheme(http);

  const heise = new URLMapperScheme(new HTTPScheme(), 'heise', 'http://www.heise.de/');
  resolver.registerScheme(heise);

  describe('register schemes', () => {
    it('can register schemes', () => assert.equal(resolver.schemeForURL('http://somewhere/'), http));
    it('can find schemes', () => assert.equal(resolver.schemeForURL('heise:index.html'), heise));
  });

  it('can get', done => {
    resolver.get('heise:index.html').then(s => {
      assert.isDefined(s);
      s.on('data', chunk => {
        if (chunk.includes('DOCTYPE')) {
          done();
        }
      });
    });
  });
});
