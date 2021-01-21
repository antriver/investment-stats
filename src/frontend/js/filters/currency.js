/**
 * @param {string} value
 * @param {string} currency
 *
 * @return {string}
 */
export const currency = (value, currency = 'GBP') => {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
        currencyDisplay: 'narrowSymbol'
    });

    return formatter.format(value);
};
