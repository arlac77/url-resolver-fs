import test from 'ava';
import { HTTPScheme } from '../src/http-scheme';
import { Context } from '../src/context';
import { URL, parse } from 'url';
import { createServer, request } from 'http';

const PORT = 8888;

test.before(t => {
  createServer((req, response) => {
    const [host, port] = req.headers.host.split(/:/);
    const { pathname } = parse(req.url);

    const r = {
      host,
      port,
      path: pathname,
      method: req.method,
      headers: req.headers
    };

    const proxyRequest = request(r, proxyResponse => {
      response.writeHead(proxyResponse.statusCode, proxyResponse.headers);
      proxyResponse.pipe(response);
    });
    req.pipe(proxyRequest);
  }).listen(PORT);
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

test('http toJSON', t => {
  const scheme = new HTTPScheme();
  t.deepEqual(scheme.toJSON(), { name: 'http', secure: false, options: {} });
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

test('http addAuthorizationHeader', t => {
  const scheme = new HTTPScheme({});
  const headers = {};

  t.is(
    scheme.addAuthorizationHeader(headers, {
      password: 'xxx',
      user: 'yyy'
    }),
    true
  );
  t.is(headers.authorization, 'Basic eXl5Onh4eA==');
});
