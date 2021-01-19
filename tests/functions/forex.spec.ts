import { getRates, invertRates } from '../../src/functions/forex';

describe('forex', () => {
    describe('getRates', () => {
        it('Should return array of rates', async () => {
            const rates = await getRates();
            const keys = Object.keys(rates);
            expect(keys).toContain('USD');
            expect(keys).toContain('EUR');
            expect(keys).toContain('NOK');
        });
    });

    describe('invertRates', () => {
        it('Should invert the rates in the given object', () => {
            const rates = {
                USD: 2,
                CNY: 10,
            };

            const result = invertRates(rates);

            expect(result).toEqual(
                {
                    USD: 0.5,
                    CNY: 0.1,
                }
            )
        });
    });
});
