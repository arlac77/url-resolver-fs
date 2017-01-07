[![npm](https://img.shields.io/npm/v/url-resolver-fs.svg)](https://www.npmjs.com/package/url-resolver-fs)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/url-resolver-fs)
[![Build Status](https://secure.travis-ci.org/arlac77/url-resolver-fs.png)](http://travis-ci.org/arlac77/url-resolver-fs)
[![bithound](https://www.bithound.io/github/arlac77/url-resolver-fs/badges/score.svg)](https://www.bithound.io/github/arlac77/url-resolver-fs)
[![codecov.io](http://codecov.io/github/arlac77/url-resolver-fs/coverage.svg?branch=master)](http://codecov.io/github/arlac77/url-resolver-fs?branch=master)
[![Coverage Status](https://coveralls.io/repos/arlac77/url-resolver-fs/badge.svg)](https://coveralls.io/r/arlac77/url-resolver-fs)
[![Code Climate](https://codeclimate.com/github/arlac77/url-resolver-fs/badges/gpa.svg)](https://codeclimate.com/github/arlac77/url-resolver-fs)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/url-resolver-fs/badge.svg)](https://snyk.io/test/github/arlac77/url-resolver-fs)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/url-resolver-fs.svg?style=flat-square)](https://github.com/arlac77/url-resolver-fs/issues)
[![Stories in Ready](https://badge.waffle.io/arlac77/url-resolver-fs.svg?label=ready&title=Ready)](http://waffle.io/arlac77/url-resolver-fs)
[![Dependency Status](https://david-dm.org/arlac77/url-resolver-fs.svg)](https://david-dm.org/arlac77/url-resolver-fs)
[![devDependency Status](https://david-dm.org/arlac77/url-resolver-fs/dev-status.svg)](https://david-dm.org/arlac77/url-resolver-fs#info=devDependencies)
[![docs](http://inch-ci.org/github/arlac77/url-resolver-fs.svg?branch=master)](http://inch-ci.org/github/arlac77/url-resolver-fs)
[![downloads](http://img.shields.io/npm/dm/url-resolver-fs.svg?style=flat-square)](https://npmjs.org/package/url-resolver-fs)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

url-resolver-fs
-------------------
resolves urls and provides fs like access

# API Reference

* <a name="get"></a>

## get(url, [options]) ⇒ <code>Promise</code>
Creates a readable stream for the content of th file associated to a given file URL

**Kind**: global function  
**Fulfil**: <code>ReadableStream</code> - of the file content  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |
| [options] | <code>object</code> &#124; <code>string</code> | passed as options to fs.createReadStream() |


* <a name="stat"></a>

## stat(url, [options]) ⇒ <code>Promise</code>
Read stat of a file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>object</code> - as delivered by fs.stat()  
**Reject**: <code>Error</code> - if url is not a file url or fs.stat() error  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |
| [options] | <code>object</code> | unused for now |


* <a name="put"></a>

## put(url, stream, [options]) ⇒ <code>Promise</code>
Put content of a stream to a file associacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>undefined</code> - undefined  
**Reject**: <code>Error</code> - if url is not a file url  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |
| stream | <code>Stream</code> | data source |
| [options] | <code>object</code> &#124; <code>string</code> | passed as options to fs.createWriteStream() |


* <a name="delete"></a>

## delete(url) ⇒ <code>Promise</code>
Deletes the file assiciacted to a given file URL

**Kind**: global function  
**Fulfil**: <code>undefined</code> - undefined  
**Reject**: <code>Error</code> - as delivered by fs.unlink()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a file |


* <a name="list"></a>

## list(url, [options]) ⇒ <code>Promise</code>
List content of a directory

**Kind**: global function  
**Fulfil**: <code>string[]</code> - file names  
**Reject**: <code>Error</code> - as delivered by fs.readdir()  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | of the a directory |
| [options] | <code>object</code> | unused for now |


* <a name="fetch"></a>

## fetch(url, [options]) ⇒ <code>object</code>
**Kind**: global function  
**Returns**: <code>object</code> - fetch result  

| Param | Type | Default |
| --- | --- | --- |
| url | <code>string</code> |  | 
| [options] | <code>object</code> | <code>{}</code> | 


* <a name="get"></a>

## get(url, [options]) ⇒ <code>object</code>
Execute a GET request

**Kind**: global function  
**Returns**: <code>object</code> - body of the response  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [options] | <code>object</code> | 


* <a name="put"></a>

## put(url, stream, [options])
Execute a PUT request

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> |  |
| stream | <code>Stream</code> | content to be put to the url |
| [options] | <code>object</code> |  |


* <a name="stat"></a>

## stat(url, [options]) ⇒ <code>object</code>
Execute a HEAD request

**Kind**: global function  
**Returns**: <code>object</code> - response object  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 
| [options] | <code>object</code> | 


* <a name="registerScheme"></a>

## registerScheme(scheme)
register a scheme for later lookup

**Kind**: global function  

| Param | Type |
| --- | --- |
| scheme | <code>URLScheme</code> | 


* <a name="schemeForURL"></a>

## schemeForURL(url) ⇒ <code>URLScheme</code>
get URLScheme for a given url

**Kind**: global function  
**Returns**: <code>URLScheme</code> - for a given url  

| Param | Type |
| --- | --- |
| url | <code>string</code> | 


* <a name="get"></a>

## get()
use semeForURl and forward request to the returend scheme

**Kind**: global function  

* <a name="stat"></a>

## stat()
use semeForURl and forward request to the returend scheme

**Kind**: global function  

* <a name="put"></a>

## put()
use semeForURl and forward request to the returend scheme

**Kind**: global function  

* <a name="delete"></a>

## delete()
use semeForURl and forward request to the returend scheme

**Kind**: global function  

* <a name="list"></a>

## list()
use semeForURl and forward request to the returend scheme

**Kind**: global function  

* <a name="history"></a>

## history()
use semeForURl and forward request to the returend scheme

**Kind**: global function  

* <a name="list"></a>

## list()
Forward the request to the base schem after remapping the url

**Kind**: global function  

* <a name="get"></a>

## get()
Forward the request to the base schem after remapping the url

**Kind**: global function  

* <a name="put"></a>

## put()
Forward the request to the base schem after remapping the url

**Kind**: global function  

* <a name="delete"></a>

## delete()
Forward the request to the base schem after remapping the url

**Kind**: global function  

* <a name="stat"></a>

## stat()
Forward the request to the base schem after remapping the url

**Kind**: global function  

* <a name="history"></a>

## history()
Forward the request to the base schem after remapping the url

**Kind**: global function  

* <a name="remap"></a>

## remap(url) ⇒ <code>string</code>
Remapps url by separating sheme (and direct following '/') from suffix
and appending adding the suffix (in front)

**Kind**: global function  
**Returns**: <code>string</code> - remapped url  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | to be remapped |


* * *

# install

With [npm](http://npmjs.org) do:

```shell
npm install url-resolver-fs
```

license
=======

BSD-2-Clause
