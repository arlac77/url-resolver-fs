import test from "ava";
import { Resolver } from "../src/resolver";
import { HTTPScheme } from "../src/http-scheme";
import { HTTPSScheme } from "../src/https-scheme";
import { URLMapperScheme } from "../src/url-mapper-scheme";
import { Context } from "../src/context";

test("register schemes plain", t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  t.is(resolver.schemeForURL(new URL("http://somewhere/")), http);
});

test("register schemes mapper", t => {
  const resolver = new Resolver();
  const heise = new URLMapperScheme(
    new HTTPScheme(),
    "heise",
    new URL("http://www.heise.de/")
  );
  resolver.registerScheme(heise);

  t.is(resolver.schemeForURL(new URL("heise:index.html")), heise);
  t.is(
    resolver.resolve(new URL("heise:index.html")).href,
    new URL("http://www.heise.de/index.html").href
  );
});

test("register schemes from config", t => {
  const resolver = new Resolver(
    {
      schemes: {
        tmp: {
          base: "http",
          options: { proxy: "http://localhost:3128" },
          prefix: "http:///tmp"
        }
      }
    },
    [HTTPScheme, HTTPSScheme],
    { HTTP_PROXY: "http://myproxy.com:3128/" }
  );

  const ts = resolver.schemes.get("tmp");

  t.is(ts.name, "tmp");
  t.is(ts.options.proxy, "http://localhost:3128");

  const http = resolver.schemes.get("http");
  t.is(http.name, "http");
  t.is(http.options.proxy, "http://myproxy.com:3128/");

  const https = resolver.schemes.get("https");
  t.is(https.name, "https");
  t.is(https.options.proxy, "http://myproxy.com:3128/");
});

test("handles unknown", t => {
  const resolver = new Resolver();
  t.is(resolver.schemeForURL(new URL("undefined:index.html")), undefined);
  t.is(
    resolver.resolve(new URL("undefined:index.html").href),
    new URL("undefined:index.html").href
  );
});

test("unknown reject get", async t => {
  const context = new Context();
  const resolver = new Resolver();

  try {
    await resolver.get(context, new URL("something:index.html"));
    t.truthy(false, "should not be reached");
  } catch (e) {
    t.is(e.message, "Unknown scheme something:index.html");
  }
});

test("unknown reject stat", async t => {
  const context = new Context();
  const resolver = new Resolver();
  const error = await t.throwsAsync(() =>
    resolver.stat(context, new URL("something:index.html"))
  );
  t.is(error.message, "Unknown scheme something:index.html");
});

test("unknown reject put", async t => {
  const context = new Context();
  const resolver = new Resolver();
  const error = await t.throwsAsync(() =>
    resolver.put(context, new URL("something:index.html"))
  );
  t.is(error.message, "Unknown scheme something:index.html");
});

test("unknown reject delete", async t => {
  const context = new Context();
  const resolver = new Resolver();
  const error = await t.throwsAsync(() =>
    resolver.delete(context, new URL("something:index.html"))
  );
  t.is(error.message, "Unknown scheme something:index.html");
});

test.skip("unknown reject list", async t => {
  const context = new Context();
  const resolver = new Resolver();
  const error = await t.throwsAsync(async () => {
    let entries = resolver.list(context, new URL("something:index.html"));
    //yield entries;
  });
  t.is(error.message, "Unknown scheme something:index.html");
});

test("unknown reject history", async t => {
  const context = new Context();
  const resolver = new Resolver();
  const error = await t.throwsAsync(() =>
    resolver.history(context, new URL("something:index.html"))
  );
  t.is(error.message, "Unknown scheme something:index.html");
});

test.cb("delegating can get", t => {
  const context = new Context();
  const resolver = new Resolver();
  const heise = new URLMapperScheme(
    new HTTPScheme(),
    "heise",
    new URL("http://www.heise.de/")
  );
  resolver.registerScheme(heise);

  t.plan(1);

  resolver.get(context, new URL("heise:index.html")).then(stream =>
    stream.on("data", chunk => {
      if (chunk.includes("DOCTYPE")) {
        t.pass();
        t.end();
      }
    })
  );
});
