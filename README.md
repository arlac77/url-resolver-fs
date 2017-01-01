[![npm](https://img.shields.io/npm/v/url-resolver.svg)](https://www.npmjs.com/package/url-resolver)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/url-resolver)
[![Build Status](https://secure.travis-ci.org/arlac77/url-resolver.png)](http://travis-ci.org/arlac77/url-resolver)
[![bithound](https://www.bithound.io/github/arlac77/url-resolver/badges/score.svg)](https://www.bithound.io/github/arlac77/url-resolver)
[![codecov.io](http://codecov.io/github/arlac77/url-resolver/coverage.svg?branch=master)](http://codecov.io/github/arlac77/url-resolver?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/url-resolver/badge.svg)](https://coveralls.io/r/arlac77/url-resolver)
[![Code Climate](https://codeclimate.com/github/arlac77/url-resolver/badges/gpa.svg)](https://codeclimate.com/github/arlac77/url-resolver)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/url-resolver/badge.svg)](https://snyk.io/test/github/arlac77/url-resolver)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/url-resolver.svg?style=flat-square)](https://github.com/arlac77/url-resolver/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/url-resolver.svg?label=ready&title=Ready)](http://waffle.io/arlac77/url-resolver)
[![Dependency Status](https://david-dm.org/arlac77/url-resolver.svg)](https://david-dm.org/arlac77/url-resolver)
[![devDependency Status](https://david-dm.org/arlac77/url-resolver/dev-status.svg)](https://david-dm.org/arlac77/url-resolver#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/url-resolver.svg?branch=master)](http://inch-ci.org/github/arlac77/url-resolver)
[![downloads](http://img.shields.io/npm/dm/url-resolver.svg?style=flat-square)](https://npmjs.org/package/url-resolver)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

url-resolver
-------------------
resolves urls and provides fs like access

# API Reference

* <a name="get"></a>

## get(url) ⇒ <code>Promise</code>
Creates a readable stream for the content of th file associated to a given file URL

**Kind**: global function  
**Fulfil**: <code>ReadableStream</code> - of the file content  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="stat"></a>

## stat(url) ⇒ <code>Promise</code>
Read stat of a file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>Object</code> - as delivered by fs.stat()  
**Reject**: <code>Error</code> - if url is not a file url or fs.stat() error  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="put"></a>

## put(url) ⇒ <code>Promise</code>
Put content of a stream to a file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>Void</code> - undefined  
**Reject**: <code>Error</code> - if url is not a file url  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="delete"></a>

## delete(url) ⇒ <code>Promise</code>
Deletes the file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>Void</code> - undefined  
**Reject**: <code>Error</code> - as delivered by fs.unlink()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a file |


* <a name="list"></a>

## list(url) ⇒ <code>Promise</code>
List content of a directory

**Kind**: global function  
**Fulfil**: <code>String[]</code> - file names  
**Reject**: <code>Error</code> - as delivered by fs.readdir()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | of the a directory |


* <a name="schemeForURL"></a>

## schemeForURL(url) ⇒ <code>URLScheme</code>
get URLScheme for a given url

**Kind**: global function  
**Returns**: <code>URLScheme</code> - for a given url  

| Param | Type |
| --- | --- |
| url | <code>String</code> | 


* <a name="remap"></a>

## remap(url) ⇒ <code>String</code>
Remapps url by separating sheme from suffix
and appending adding the suffix (in front)

**Kind**: global function  
**Returns**: <code>String</code> - remapped url  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | to be remapped |


* * *

# install

With [npm](http://npmjs.org) do:

```shell
npm install url-resolver
```

license
=======

BSD-2-Clause
