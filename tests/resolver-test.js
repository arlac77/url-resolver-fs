import test from 'ava';
import Resolver from '../src/Resolver';
import HTTPScheme from '../src/HTTPScheme';
import URLMapperScheme from '../src/URLMapperScheme';

test('register schemes plain', t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  t.is(resolver.schemeForURL('http://somewhere/'), http);
});

test('register schemes mapper', t => {
  const resolver = new Resolver();
  const heise = new URLMapperScheme(new HTTPScheme(), 'heise', 'http://www.heise.de/');
  resolver.registerScheme(heise);

  t.is(resolver.schemeForURL('heise:index.html'), heise);
});

test('unknown reject get', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.get('something:index.html'));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject stat', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.stat('something:index.html'));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject put', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.put('something:index.html'));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject delete', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.delete('something:index.html'));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject get', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.get('something:index.html'));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject list', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.list('something:index.html'));
  t.is(error.message, 'Unknown scheme something:index.html');
});

test('unknown reject history', async t => {
  const resolver = new Resolver();
  const error = await t.throws(resolver.history('something:index.html'));
  t.is(error.message, 'Unknown scheme something:index.html');
});

/*
    it('handles unknown', () => assert.isUndefined(resolver.schemeForURL('undefined:index.html')));

  describe('construct with config', () => {
    const resolver = new Resolver({
      schemes: {
        tmp: {
          base: 'http',
          prefix: 'http:///tmp'
        }
      }
    }, [HTTPScheme]);

    it('has user scheme', () => assert.equal(resolver.schemes.get('tmp').name, 'tmp'));
    it('has predefined scheme', () => assert.equal(resolver.schemes.get('http').name, 'http'));
  });

  describe('resolving schemes', () => {
    it('can resolve', () => assert.equal(resolver.resolve('heise:index.html'), 'http://www.heise.de/index.html'));
    it('handles unknown', () => assert.isUndefined(resolver.resolve('unkn:index.html')));
  });

  describe('delegating', () => {
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

*/
