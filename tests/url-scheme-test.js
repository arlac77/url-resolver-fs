import test from "ava";
import { URLScheme } from "../src/url-scheme";
import { Context } from "../src/context";

test("provideCredentials from options", async t => {
  const scheme = new URLScheme({
    provideCredentials: async realm => {
      return { user: "fromContext", realm: realm.Basic.realm };
    }
  });

  t.deepEqual(
    await scheme.provideCredentials(undefined, { Basic: { realm: "XXX" } }),
    {
      user: "fromContext",
      realm: "XXX"
    }
  );
});

test("provideCredentials from context options", async t => {
  const context = new Context(undefined, {
    provideCredentials: async realm => {
      return { user: "fromContext", realm: realm.Basic.realm };
    }
  });

  const scheme = new URLScheme();

  t.deepEqual(
    await scheme.provideCredentials(context, { Basic: { realm: "XXX" } }),
    {
      user: "fromContext",
      realm: "XXX"
    }
  );
});

test("json", t => {
  const scheme = new URLScheme({ a: 1 });
  t.deepEqual(JSON.parse(JSON.stringify(scheme)), {
    name: "URLScheme",
    secure: false,
    options: { a: 1 }
  });
});
