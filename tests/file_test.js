/* global describe, it, xit, before, after */
/* jslint node: true, esnext: true */
'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  path = require('path'),
  FileScheme = require('../dist/index').FileScheme;

describe('file', () => {
  const f = new FileScheme();

  it('can get', () => {
    const aFile = path.join(__dirname, 'file_test.js');
    return f.get('file://' + aFile).then(s => {
      //s.pipe(process.stdout);
      assert.isDefined(s);
    });
  });

  it('can head', () => {
    const aFile = path.join(__dirname, 'file_test.js');
    return f.head('file://' + aFile).then(s => {
      //console.log(s);
      assert.isDefined(s);
    });
  });

  it('can list', () => {
    const aDir = path.join(__dirname);
    return f.list('file://' + aDir).then(files => {
      assert.isAtLeast(files.indexOf('file_test.js'), 0);
      assert.isAtLeast(files.indexOf('simple_test.js'), 0);
    });
  });

  it('list error', () => {
    return f.list('file://unknown').then(files => {
      assert.ok(undefined);
    }).catch(reject => {
      assert.ok(reject);
    });
  });
});
