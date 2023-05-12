[![npm](https://img.shields.io/npm/v/url-resolver-fs.svg)](https://www.npmjs.com/package/url-resolver-fs)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![bundlejs](https://deno.bundlejs.com/?q=url-resolver-fs\&badge=detailed)](https://bundlejs.com/?q=url-resolver-fs)
[![downloads](http://img.shields.io/npm/dm/url-resolver-fs.svg?style=flat-square)](https://npmjs.org/package/url-resolver-fs)
[![GitHub Issues](https://img.shields.io/github/issues/arlac77/url-resolver-fs.svg?style=flat-square)](https://github.com/arlac77/url-resolver-fs/issues)
[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Farlac77%2Furl-resolver-fs%2Fbadge\&style=flat)](https://actions-badge.atrox.dev/arlac77/url-resolver-fs/goto)
[![Styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Known Vulnerabilities](https://snyk.io/test/github/arlac77/url-resolver-fs/badge.svg)](https://snyk.io/test/github/arlac77/url-resolver-fs)
[![Coverage Status](https://coveralls.io/repos/arlac77/url-resolver-fs/badge.svg)](https://coveralls.io/github/arlac77/url-resolver-fs)

## url-resolver-fs

resolves urls and provides fs like access

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [Context](#context)
    *   [Parameters](#parameters)
    *   [Properties](#properties)
    *   [base](#base)
    *   [resolve](#resolve)
        *   [Parameters](#parameters-1)
    *   [provideCredentials](#providecredentials)
        *   [Parameters](#parameters-2)
*   [HTTPScheme](#httpscheme)
    *   [Parameters](#parameters-3)
    *   [Properties](#properties-1)
    *   [fetch](#fetch)
        *   [Parameters](#parameters-4)
    *   [get](#get)
        *   [Parameters](#parameters-5)
    *   [put](#put)
        *   [Parameters](#parameters-6)
    *   [stat](#stat)
        *   [Parameters](#parameters-7)
    *   [addAuthorizationHeader](#addauthorizationheader)
        *   [Parameters](#parameters-8)
    *   [name](#name)
    *   [defaultPort](#defaultport)
    *   [optionsFromEnvironment](#optionsfromenvironment)
        *   [Parameters](#parameters-9)
*   [HTTPSScheme](#httpsscheme)
    *   [name](#name-1)
    *   [defaultPort](#defaultport-1)
    *   [isSecure](#issecure)
*   [Resolver](#resolver)
    *   [Parameters](#parameters-10)
    *   [Properties](#properties-2)
    *   [registerScheme](#registerscheme)
        *   [Parameters](#parameters-11)
    *   [schemeForURL](#schemeforurl)
        *   [Parameters](#parameters-12)
    *   [resolve](#resolve-1)
        *   [Parameters](#parameters-13)
    *   [createContext](#createcontext)
        *   [Parameters](#parameters-14)
    *   [provideCredentials](#providecredentials-1)
        *   [Parameters](#parameters-15)
*   [URLMapperScheme](#urlmapperscheme)
    *   [Parameters](#parameters-16)
    *   [Properties](#properties-3)
    *   [remap](#remap)
        *   [Parameters](#parameters-17)
*   [URLScheme](#urlscheme)
    *   [Parameters](#parameters-18)
    *   [Properties](#properties-4)
    *   [name](#name-2)
    *   [defaultPort](#defaultport-2)
    *   [isSecure](#issecure-1)
    *   [list](#list)
        *   [Parameters](#parameters-19)
    *   [get](#get-1)
        *   [Parameters](#parameters-20)
    *   [stat](#stat-1)
        *   [Parameters](#parameters-21)
    *   [put](#put-1)
        *   [Parameters](#parameters-22)
    *   [delete](#delete)
        *   [Parameters](#parameters-23)
    *   [history](#history)
        *   [Parameters](#parameters-24)
    *   [provideCredentials](#providecredentials-2)
        *   [Parameters](#parameters-25)
    *   [methods](#methods)
    *   [isSecure](#issecure-2)
    *   [defaultPort](#defaultport-3)
    *   [defaultOptions](#defaultoptions)
    *   [optionsFromEnvironment](#optionsfromenvironment-1)
        *   [Parameters](#parameters-26)
    *   [options](#options)
        *   [Parameters](#parameters-27)
*   [parseAuthenticate](#parseauthenticate)
    *   [Parameters](#parameters-28)
*   [ResponseError](#responseerror)

## Context

Holds context information

### Parameters

*   `resolver` **[Resolver](#resolver)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

### Properties

*   `resolver` **[Resolver](#resolver)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;
*   `base` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** the current base URL

### base

Type: [URL](https://developer.mozilla.org/docs/Web/API/URL/URL)

### resolve

#### Parameters

*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;

Returns **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;

### provideCredentials

Called when authorization is required for a given realm
asks options.provideCredentials() and resolver.provideCredentials()

#### Parameters

*   `realm` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** requested (decoded) realm

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** credentials for the given realm

## HTTPScheme

**Extends URLScheme**

URLScheme for http requests

### Parameters

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.proxy` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

### Properties

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

### fetch

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** fetch result

### get

Execute a GET request

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** source
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** body of the response

### put

Execute a PUT request

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** destination
*   `stream` **[Stream](https://nodejs.org/api/stream.html)** content to be put to the url
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

### stat

Execute a HEAD request

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

    *   `options.method` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** response object

### addAuthorizationHeader

inserts the authorization data into the reguest header

#### Parameters

*   `headers` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** http credentials will be inserted into
*   `credentials` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true if auth info has been written into headers

### name

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 'http'

### defaultPort

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 80 the http default port

### optionsFromEnvironment

Extract options suitable for the constructor
form the given set of environment variables

#### Parameters

*   `env` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** undefined if no suitable environment variables have been found

## HTTPSScheme

**Extends HTTPScheme**

URLScheme for https requests

### name

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 'https'

### defaultPort

Returns **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 443 the https default port

### isSecure

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true

## Resolver

**Extends URLScheme**

Holds a map of url-schemes and dispatches requests

### Parameters

*   `config` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
*   `predefinedConstructors` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[URLScheme](#urlscheme)>** schemes to start with (optional, default `[]`)
*   `env` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** environment variables as present in process.env (optional, default `{}`)

### Properties

*   `schemes` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [URLScheme](#urlscheme)>**&#x20;
*   `authProviders` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>**&#x20;

### registerScheme

Register a scheme for later lookup

#### Parameters

*   `scheme` **[URLScheme](#urlscheme)**&#x20;

### schemeForURL

Get URLScheme for a given url

#### Parameters

*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;

Returns **[URLScheme](#urlscheme)** for a given url or undefined if nothing found

### resolve

Resolve for a given url.
Passes url to the registered scheme for remapping

#### Parameters

*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** to be resolved

Returns **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** resolved url or original URL if no remapping found

### createContext

Create a new context

#### Parameters

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** context

Returns **[Context](#context)** newly created context

### provideCredentials

Called when authorization is required.
Forwards the request to the registered auth providers

#### Parameters

*   `realm` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** requested realm

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** credentials as given by one of the registered auth providers

## URLMapperScheme

**Extends URLScheme**

Remap url
special:some/path  -> <https://myserver.com/repo/some/path>
name: special
baseScheme: https
prefix: <https://myserver.com/repo/>

### Parameters

*   `baseScheme` **[URLScheme](#urlscheme)**&#x20;
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the newly created scheme
*   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** urls will be prefixed by this value
*   `options` &#x20;

### Properties

*   `baseScheme` **[URLScheme](#urlscheme)**&#x20;
*   `name` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** of the newly created scheme
*   `prefix` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** urls will be prefixed by this value

### remap

Remapps url by separating scheme (and direct following '/') from suffix
and appending the suffix (in front)

#### Parameters

*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** to be remapped

Returns **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)** remapped url

## URLScheme

### Parameters

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** raw config

### Properties

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** raw config

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

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to iterable entries

### get

Get content of a url

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to the content

### stat

Delivers meta information for a given url

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to one entry

### put

Put the content of a stream to a given url

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;
*   `stream` **[Stream](https://nodejs.org/api/stream.html)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves if stream has ben put to the url

### delete

Deletes object at a given url

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to the history of the object at the given url

### history

Deliver history information for a given url

#### Parameters

*   `context` **[Context](#context)** execution context
*   `url` **[URL](https://developer.mozilla.org/docs/Web/API/URL/URL)**&#x20;
*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** resolves to the history of the object at the given url

### provideCredentials

Called when authorization is required for a given realm
Tries provideCredentials() on the options object first and
then calls provideCredentials() on the context.

#### Parameters

*   `context` **[Context](#context)** execution context
*   `realm` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** requested (decoded) realm

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)<[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)>** holding the credentials

### methods

supported methods

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** 'get', 'stat', 'put', 'delete', 'list', 'history'

### isSecure

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** false

### defaultPort

Returns **mumber** undefined by default

### defaultOptions

Default configuration options

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

### optionsFromEnvironment

Extract options suitable for the constructor
form the given set of environment variables

#### Parameters

*   `env` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)**&#x20;

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** undefined if no suitable environment variables have been found

### options

Pepare configuration by mixing together defaultOptions with actual options

#### Parameters

*   `options` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** raw config

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** combined options

## parseAuthenticate

*   **See**: rfc7235

Parse WWW-Authenticate header and provide parts as object.
provides a two level structure 1st. the algorithm and then
the algorithm attributes

### Parameters

*   `source` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** http header 'WWW-Authenticate'
*   `result` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** where to put result into (optional, default `{}`)

Returns **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** same as result

## ResponseError

**Extends Error**

general fetch response error

# install

With [npm](http://npmjs.org) do:

```shell
npm install url-resolver-fs
```

# license

BSD-2-Clause
