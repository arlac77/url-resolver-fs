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

  get(uri, options) {
    return this.baseScheme.get(uri, options);
  }

  put(uri, options) {
    return this.baseScheme.put(uri, options);
  }
  
  delete(uri, options) {
    return this.baseScheme.delete(uri, options);
  }
  
  stat(uri, options) {
    return this.baseScheme.stat(uri, options);
  }

  history(uri, options) {
    return this.baseScheme.history(uri, options);
  }

  remapURI(uri) {
    return uri;
  }
}
