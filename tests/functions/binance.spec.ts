import fs from 'fs';
import {
    addBtcPricesToBalances,
    addFiatValueToBalance,
    flattenTickers,
    zeroBalanceFilter,
} from '../../src/functions/binance';

const accountInfo = JSON.parse(fs.readFileSync(__dirname + '/../data/binance-account-info.json').toString());
const tickers = JSON.parse(fs.readFileSync(__dirname + '/../data/binance-tickers.json').toString());

describe('binance', () => {
    describe('addBtcPricesToBalances', () => {
        const flattenedTickers = flattenTickers(tickers);
        let balances = addBtcPricesToBalances(accountInfo.balances, flattenedTickers);
        balances = balances.filter(zeroBalanceFilter);

        console.log(JSON.stringify(balances, null, 4));
    });

    describe('flattenTickers', () => {
        it('Should produce object with symbols as keys', () => {
            const result = flattenTickers(tickers);
            expect(result.ETHBTC).toBe('0.03849800');
            expect(result.LTCBTC).toBe('0.00441600');
        });
    });

    describe('addFiatValueToBalance', () => {
        const flattenedTickers = flattenTickers(tickers);
        let balances = addBtcPricesToBalances(accountInfo.balances, flattenedTickers);
        balances = balances.filter(zeroBalanceFilter);
        balances.forEach((balance) => {
            addFiatValueToBalance(balance, 'GBP', flattenedTickers);
            addFiatValueToBalance(balance, 'BUSD', flattenedTickers);
        });

        console.log(JSON.stringify(balances, null, 4));
    });
});
