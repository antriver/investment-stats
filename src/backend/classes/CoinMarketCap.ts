const CoinMarketCapClient = require('coinmarketcap-api');

export class CoinMarketCap {
    private client;

    constructor() {
        this.client = new CoinMarketCapClient(process.env.COINMARKETCAP_KEY);
    }

    getSymbols(symbols: string[]): Promise<any> {
        return this.client.getMetadata({ symbol: symbols })
            .then((response: any): any => {
                if (!response.hasOwnProperty('data')) {
                    return {};
                }

                return response.data;
            });
    }

    getSymbol(symbol: string): Promise<any> {
        return this.getSymbols([symbol])
            .then((res) => res[symbol]);
    }

    getPrices(symbols: string[]): Promise<any> {
        return this.client.getQuotes({ symbol: symbols })
            .then((response: any): any => {
                if (!response.hasOwnProperty('data')) {
                    return [];
                }

                const quotes: any = {};

                Object.keys(response.data).forEach((coin) => {
                    quotes[coin] = {};
                    Object.keys(response.data[coin].quote).forEach((fiat) => {
                        quotes[coin][fiat] = response.data[coin].quote[fiat].price;
                    });
                });

                return quotes;
            });
    }
}
