/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  path = require('path'),
  file = require('../src/file-scheme');


describe('file', () => {
  const f = new file.FileScheme();

  it('can fetch', () => {
    const aFile = path.join(__dirname, 'file_test.js');
    f.fetch('file://' + aFile).then(s => {
      //s.pipe(process.stdout);
      assert.isDefined(s);
    });
  });
});
