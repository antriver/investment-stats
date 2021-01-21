import { Asset } from '../backend/api/models/AssetInterface';

const CoinMarketCapClient = require('coinmarketcap-api');

export class CoinMarketCap {
    private client;

    constructor() {
        this.client = new CoinMarketCapClient(process.env.COINMARKETCAP_KEY);
    }

    getSymbol(symbol: string): Promise<any> {
        return this.client.getMetadata({ symbol: [symbol] })
            .then((response: any): { [key: string]: Asset } => {
                if (!response.hasOwnProperty('data')) {
                    return null;
                }

                return response.data[symbol];
            });
    }
}
