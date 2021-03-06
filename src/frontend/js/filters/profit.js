import { currency } from '@/frontend/js/filters/currency';

/**
 * Vue filter to round the decimal to the given place.
 * http://jsfiddle.net/bryan_k/3ova17y9/
 *
 * @param {string} value The value string.
 * @param {?string} displayAsCurrency
 *
 * @return {string} value
 */
export const profit = function (value, displayAsCurrency = null) {
    let str = '';

    if (parseFloat(value) === 0) {
        str += '';
    } else if (value >= 0) {
        str += '+';
    } else {
        str += '-';
    }

    if (displayAsCurrency) {
        str += currency(Math.abs(value), displayAsCurrency);
    } else {
        str += Math.abs(value);
    }

    return str;
};
