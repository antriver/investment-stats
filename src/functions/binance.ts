import { BigNumber } from 'bignumber.js';

//BigNumber.config({'DECIMAL_PLACES': 8});

interface TickerPrice {
    symbol: string;
    price: string;
}

interface FlattenedTickerPrices {[key: string]: string};

interface Balance {
    asset: string;
    free: string;
    locked: string;
}

interface BalanceWithBtcValue extends Balance {
    freeBtcValue: string;
    lockedBtcValue: string;
}

export const flattenTickers = (
    tickers: TickerPrice[],
): FlattenedTickerPrices => {
    const rtn: FlattenedTickerPrices = {};
    tickers.forEach((ticker) => {
        rtn[ticker.symbol] = ticker.price;
    });
    return rtn;
};

export const convertValue = (
    flattenedTickers: FlattenedTickerPrices,
    fromSymbol: string,
    toSymbol: string,
    amount: BigNumber
): BigNumber => {
    let rate: BigNumber = null;
    const symbol = fromSymbol+toSymbol;
    const reversedSymbol = toSymbol+fromSymbol;
    if (flattenedTickers.hasOwnProperty(symbol)) {
        rate = new BigNumber(flattenedTickers[symbol]);
    } else if (flattenedTickers.hasOwnProperty(reversedSymbol)) {
        rate = (new BigNumber(1)).dividedBy(flattenedTickers[reversedSymbol]);
    }

    if (rate === null) {
        throw new Error(`No direct conversion rate available for ${fromSymbol} -> ${toSymbol}`);
    }

    return amount.multipliedBy(rate);
};

export const addBtcPricesToBalances = (balances: Balance[], tickers: TickerPrice[]): BalanceWithBtcValue[] => {
    const flattenedTickers = flattenTickers(tickers);

    return balances.map((balance: Balance): BalanceWithBtcValue => {
        // @ts-ignore
        const balWithBtc: BalanceWithBtcValue = {
            ...balance
        };

        let symbol = balance.asset;

        // Handle savings balances:
        let ldMatches = balance.asset.match(/^LD([A-Z]{3,})/);
        //console.log(balance.asset, 'ldMatches', ldMatches);
        if (ldMatches) {
            symbol = ldMatches[1]
        }

        // Handle BETH like ETH for now.
        if (balWithBtc.asset === 'BETH') {
            symbol = 'ETH';
        }

        let free = new BigNumber(balance.free);
        let locked = new BigNumber(balance.locked);

        balWithBtc.freeBtcValue = free.isEqualTo(0) ? '0.00000000' : convertValue(flattenedTickers, symbol, 'BTC', free).toPrecision(8);
        balWithBtc.lockedBtcValue = locked.isEqualTo(0) ? '0.00000000' : convertValue(flattenedTickers, symbol, 'BTC', locked).toPrecision(8);

        return balWithBtc;
    });
};

export const zeroBalanceFilter = (balance:Balance): boolean => {
    // @ts-ignore
    return parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0;
}
