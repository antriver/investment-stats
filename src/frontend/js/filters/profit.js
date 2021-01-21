import { currency } from '@frontend/filters/currency';

/**
 * Vue filter to round the decimal to the given place.
 * http://jsfiddle.net/bryan_k/3ova17y9/
 *
 * @param {String} value The value string.
 *
 * @return {string}
 */
export const profit = function (value) {
    let str = '';

    if (parseFloat(value) === 0) {
        str += '';
    } else if (value >= 0) {
        str += '+';
    } else {
        str += '-';
    }

    str += currency(Math.abs(value));

    return str;
};
