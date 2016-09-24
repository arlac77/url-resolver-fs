/* jslint node: true, esnext: true */

'use strict';

import URIScheme from './URIScheme';

export default class URIMapperScheme extends URIScheme {

  constructor(baseScheme, options) {
    super();

    Object.defineProperty(this, 'baseScheme', {
      value: baseScheme
    });

    Object.defineProperty(this, 'name', {
      value: options.name
    });
  }

  list(uri, options) {
    return this.baseScheme.list(uri, options);
  }

  fetch(uri, options) {
    return this.baseScheme.fetch(uri, options);
  }

  history(uri, options) {
    return this.baseScheme.history(uri, options);
  }

  remapURI(uri) {
    return uri;
  }
}
