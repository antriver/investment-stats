import fs from 'fs';
import { addBtcPricesToBalances, flattenTickers, zeroBalanceFilter } from '../../src/functions/binance';

const accountInfo = JSON.parse(fs.readFileSync(__dirname + '/../data/binance-account-info.json').toString());
const tickers = JSON.parse(fs.readFileSync(__dirname + '/../data/binance-tickers.json').toString());

describe('binance', () => {
    describe('addBtcPricesToBalances', () => {
        let results = addBtcPricesToBalances(accountInfo.balances, tickers);
        results = results.filter(zeroBalanceFilter);

        console.log(JSON.stringify(results, null, 4));
    });

    describe('flattenTickers', () => {
        it('Should produce object with symbols as keys', () => {
            const result = flattenTickers(tickers);
            expect(result.ETHBTC).toBe('0.03849800');
            expect(result.LTCBTC).toBe('0.00441600');
        });
    });
});
