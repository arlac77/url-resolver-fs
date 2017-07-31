import test from 'ava';
import Resolver from '../src/resolver';
import Context from '../src/context';

const { URL } = require('url');

test('context from resolver', t => {
  const resolver = new Resolver();

  const context = resolver.createContext(new URL('http://www.heise.de'));

  t.is(
    context.resolve('index.html').href,
    new URL('http://www.heise.de/index.html').href
  );
});
