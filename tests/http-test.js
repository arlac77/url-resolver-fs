import test from 'ava';
import { HTTPScheme } from '../src/http-scheme';
import { Context } from '../src/context';
import { URL, parse } from 'url';

const http = require('http');

const PORT = 8888;

test.before(t => {
  http
    .createServer((request, response) => {
      const [host, port] = request.headers.host.split(/:/);
      const { pathname } = parse(request.url);

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

test('http has name', t => {
  const scheme = new HTTPScheme();
  t.is(scheme.name, 'http');
});

test('http is secure', t => {
  const scheme = new HTTPScheme();
  t.is(scheme.isSecure, false);
});

test('http default port', t => {
  const scheme = new HTTPScheme();
  t.is(scheme.defaultPort, 80);
});

test.cb('http can get', t => {
  const context = new Context();
  const scheme = new HTTPScheme();

  t.plan(1);

  scheme.get(context, new URL('http://www.heise.de/index.html')).then(stream =>
    stream.on('data', chunk => {
      if (chunk.includes('DOCTYPE')) {
        t.pass();
        t.end();
      }
    })
  );
});

test.cb('http can get with proxy', t => {
  const context = new Context();
  const scheme = new HTTPScheme({
    proxy: `http://localhost:${PORT}`
  });

  t.plan(1);

  scheme.get(context, new URL('http://www.google.de/')).then(stream =>
    stream.on('data', chunk => {
      if (chunk.includes('google')) {
        t.pass();
        t.end();
      }
    })
  );
});

test('http can stat', async t => {
  const context = new Context();
  const scheme = new HTTPScheme();
  const response = await scheme.stat(
    context,
    new URL('http://www.heise.de/index.html')
  );
  t.is(response.status, 200);
});

test('http basic auth', t => {
  const scheme = new HTTPScheme({
    credentials: {
      password: 'xxx',
      user: 'yyy'
    }
  });
  t.is(scheme.httpOptions.headers.authorization, 'Basic eXl5Onh4eA==');
});
