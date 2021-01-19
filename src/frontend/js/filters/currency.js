/**
 * @param {string} value
 * @return {string}
 */
export const currency = (value) => {
    const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP' });

    return formatter.format(value);
};
