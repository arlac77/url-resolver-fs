import test from "ava";
import { URLMapperScheme } from "../src/url-mapper-scheme";
import { HTTPScheme } from "../src/http-scheme";
import { Context } from "../src/context";

test("prefix only simple map", t => {
  const mapper = new URLMapperScheme(
    new HTTPScheme(),
    "myscheme",
    new URL("http://www.heise.de/")
  );
  t.is(
    mapper.remap(new URL("myscheme:some/path")).href,
    new URL("http://www.heise.de/some/path").href
  );
});

test("prefix only simple map JSON", t => {
  const mapper = new URLMapperScheme(
    new HTTPScheme(),
    "myscheme",
    new URL("http://www.heise.de/")
  );
  t.deepEqual(mapper.toJSON(), {
    name: "myscheme",
    baseScheme: "http",
    prefix: "http://www.heise.de/"
  });
});

test.cb("can get", t => {
  const context = new Context();
  const mapper = new URLMapperScheme(
    new HTTPScheme(),
    "myscheme",
    new URL("http://www.heise.de/")
  );

  t.plan(1);

  mapper.get(context, new URL("myscheme:index.html")).then(stream =>
    stream.on("data", chunk => {
      if (chunk.includes("DOCTYPE")) {
        t.pass();
        t.end();
      }
    })
  );
});

test("can stat", async t => {
  const context = new Context();
  const mapper = new URLMapperScheme(
    new HTTPScheme(),
    "myscheme",
    new URL("http://www.heise.de/")
  );
  const response = await mapper.stat(context, new URL("myscheme:index.html"));
  t.is(response.status, 200);
});
