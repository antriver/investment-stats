import axios from 'axios';
import BigNumber from 'bignumber.js';

export const getRates = (base = 'GBP'): Promise<any> => {
    const url = 'https://api.exchangeratesapi.io/latest?access_key=9c06373798206a500337b0319ac5f648&base=' + base;
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
