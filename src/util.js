/**
 * Parse WWW-Authenticate header and provide parts as object
 * @see rfc7235
 * @param {string} value http header 'WWW-Authenticate'
 * @return {Object}
 */
export function parseAuthenticate(value) {
  const result = {};

  let m = value.match(/([^=]+)=(("([^"]+)")|\d+)/);
  if (m) {
    const key = m[1];

    if (m[4] !== undefined) {
      result[key] = m[4];
    } else {
      result[key] = parseInt(m[2], 10);
    }
  }

  return result;
}
