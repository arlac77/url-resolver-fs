import cleanup from "rollup-plugin-cleanup";
import executable from "rollup-plugin-executable";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
  output: {
    file: pkg.main,
    format: "cjs",
    interop: false
  },

  external: [
    "os",
    "fs",
    "tty",
    "events",
    "util",
    "net",
    "tls",
    "https",
    "btoa",
    "url",
    "node-fetch",
    "http-proxy-agent",
    "https-proxy-agent"
  ],

  plugins: [
    babel({
      runtimeHelpers: false,
      externalHelpers: true,
      babelrc: false,
      plugins: ["@babel/plugin-proposal-async-generator-functions"],
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs()
  ],

  input: pkg.module
};
