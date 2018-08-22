import test from "ava";
import { HTTPSScheme } from "../src/https-scheme";
import { Context } from "../src/context";
import { ResponseError } from "../src/util";

test("https has name", t => {
  const scheme = new HTTPSScheme();
  t.is(scheme.name, "https");
});

test("https is secure", t => {
  const scheme = new HTTPSScheme();
  t.is(scheme.isSecure, true);
});

test("https default port", t => {
  const scheme = new HTTPSScheme();
  t.is(scheme.defaultPort, 443);
});

test.cb("https can get", t => {
  const context = new Context();
  const scheme = new HTTPSScheme();

  t.plan(1);

  scheme.get(context, new URL("https://www.heise.de/index.html")).then(stream =>
    stream.on("data", chunk => {
      if (chunk.includes("DOCTYPE")) {
        t.pass();
        t.end();
      }
    })
  );
});

test("https (http 2.0) can stat", async t => {
  const context = new Context();
  const scheme = new HTTPSScheme();
  const response = await scheme.stat(
    context,
    new URL("https://http2.pro/doc/api")
  );
  t.is(response.status, 200);
});

test("https can stat", async t => {
  const context = new Context();
  const scheme = new HTTPSScheme();
  const response = await scheme.stat(
    context,
    new URL("https://www.heise.de/index.html")
  );
  t.is(response.status, 200);
});

test("https required auth failing stat", async t => {
  const context = new Context();
  const scheme = new HTTPSScheme();

  await t.throwsAsync(
    () =>
      scheme.stat(
        context,
        new URL(
          "https://subversion.assembla.com/svn/delivery_notes/data/config.json"
        )
      ),
    ResponseError
  );

  //t.is(error !== undefined, true);
});

/*
  describe('with proxy', () => {
    // https://www.sslproxies.org
    const scheme = new HTTPSScheme({
      proxy: 'http://104.236.241.128:8080/'
        //proxy: 'http://173.212.49.74:8080'
        // INV proxy: 'http://96.80.45.1:80'
        //proxy: 'http://85.28.193.95:8080'
        //proxy: 'http://localhost:8888'
    });
    xit('can get', done => {
      scheme.get('https://www.google.com/').then(s => {
        assert.isDefined(s);

        let isDone = false;

        s.on('data', chunk => {
          if (chunk.includes('Google')) {
            if (!isDone) {
              done();
              isDone = true;
            }
          }
        });
      });
    });
*/
