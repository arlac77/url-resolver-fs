/* jslint node: true, esnext: true */

"use strict";

exports.Resolver = require('./resolver').Resolver;
const urs = require('./uri-scheme');
exports.URIScheme = urs.URIScheme;
exports.URIMapperScheme = urs.URIMapperScheme;
exports.HTTPScheme = require('./http-scheme').HTTPScheme;
