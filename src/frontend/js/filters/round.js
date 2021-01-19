/**
 * Vue filter to round the decimal to the given place.
 * http://jsfiddle.net/bryan_k/3ova17y9/
 *
 * @param {String} value    The value string.
 * @param {Number} decimals The number of decimal places.
 */
export const round = function (value, decimals) {
    if (!value) {
        value = 0;
    }

    if (!decimals) {
        decimals = 0;
    }

    const multiplier = 10 ** decimals;
    value = Math.round(value * multiplier) / multiplier;
    return value.toFixed(decimals);
};
