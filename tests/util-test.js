import test from 'ava';
import { parseAuthenticate } from '../src/util';

test('parseAuthenticate', t => {
  const auth = parseAuthenticate(`Basic realm="Secure Area"`);

  t.deepEqual(auth, {
    'Basic realm': 'Secure Area'
  });
});

test('parseAuthenticate integer', t => {
  const auth = parseAuthenticate(`type=1`);

  t.deepEqual(auth, {
    type: 1
  });
});

test.skip('parseAuthenticate complex', t => {
  const auth = parseAuthenticate(
    `Newauth realm="apps", type=1, title="Login to \"apps\"", Basic realm="simple"`
  );

  t.deepEqual(auth, {
    'Newauth realm': 'apps',
    type: 1,
    title: 'Login to "apps"',
    'Basic realm': 'simple'
  });
});
