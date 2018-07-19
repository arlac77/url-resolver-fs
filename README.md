[![npm](https://img.shields.io/npm/v/url-resolver-fs.svg)](https://www.npmjs.com/package/url-resolver-fs)
[![Greenkeeper](https://badges.greenkeeper.io/arlac77/url-resolver-fs.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/arlac77/url-resolver-fs)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://secure.travis-ci.org/arlac77/url-resolver-fs.png)](http://travis-ci.org/arlac77/url-resolver-fs)
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

## url-resolver-fs

resolves urls and provides fs like access

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Resolver](#resolver)
    -   [Parameters](#parameters)
    -   [Properties](#properties)
    -   [registerScheme](#registerscheme)
        -   [Parameters](#parameters-1)
    -   [schemeForURL](#schemeforurl)
        -   [Parameters](#parameters-2)
    -   [resolve](#resolve)
        -   [Parameters](#parameters-3)
    -   [createContext](#createcontext)
        -   [Parameters](#parameters-4)
    -   [provideCredentials](#providecredentials)
        -   [Parameters](#parameters-5)
-   [Context](#context)
    -   [Parameters](#parameters-6)
    -   [Properties](#properties-1)
    -   [base](#base)
    -   [resolve](#resolve-1)
        -   [Parameters](#parameters-7)
    -   [provideCredentials](#providecredentials-1)
        -   [Parameters](#parameters-8)
-   [HTTPScheme](#httpscheme)
    -   [Parameters](#parameters-9)
    -   [Properties](#properties-2)
    -   [fetch](#fetch)
        -   [Parameters](#parameters-10)
    -   [get](#get)
        -   [Parameters](#parameters-11)
    -   [put](#put)
        -   [Parameters](#parameters-12)
    -   [stat](#stat)
        -   [Parameters](#parameters-13)
    -   [addAuthorizationHeader](#addauthorizationheader)
        -   [Parameters](#parameters-14)
    -   [name](#name)
    -   [defaultPort](#defaultport)
    -   [optionsFromEnvironment](#optionsfromenvironment)
        -   [Parameters](#parameters-15)
-   [parseAuthenticate](#parseauthenticate)
    -   [Parameters](#parameters-16)
-   [HTTPSScheme](#httpsscheme)
    -   [name](#name-1)
    -   [defaultPort](#defaultport-1)
    -   [isSecure](#issecure)
-   [URLScheme](#urlscheme)
    -   [Parameters](#parameters-17)
    -   [Properties](#properties-3)
    -   [name](#name-2)
    -   [defaultPort](#defaultport-2)
    -   [isSecure](#issecure-1)
    -   [list](#list)
        -   [Parameters](#parameters-18)
    -   [get](#get-1)
        -   [Parameters](#parameters-19)
    -   [stat](#stat-1)
        -   [Parameters](#parameters-20)
    -   [put](#put-1)
        -   [Parameters](#parameters-21)
    -   [delete](#delete)
        -   [Parameters](#parameters-22)
    -   [history](#history)
        -   [Parameters](#parameters-23)
    -   [provideCredentials](#providecredentials-2)
        -   [Parameters](#parameters-24)
    -   [methods](#methods)
    -   [isSecure](#issecure-2)
    -   [defaultPort](#defaultport-3)
    -   [defaultOptions](#defaultoptions)
    -   [optionsFromEnvironment](#optionsfromenvironment-1)
        -   [Parameters](#parameters-25)
    -   [options](#options)
        -   [Parameters](#parameters-26)
-   [URLMapperScheme](#urlmapperscheme)
    -   [Parameters](#parameters-27)
    -   [Properties](#properties-4)
    -   [remap](#remap)
        -   [Parameters](#parameters-28)

## Resolver

**Extends URLScheme**

Holds a map of url-schemes and dispatches requests

### Parameters

-   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
-   `predefinedConstructors` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[URLScheme](#urlscheme)>** schemes to start with (optional, default `[]`)
-   `env` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** environment variables as present in process.env (optional, default `{}`)

### Properties

-   `schemes` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [URLScheme](#urlscheme)>** 
-   `authProviders` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** 

### registerScheme

Register a scheme for later lookup

#### Parameters

-   `scheme` **[URLScheme](#urlscheme)** 

### schemeForURL

Get URLScheme for a given url

#### Parameters

-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 

Returns **[URLScheme](#urlscheme)** for a given url or undefined if nothing found

### resolve

Resolve for a given url.
Passes url to the registered scheme for remapping

#### Parameters

-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** to be resolved

Returns **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** resolved url or original URL if no remapping found

### createContext

Create a new context

#### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** context

Returns **[Context](#context)** newly created context

### provideCredentials

Called when authorization is required.
Forwards the request to the registered auth providers

#### Parameters

-   `realm` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** requested realm

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** credentials as given by one of the registered auth providers

## Context

Holds context information

### Parameters

-   `resolver` **[Resolver](#resolver)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

### Properties

-   `resolver` **[Resolver](#resolver)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
-   `base` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** the current base URL

### base

Type: [URL](https://developer.mozilla.org/docs/Web/API/URL/URL)

### resolve

#### Parameters

-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 

Returns **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 

### provideCredentials

Called when authorization is required for a given realm
asks options.provideCredentials() and resolver.provideCredentials()

#### Parameters

-   `realm` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** requested (decoded) realm

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** credentials for the given realm

## HTTPScheme

**Extends URLScheme**

URLScheme for http requests

### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.proxy` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

### Properties

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### fetch

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** fetch result

### get

Execute a GET request

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** source
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** body of the response

### put

Execute a PUT request

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** destination
-   `stream` **[Stream](https://nodejs.org/api/stream.html)** content to be put to the url
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### stat

Execute a HEAD request

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 
    -   `options.method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** response object

### addAuthorizationHeader

inserts the authorization data into the reguest header

#### Parameters

-   `headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** http credentials will be inserted into
-   `credentials` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if auth info has been written into headers

### name

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 'http'

### defaultPort

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 80 the http default port

### optionsFromEnvironment

Extract options suitable for the constructor
form the given set of environment variables

#### Parameters

-   `env` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** undefined if no suitable environment variables have been found

## parseAuthenticate

-   **See: rfc7235**

Parse WWW-Authenticate header and provide parts as object.
provides a two level structure 1st. the algorithm and then
the algorithm attributes

### Parameters

-   `source` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** http header 'WWW-Authenticate'
-   `result` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** where to put result into (optional, default `{}`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** same as result

## HTTPSScheme

**Extends HTTPScheme**

URLScheme for https requests

### name

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 'https'

### defaultPort

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 443 the https default port

### isSecure

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true

## URLScheme

### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** raw config

### Properties

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** raw config

### name

Should be overwritten to reflect the scheme name

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** scheme name (defaults to the class name)

### defaultPort

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** default from static defaultPort

### isSecure

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** default from static isSecure

### list

List collection (directory)

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to iterable entries

### get

Get content of a url

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to the content

### stat

Delivers meta information for a given url

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to one entry

### put

Put the content of a stream to a given url

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 
-   `stream` **[Stream](https://nodejs.org/api/stream.html)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves if stream has ben put to the url

### delete

Deletes object at a given url

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to the history of the object at the given url

### history

Deliver history information for a given url

#### Parameters

-   `context` **[Context](#context)** execution context
-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** 
-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to the history of the object at the given url

### provideCredentials

Called when authorization is required for a given realm
Tries provideCredentials() on the options object first and
then calls provideCredentials() on the context.

#### Parameters

-   `context` **[Context](#context)** execution context
-   `realm` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** requested (decoded) realm

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** holding the credentials

### methods

supported methods

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 'get', 'stat', 'put', 'delete', 'list', 'history'

### isSecure

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** false

### defaultPort

Returns **mumber** undefined by default

### defaultOptions

Default configuration options

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

### optionsFromEnvironment

Extract options suitable for the constructor
form the given set of environment variables

#### Parameters

-   `env` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** 

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** undefined if no suitable environment variables have been found

### options

Pepare configuration by mixing together defaultOptions with actual options

#### Parameters

-   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** raw config

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** combined options

## URLMapperScheme

**Extends URLScheme**

Remap url
special:some/path  -> <https://myserver.com/repo/some/path>
name: special
baseScheme: https
prefix: <https://myserver.com/repo/>

### Parameters

-   `baseScheme` **[URLScheme](#urlscheme)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the newly created scheme
-   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** urls will be prefixed by this value
-   `options`  

### Properties

-   `baseScheme` **[URLScheme](#urlscheme)** 
-   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the newly created scheme
-   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** urls will be prefixed by this value

### remap

Remapps url by separating scheme (and direct following '/') from suffix
and appending the suffix (in front)

#### Parameters

-   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** to be remapped

Returns **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** remapped url

# install

With [npm](http://npmjs.org) do:

```shell
npm install url-resolver-fs
```

# license

BSD-2-Clause
