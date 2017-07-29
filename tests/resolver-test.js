import test from 'ava';
import Resolver from '../src/resolver';
import HTTPScheme from '../src/http-scheme';
import URLMapperScheme from '../src/url-mapper-scheme';
const { URL } = require('url');

test('register schemes plain', t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  t.is(resolver.schemeForURL(new URL('http://somewhere/')), http);
});

test('register schemes mapper', t => {
  const resolver = new Resolver();
  const heise = new URLMapperScheme(
    new HTTPScheme(),
    'heise',
    new URL('http://www.heise.de/')
  );
  resolver.registerScheme(heise);

  t.is(resolver.schemeForURL(new URL('heise:index.html')), heise);
  t.is(
    resolver.resolve(new URL('heise:index.html')).href,
    new URL('http://www.heise.de/index.html').href
  );
});

test('register schemes from config', t => {
  const resolver = new Resolver(
    {
      schemes: {
        tmp: {
          base: 'http',
          prefix: 'http:///tmp'
        }
      }
    },
    [HTTPScheme]
  );

  t.is(resolver.schemes.get('http').name, 'http');
  t.is(resolver.schemes.get('tmp').name, 'tmp');
});

test('handles unknown', t => {
  const resolver = new Resolver();
  t.is(resolver.schemeForURL(new URL('undefined:index.html')), undefined);
  t.is(resolver.resolve(new URL('undefined:index.html')), undefined);
});

test('unknown reject get', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.get(new URL('something:index.html')));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject stat', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.stat(new URL('something:index.html')));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject put', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.put(new URL('something:index.html')));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject delete', async t => {
  const resolver = new Resolver();
  const error = await t.throws(
    resolver.delete(new URL('something:index.html'))
  );
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject list', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.list(new URL('something:index.html')));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject history', async t => {
  const resolver = new Resolver();
  const error = await t.throws(
    resolver.history(new URL('something:index.html'))
  );
  t.is(error.message, 'Unknown scheme something:index.html');
});

test.cb('delegating can get', t => {
  const resolver = new Resolver();
  const heise = new URLMapperScheme(
    new HTTPScheme(),
    'heise',
    new URL('http://www.heise.de/')
  );
  resolver.registerScheme(heise);

  t.plan(1);

  resolver.get(new URL('heise:index.html')).then(stream =>
    stream.on('data', chunk => {
      if (chunk.includes('DOCTYPE')) {
        t.pass();
        t.end();
      }
    })
  );
});
