/**
 * Parse WWW-Authenticate header and provide parts as object.
 * provides a two level structure 1st. the algorithm and then
 * the algorithm attributes
 * @see rfc7235
 * @param {string} source http header 'WWW-Authenticate'
 * @param {Object} result where to put result into
 * @return {Object} same as result
 */
export function parseAuthenticate(source, result = {}) {
  let params = {};
  let m;

  while ((m = source.match(/((\w+)\s+)?(\w+)=(("([^"]+)")|\d+)\s*,?\s*(.*)/))) {
    const algorithm = m[2];
    const key = m[3];
    const value = m[5] ? m[6] : m[4];

    if (algorithm !== undefined) {
      params = {};
      result[algorithm] = params;
    }

    params[key] = value;

    source = m[7];
  }

  return result;
}
