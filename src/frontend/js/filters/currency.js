/**
 * @param {string} value
 * @param {string} toCurrency
 *
 * @return {string}
 */
export const currency = (value, toCurrency = 'GBP') => {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: toCurrency,
        currencyDisplay: 'narrowSymbol',
    });

    return formatter.format(value);
};
