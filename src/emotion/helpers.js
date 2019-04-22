/**
 * Converts a px value to a rem value
 *
 * @param {integer} size Font size to change to a rem value - 80
 * @param {integer} base (optional) Base value, defaults to 16
 */
export const rem = (size, base = 16) => `${size / base}rem`
