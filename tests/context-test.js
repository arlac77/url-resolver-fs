import test from 'ava';
import { Resolver } from '../src/resolver';
import { Context } from '../src/context';
import { HTTPScheme } from '../src/http-scheme';
import { URL } from 'url';

test('context from resolver', t => {
  const resolver = new Resolver();

  const context = resolver.createContext({
    base: new URL('http://www.heise.de')
  });

  t.is(
    context.resolve('index.html').href,
    new URL('http://www.heise.de/index.html').href
  );
});

test.cb('context can get relative', t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  const context = resolver.createContext({
    base: new URL('http://www.heise.de')
  });

  t.plan(1);

  context.get('index.html').then(stream =>
    stream.on('data', chunk => {
      if (chunk.includes('DOCTYPE')) {
        t.pass();
        t.end();
      }
    })
  );
});

test('context can stat relative', async t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  const context = resolver.createContext({
    base: new URL('http://www.heise.de')
  });
  const response = await context.stat('index.html');

  t.is(response.status, 200);
});
