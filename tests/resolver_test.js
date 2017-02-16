/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  {
    Resolver, HTTPScheme, URLMapperScheme, FileScheme
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

  describe('construct with config', () => {
    const resolver = new Resolver({
      predefined: {
        http: HTTPScheme
      },
      schemes: {
        'tmp': {
          base: 'http',
          prefix: 'http:///tmp'
        }
      }
    });

    it('has tmp scheme', () => assert.equal(resolver.schemes.get('tmp').name, 'tmp'));
  });

  describe('delegating', () => {
    describe('unknown schemes reject', () => {

      it('get', () =>
        resolver.get('unknown:index.html').then(r => assert.isNotOk(r),
          e => assert.isDefined(e))
      );

      it('stat', () =>
        resolver.stat('unknown:index.html').then(r => assert.isNotOk(r),
          e => assert.isDefined(e))
      );

      it('put', () =>
        resolver.put('unknown:index.html').then(r => assert.isNotOk(r),
          e => assert.isDefined(e))
      );

      it('delete', () =>
        resolver.delete('unknown:index.html').then(r => assert.isNotOk(r),
          e => assert.isDefined(e))
      );

      it('list', () =>
        resolver.list('unknown:index.html').then(r => assert.isNotOk(r),
          e => assert.isDefined(e))
      );

      it('history', () =>
        resolver.history('unknown:index.html').then(r => assert.isNotOk(r),
          e => assert.isDefined(e))
      );
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
});
