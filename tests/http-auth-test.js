import test from 'ava';
import { HTTPScheme } from '../src/http-scheme';
import { Context } from '../src/context';
import { URL } from 'url';
import { createServer } from 'http';

const PORT = 5643;
const USER = 'hugo';
const PASSWORD = 'secret';
const CREDENTIALS = { user: USER, password: PASSWORD };

test('http can stat with auth', async t => {
  const context = new Context(undefined, {
    provideCredentials: async () => CREDENTIALS
  });
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

    if (auth) {
      const tmp = auth.split(' ');
      const [username, password] = Buffer.from(tmp[1], 'base64')
        .toString()
        .split(':');

      if (username === USER && password === PASSWORD) {
        res.statusCode = 200;
        res.end('<html><body>Congratulations</body></html>');
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

  server.listen(PORT);
});
