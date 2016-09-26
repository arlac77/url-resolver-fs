/* jslint node: true, esnext: true */

'use strict';

import HTTPScheme from './HTTPScheme';

export default class HTTPSScheme extends HTTPScheme {

  static get name() {
    return 'https';
  }
}
