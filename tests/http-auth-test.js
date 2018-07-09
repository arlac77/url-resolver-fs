import test from 'ava';
import { HTTPScheme } from '../src/http-scheme';
import { Context } from '../src/context';
import { URL } from 'url';
import { createServer } from 'http';

const PORT = 5643;

test.skip('http can stat with auth', async t => {
  const context = new Context();
  const scheme = new HTTPScheme();
  const response = await scheme.stat(
    context,
    new URL(`http://localhost:${PORT}`)
  );
  t.is(response.status, 200);
});

test.before(t => {
  const server = createServer((req, res) => {
    const auth = req.headers['authorization']; // auth is in base64(username:password)  so we need to decode the base64
    console.log('Authorization Header is: ', auth);

    if (auth) {
      const tmp = auth.split(' ');
      const buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
      const plain_auth = buf.toString(); // read it back out as a string

      console.log('Decoded Authorization ', plain_auth);

      // At this point plain_auth = "username:password"

      const [username, password] = plain_auth.split(':');

      if (username == 'hack' && password == 'thegibson') {
        res.statusCode = 200; // OK
        res.end(
          '<html><body>Congratulations you just hax0rd teh Gibson!</body></html>'
        );
      } else {
        res.statusCode = 401; // Force them to retry authentication
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.end('<html><body>You shall not pass</body></html>');
      }
    } else {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
      res.end('<html><body>Need some creds son</body></html>');
    }
  });

  server.listen(PORT, () =>
    console.log(`Server Listening on http://localhost:${PORT}/`)
  );
});
