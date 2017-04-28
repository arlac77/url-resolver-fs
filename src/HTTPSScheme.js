/* jslint node: true, esnext: true */

'use strict';

import HTTPScheme from './HTTPScheme';

export default class HTTPSScheme extends HTTPScheme {

  static get name() {
    return 'https';
  }

  /**
   * @return {number} 443 the https default port
   */
  static get defaultPort() {
    return 443;
  }

  /**
   * @return {boolean} true
   */
  static get isSecure() {
    return true;
  }
}
