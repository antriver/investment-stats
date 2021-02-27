/**
 * @param {string} value
 * @param {string} toCurrency
 * @param {?number} minimumSignificantDigits
 *
 * @return {string}
 */
export const currency = (value, toCurrency = 'GBP', minimumSignificantDigits = null) => {
    const opts = {
        style: 'currency',
        currency: toCurrency,
        currencyDisplay: 'narrowSymbol',
    };

    if (minimumSignificantDigits !== null) {
        opts.minimumSignificantDigits = minimumSignificantDigits;
    }

    const formatter = new Intl.NumberFormat('en-GB', opts);

    return formatter.format(value);
};
