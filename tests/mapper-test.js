import test from 'ava';
import URLMapperScheme from '../src/URLMapperScheme';
import HTTPScheme from '../src/HTTPScheme';

test('prefix only simple map', t => {
  const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'http://www.heise.de/');
  t.is(mapper.remap('myscheme:some/path'), 'http://www.heise.de/some/path');
});

test.cb('can get', async t => {
  const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'http://www.heise.de/');

  t.plan(1);

  const stream = await mapper.get('myscheme:index.html');

  stream.on('data', chunk => {
    if (chunk.includes('DOCTYPE')) {
      t.pass();
      t.end();
    }
  });

  //t.is(mapper.remap('myscheme:some/path'), 'http://www.heise.de/some/path');
});

test('can stat', async t => {
  const mapper = new URLMapperScheme(new HTTPScheme(), 'myscheme', 'http://www.heise.de/');

  const response = await mapper.stat('myscheme:index.html');
  t.is(response.status, 200);
});
