import { BigNumber } from 'bignumber.js';

BigNumber.config({ ROUNDING_MODE: 0 });
BigNumber.set({ ROUNDING_MODE: BigNumber.ROUND_HALF_UP });
BigNumber.set({ EXPONENTIAL_AT: 9 });

interface TickerPrice {
    symbol: string;
    price: string;
}

interface FlattenedTickerPrices {[key: string]: string}

interface Balance {
    asset: string;
    free: string;
    locked: string;
}

interface BalanceValue {
    free: string;
    locked: string;
    total: string;
}

interface BalanceWithValues extends Balance {
    total: string;
    values: {[key: string]: BalanceValue};
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
    amount: BigNumber,
): BigNumber => {
    let rate: BigNumber = null;
    const symbol = fromSymbol + toSymbol;
    const reversedSymbol = toSymbol + fromSymbol;
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

/**
 * @param balances Response from /api/v3/account balances
 * @param tickers Response from /api/v3/ticker/price
 */
export const addBtcPricesToBalances = (balances: Balance[], tickers: FlattenedTickerPrices): BalanceWithValues[] => {
    return balances.map((balance: Balance): BalanceWithValues => {
        let symbol = balance.asset;

        // Handle savings balances:
        const ldMatches = balance.asset.match(/^LD([A-Z]{3,})/);
        if (ldMatches) {
            // Strip the LD off the start.
            symbol = ldMatches[1];
        }

        // Handle BETH like ETH for now.
        if (balance.asset === 'BETH') {
            symbol = 'ETH';
        }

        const free = new BigNumber(balance.free);
        const locked = new BigNumber(balance.locked);
        const total = (new BigNumber(balance.free)).plus(balance.locked);

        const balanceWithValues: BalanceWithValues = {
            ...balance,
            total: total.decimalPlaces(8).toString(),
            values: {},
        };

        balanceWithValues.total = total.decimalPlaces(8).toString();

        balanceWithValues.values.BTC = {
            free: free.isEqualTo(0) ? '0.00000000' : convertValue(tickers, symbol, 'BTC', free).decimalPlaces(8).toString(),
            locked: locked.isEqualTo(0) ? '0.00000000' : convertValue(tickers, symbol, 'BTC', locked).decimalPlaces(8).toString(),
            total: total.isEqualTo(0) ? '0.00000000' : convertValue(tickers, symbol, 'BTC', total).decimalPlaces(8).toString(),
        };

        return balanceWithValues;
    });
};

export const zeroBalanceFilter = (balance: Balance): boolean => {
    return parseFloat((balance.free as string)) > 0 || parseFloat((balance.locked as string)) > 0;
};

export const addFiatValueToBalance = (balance: BalanceWithValues, fiat: string, tickers: FlattenedTickerPrices) => {
    balance.values[fiat] = {
        free: convertValue(tickers, 'BTC', fiat, new BigNumber(balance.values.BTC.free)).decimalPlaces(8).toString(),
        locked: convertValue(tickers, 'BTC', fiat, new BigNumber(balance.values.BTC.locked)).decimalPlaces(8).toString(),
        total: convertValue(tickers, 'BTC', fiat, new BigNumber(balance.values.BTC.total)).decimalPlaces(8).toString(),
    };
};

export const mergeBalances = (balances: Balance[]) => {
    return balances.filter((balance) => {
        let mergeWithSymbol: string;

        // Lending balances:
        const ldMatches = balance.asset.match(/^LD([A-Z]{3,})/);
        if (ldMatches) {
            // Strip the LD off the start and merge with non-lending.
            mergeWithSymbol = ldMatches[1];
        }

        // BETH -> ETH
        if (balance.asset === 'BETH') {
            mergeWithSymbol = 'ETH';
        }

        if (!mergeWithSymbol) {
            return true;
        }

        const mergeWithBalance = balances.find((b) => b.asset === mergeWithSymbol);

        // If there is no balance for the merge symbol just add it back with that name.
        if (mergeWithBalance) {
            console.log(`Merging ${balance.asset} with ${mergeWithBalance.asset}`);

            mergeWithBalance.free = (new BigNumber(mergeWithBalance.free)).plus(balance.free)
                .decimalPlaces(8)
                .toString();
            mergeWithBalance.locked = (new BigNumber(mergeWithBalance.locked)).plus(balance.locked)
                .decimalPlaces(8)
                .toString();

            // Remove original balance.
            return false;
        }

        console.log(`Renaming ${balance.asset} to ${mergeWithSymbol}`);
        balance.asset = mergeWithSymbol;
        return true;
    });
};
