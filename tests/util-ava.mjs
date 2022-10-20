import test from 'ava';
import { parseAuthenticate } from '../src/util';

test('parseAuthenticate Basic', t => {
  const auth = parseAuthenticate('Basic realm="Secure Area"');

  t.deepEqual(auth, {
    Basic: {
      realm: 'Secure Area'
    }
  });
});

test('parseAuthenticate Basic with predefined result', t => {
  const auth = parseAuthenticate('Basic realm="Secure Area"', { url: 'xxx' });

  t.deepEqual(auth, {
    url: 'xxx',
    Basic: {
      realm: 'Secure Area'
    }
  });
});

test('parseAuthenticate Digest', t => {
  const auth = parseAuthenticate(
    `Digest realm="testrealm@host.com" qop="auth,auth-int" nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093" opaque="5ccc069c403ebaf9f0171e9517f40e41"`
  );

  t.deepEqual(auth, {
    Digest: {
      realm: 'testrealm@host.com',
      qop: 'auth,auth-int',
      nonce: 'dcd98b7102dd2f0e8b11d0f600bfb0c093',
      opaque: '5ccc069c403ebaf9f0171e9517f40e41'
    }
  });
});

test.skip('parseAuthenticate several algorithms', t => {
  const auth = parseAuthenticate(
    `Newauth realm="apps", type=1, title="Login to apps", Basic realm="simple"`
  );

  t.deepEqual(auth, {
    Newauth: {
      realm: 'apps',
      type: '1'
    },
    Basic: {
      title: 'Login to apps',
      realm: 'simple'
    }
  });
});

test.skip('parseAuthenticate quoted value with escapes', t => {
  const auth = parseAuthenticate(`Basic realm="simple \"apps\""`);

  t.deepEqual(auth, {
    Basic: {
      realm: 'simple "apps"'
    }
  });
});

test.skip('parseAuthenticate Digest none relam attribute first', t => {
  const auth = parseAuthenticate(`Digest username="Mufasa"
        realm="testrealm@host.com"
        nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093"
        uri="/dir/index.html"
        qop=auth
        nc=00000001
        cnonce="0a4f113b"
        response="6629fae49393a05397450978507c4ef1"
        opaque="5ccc069c403ebaf9f0171e9517f40e41"`);

  t.deepEqual(auth, {
    Digest: {
      realm: 'testrealm@host.com',
      nonce: 'dcd98b7102dd2f0e8b11d0f600bfb0c093',
      uri: '/dir/index.html',
      qop: 'auth',
      nc: '00000001',
      cnonce: '0a4f113b',
      response: '6629fae49393a05397450978507c4ef1',
      opaque: '5ccc069c403ebaf9f0171e9517f40e41'
    }
  });
});

test.skip('parseAuthenticate integer', t => {
  const auth = parseAuthenticate(`type=1`);

  t.deepEqual(auth, {
    type: 1
  });
});
