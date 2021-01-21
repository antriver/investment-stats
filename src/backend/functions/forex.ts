import axios from 'axios';
import BigNumber from 'bignumber.js';

export const getRates = (base = 'GBP'): Promise<any> => {
    const url = 'https://api.exchangeratesapi.io/latest?base=' + base;
    return axios.get(url)
        .then((result) => {
            return result.data.rates;
        });
};

export const invertRates = (rates: {[key: string]: number}): {[key: string]: number} => {
    const inverted: {[key: string]: number} = {};
    Object.keys(rates).forEach((key) => {
        inverted[key] = (new BigNumber(1)).dividedBy(rates[key]).toNumber();
    });
    return inverted;
};
