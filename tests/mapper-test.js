import test from 'ava';
import URLMapperScheme from '../src/url-mapper-scheme';
import HTTPScheme from '../src/http-scheme';

test('prefix only simple map', t => {
  const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'http://www.heise.de/');
  t.is(mapper.remap('myscheme:some/path'), 'http://www.heise.de/some/path');
});

test.cb('can get', t => {
  const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'http://www.heise.de/');

  t.plan(1);

  mapper.get('myscheme:index.html').then(
    stream =>
    stream.on('data', chunk => {
      if (chunk.includes('DOCTYPE')) {
        t.pass();
        t.end();
      }
    })
  );
});

test('can stat', async t => {
  const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'http://www.heise.de/');
  const response = await mapper.stat('myscheme:index.html');
  t.is(response.status, 200);
});
