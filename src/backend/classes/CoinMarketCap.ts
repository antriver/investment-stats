import { AssetInterface } from '../models/AssetInterface';

const CoinMarketCapClient = require('coinmarketcap-api');

export class CoinMarketCap {
    private client;

    constructor() {
        this.client = new CoinMarketCapClient(process.env.COINMARKETCAP_KEY);
    }

    getSymbol(symbol: string): Promise<any> {
        return this.client.getMetadata({ symbol: [symbol] })
            .then((response: any): { [key: string]: AssetInterface } => {
                if (!response.hasOwnProperty('data')) {
                    return null;
                }

                return response.data[symbol];
            });
    }

    getSymbols(symbols: string[]): Promise<any[]> {
        return this.client.getMetadata({ symbol: symbols })
            .then((response: any): AssetInterface[] => {
                if (!response.hasOwnProperty('data')) {
                    return [];
                }

                return response.data;
            });
    }

    getPrices(symbols: string[]): Promise<any> {
        return this.client.getQuotes({ symbol: symbols })
            .then((response: any): AssetInterface[] => {
                if (!response.hasOwnProperty('data')) {
                    return [];
                }

                return response.data;
            });
    }
}
