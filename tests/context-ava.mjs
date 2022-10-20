import test from "ava";
import { Resolver } from "../src/resolver";
import { Context } from "../src/context";
import { HTTPScheme } from "../src/http-scheme";

test("context from resolver", t => {
  const resolver = new Resolver();

  const context = resolver.createContext({
    base: new URL("http://www.heise.de")
  });

  t.is(
    context.resolve("index.html").href,
    new URL("http://www.heise.de/index.html").href
  );
});

test.cb("context can get relative", t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  const context = resolver.createContext({
    base: new URL("http://www.heise.de")
  });

  t.plan(1);

  context.get("index.html").then(stream =>
    stream.on("data", chunk => {
      if (chunk.includes("DOCTYPE")) {
        t.pass();
        t.end();
      }
    })
  );
});

test("context can stat relative", async t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  const context = resolver.createContext({
    base: new URL("http://www.heise.de")
  });
  const response = await context.stat("index.html");

  t.is(response.status, 200);
});

test("context can list", async t => {
  const resolver = new Resolver();
  const http = new HTTPScheme();
  resolver.registerScheme(http);

  const context = resolver.createContext({
    base: new URL("http://www.heise.de")
  });

  const all = new Set();

  for await (const entries of context.list("index.html")) {
    all.add(entry.name);
  }

  t.is(all.size, 0);
});
