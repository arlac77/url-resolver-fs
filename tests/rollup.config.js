import babel from "rollup-plugin-babel";
import multiEntry from "rollup-plugin-multi-entry";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import istanbul from "rollup-plugin-istanbul";

export default {
  input: "tests/**/*-test.js",
  external: [
    "ava",
    "btoa",
    "http",
    "url",
    "node-fetch",
    "http-proxy-agent",
    "https-proxy-agent"
  ],

  plugins: [
    babel({
      babelrc: false,
      plugins: ["@babel/plugin-proposal-async-generator-functions"],
      exclude: "node_modules/**"
    }),
    multiEntry(),
    resolve(),
    commonjs(),
    istanbul({
      exclude: ["tests/**/*-test.js", "node_modules/**/*"]
    })
  ],

  output: {
    file: "build/bundle-test.js",
    format: "cjs",
    sourcemap: true,
    interop: false
  }
};
