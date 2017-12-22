[![npm](https://img.shields.io/npm/v/url-resolver-fs.svg)](https://www.npmjs.com/package/url-resolver-fs)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/url-resolver-fs.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/url-resolver-fs)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://secure.travis-ci.org/arlac77/url-resolver-fs.png)](http://travis-ci.org/arlac77/url-resolver-fs)
[![bithound](https://www.bithound.io/github/arlac77/url-resolver-fs/badges/score.svg)](https://www.bithound.io/github/arlac77/url-resolver-fs)
[![codecov.io](http://codecov.io/github/arlac77/url-resolver-fs/coverage.svg?branch=master)](http://codecov.io/github/arlac77/url-resolver-fs?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/url-resolver-fs/badge.svg)](https://coveralls.io/r/arlac77/url-resolver-fs)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/url-resolver-fs/badge.svg)](https://snyk.io/test/github/arlac77/url-resolver-fs)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/url-resolver-fs.svg?style=flat-square)](https://github.com/arlac77/url-resolver-fs/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/url-resolver-fs.svg?label=ready&title=Ready)](http://waffle.io/arlac77/url-resolver-fs)
[![Dependency Status](https://david-dm.org/arlac77/url-resolver-fs.svg)](https://david-dm.org/arlac77/url-resolver-fs)
[![devDependency Status](https://david-dm.org/arlac77/url-resolver-fs/dev-status.svg)](https://david-dm.org/arlac77/url-resolver-fs#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/url-resolver-fs.svg?branch=master)](http://inch-ci.org/github/arlac77/url-resolver-fs)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![downloads](http://img.shields.io/npm/dm/url-resolver-fs.svg?style=flat-square)](https://npmjs.org/package/url-resolver-fs)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

url-resolver-fs
-------------------
resolves urls and provides fs like access

# API Reference

* <a name="Context"></a>

## Context()
Holds context information

**Kind**: global function  

* <a name="get"></a>

## get() ⇒ <code>string</code>
Should be overwritten to reflect the scheme name

**Kind**: global function  
**Returns**: <code>string</code> - scheme name (defaults to the class name)  

* <a name="get"></a>

## get() ⇒ <code>Array.&lt;string&gt;</code>
supported methods

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> - 'get', 'stat', 'put', 'delete', 'list', 'history'  

* <a name="<anonymous>..Resolver"></a>

## &lt;anonymous&gt;~Resolver(config, predefined)
**Kind**: inner method of <code>&lt;anonymous&gt;</code>  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> |  |
| predefined | <code>Array.&lt;URLScheme&gt;</code> | schemes to start with |


* <a name="<anonymous>..URLMapperScheme"></a>

## &lt;anonymous&gt;~URLMapperScheme(baseScheme, name, prefix)
**Kind**: inner method of <code>&lt;anonymous&gt;</code>  

| Param | Type | Description |
| --- | --- | --- |
| baseScheme | <code>URLScheme</code> |  |
| name | <code>string</code> | of the newly created scheme |
| prefix | <code>string</code> | urls will be prefixed by this value |


* * *

# install

With [npm](http://npmjs.org) do:

```shell
npm install url-resolver-fs
```

license
=======

BSD-2-Clause
