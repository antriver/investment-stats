import { CoinMarketCap } from '../../src/backend/classes/CoinMarketCap';

describe('CoinMarketCap', () => {
    let cmc: CoinMarketCap;

    beforeEach(() => {
        require('dotenv').config();
        cmc = new CoinMarketCap();
    });

    describe('getSymbols', () => {
        it('Should return multiple symbols', () => {
            return cmc.getSymbols(['SAFEMOON', 'HOGE'])
                .then((res) => {
                    console.log(res);
                    expect(res.SAFEMOON.name).toBe('SafeMoon');
                    expect(res.SAFEMOON.category).toBe('token');
                });
        });
    });

    describe('getPrices', () => {
        it('Should return multiple prices', () => {
            return cmc.getPrices(['SAFEMOON', 'HOGE'])
                .then((res) => {
                    console.log(res);
                    expect(res.SAFEMOON.USD).toBeGreaterThan(0);
                });
        });
    });
});
