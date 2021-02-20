import fs from 'fs';
import {
    addPricesToBalances,
    addFiatValueToBalance,
    flattenTickers, mergeBalances,
    zeroBalanceFilter,
} from '../../src/backend/functions/binance';

const accountInfo = JSON.parse(fs.readFileSync(__dirname + '/../data/binance-account-info.json').toString());
const tickers = JSON.parse(fs.readFileSync(__dirname + '/../data/binance-tickers.json').toString());

describe('binance', () => {
    describe('addBtcPricesToBalances', () => {
        it('Should produce balances with btc values', () => {
            const flattenedTickers = flattenTickers(tickers);
            let balances = addPricesToBalances(accountInfo.balances, flattenedTickers);
            balances = balances.filter(zeroBalanceFilter);

            console.log(JSON.stringify(balances, null, 4));
        });
    });

    describe('mergeBalances', () => {
        it('Should merge balances', () => {
            const balances = accountInfo.balances.filter(zeroBalanceFilter);
            console.log(JSON.stringify(balances, null, 4));

            const mergedBalances = mergeBalances(balances);
            console.log(JSON.stringify(mergedBalances, null, 4));
        });
    });

    describe('flattenTickers', () => {
        it('Should produce object with symbols as keys', () => {
            const result = flattenTickers(tickers);
            expect(result.ETHBTC).toBe('0.03849800');
            expect(result.LTCBTC).toBe('0.00441600');
        });
    });

    describe('addFiatValueToBalance', () => {
        it('Should add fiat values to balances', () => {
            const flattenedTickers = flattenTickers(tickers);
            let balances = addPricesToBalances(accountInfo.balances, flattenedTickers);
            balances = balances.filter(zeroBalanceFilter);
            balances.forEach((balance) => {
                addFiatValueToBalance(balance, 'GBP', flattenedTickers);
                addFiatValueToBalance(balance, 'BUSD', flattenedTickers);
            });

            console.log(JSON.stringify(balances, null, 4));
        });
    });
});
