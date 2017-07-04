import test from 'ava';
import HTTPScheme from '../src/http-scheme';

const url = require('url');
const http = require('http');

const PORT = 8888;

test.before(t => {
  http
    .createServer((request, response) => {
      const [host, port] = request.headers.host.split(/:/);
      const { pathname } = url.parse(request.url);

      const r = {
        host,
        port,
        path: pathname,
        method: request.method,
        headers: request.headers
      };

      const proxyRequest = http.request(r, proxyResponse => {
        response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
        proxyResponse.pipe(response);
      });
      request.pipe(proxyRequest);
    })
    .listen(PORT);
});

test('has name', t => {
  const scheme = new HTTPScheme();
  t.is(scheme.name, 'http');
});

test('is secure', t => {
  const scheme = new HTTPScheme();
  t.is(scheme.isSecure, false);
});

test('default port', t => {
  const scheme = new HTTPScheme();
  t.is(scheme.defaultPort, 80);
});

test.cb('can get', t => {
  const scheme = new HTTPScheme();

  t.plan(1);

  scheme.get('http://www.heise.de/index.html').then(stream =>
    stream.on('data', chunk => {
      if (chunk.includes('DOCTYPE')) {
        t.pass();
        t.end();
      }
    })
  );
});

test.cb('can get with proxy', t => {
  const scheme = new HTTPScheme({
    proxy: `http://localhost:${PORT}`
  });

  t.plan(1);

  scheme.get('http://www.google.de/').then(stream =>
    stream.on('data', chunk => {
      if (chunk.includes('google')) {
        t.pass();
        t.end();
      }
    })
  );
});

test('can stat', async t => {
  const scheme = new HTTPScheme();
  const response = await scheme.stat('http://www.heise.de/index.html');
  t.is(response.status, 200);
});

test('basic auth', t => {
  const scheme = new HTTPScheme({
    credentials: {
      password: 'xxx',
      user: 'yyy'
    }
  });
  t.is(scheme._options.headers.authorization, 'Basic eXl5Onh4eA==');
});
