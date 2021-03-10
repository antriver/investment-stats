import { BigNumber } from 'bignumber.js';
import { AssetBalance } from 'binance-api-node';

BigNumber.config({
    ROUNDING_MODE: BigNumber.ROUND_DOWN,
    EXPONENTIAL_AT: 9,
});

interface TickerPrice {
    symbol: string;
    price: string;
}

interface FlattenedTickerPrices {[key: string]: string}

interface Balance {
    asset: string;
    total: string;
    prices: {[key: string]: string};
    values: {[key: string]: string};
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

export const getPrice = (
    flattenedTickers: FlattenedTickerPrices,
    fromAsset: string,
    toAsset: string,
    allowVia = true,
): BigNumber|null => {
    if (fromAsset === toAsset) {
        return new BigNumber(1);
    }

    const symbol = `${fromAsset}${toAsset}`;
    if (flattenedTickers.hasOwnProperty(symbol)) {
        // Direct symbol.
        return new BigNumber(flattenedTickers[symbol]);
    }

    const reverseSymbol = `${toAsset}${fromAsset}`;
    if (flattenedTickers.hasOwnProperty(reverseSymbol)) {
        // Direct symbol, reversed.
        return (new BigNumber(1)).dividedBy(flattenedTickers[reverseSymbol]);
    }

    if (!allowVia) {
        return null;
    }

    const tryVia = [
        'BUSD',
        'USDT',
        'BTC',
        'ETH',
    ];

    for (let i = 0; i < tryVia.length; i++) {
        const toViaPrice = getPrice(flattenedTickers, fromAsset, tryVia[i], false);
        const fromViaPrice = getPrice(flattenedTickers, tryVia[i], toAsset, false);
        if (toViaPrice && fromViaPrice) {
            return toViaPrice.multipliedBy(fromViaPrice);
        }
    }

    return null;
};

export const convertValue = (
    flattenedTickers: FlattenedTickerPrices,
    fromAsset: string,
    toAsset: string,
    amount: BigNumber,
): BigNumber|null => {
    const rate = getPrice(flattenedTickers, fromAsset, toAsset);

    if (rate === null) {
        console.error(`No direct conversion rate available for ${fromAsset} -> ${toAsset}`);
        return null;
    }

    return amount.multipliedBy(rate);
};

/**
 * @param balances Response from /api/v3/account balances
 * @param tickers Response from /api/v3/ticker/price
 */
export const addPricesToBalances = (balances: Balance[], tickers: FlattenedTickerPrices) => {
    balances.forEach((balance: Balance) => {
        const asset = balance.asset;
        const total = (new BigNumber(balance.total));

        const btcPrice = getPrice(tickers, asset, 'BTC');
        balance.prices.BTC = btcPrice ? btcPrice.decimalPlaces(8).toString() : null;

        const busdPrice = getPrice(tickers, asset, 'BUSD');
        balance.prices.BUSD = busdPrice ? busdPrice.decimalPlaces(4).toString() : null;

        const gbpPrice = getPrice(tickers, asset, 'GBP');
        balance.prices.GBP = gbpPrice ? gbpPrice.decimalPlaces(4).toString() : null;

        const btcValue = convertValue(tickers, asset, 'BTC', total);
        balance.values.BTC = btcValue ? btcValue.decimalPlaces(8).toString() : null;

        const busdValue = convertValue(tickers, asset, 'BUSD', total);
        balance.values.BUSD = busdValue ? busdValue.decimalPlaces(4).toString() : null;

        const gbpValue = convertValue(tickers, asset, 'GBP', total);
        balance.values.GBP = gbpValue ? gbpValue.decimalPlaces(8).toString() : null;
    });
};

export const zeroBalanceFilter = (balance: Balance): boolean => {
    return parseFloat((balance.total as string)) > 0;
};

// export const addFiatValueToBalance = (balance: Balance, fiat: string, tickers: FlattenedTickerPrices) => {
//    balance.values[fiat] = {
//        total: convertValue(tickers, 'BTC', fiat, new BigNumber(balance.values.BTC.total)).decimalPlaces(8).toString(),
//    };
// };

/**
 * Convert the balances as they come from Binances (separate locked and free) into a single total.
 *
 * @param {AssetBalance[]} balances
 *
 * @return {Balance[]}
 */
export const createBalances = (balances: AssetBalance[]) => {
    return balances.map((balance): Balance => {
        const free = (new BigNumber(balance.free));
        const locked = (new BigNumber(balance.locked));

        return {
            asset: balance.asset,
            total: free.plus(locked).decimalPlaces(8).toString(),
            prices: {},
            values: {},
        };
    });
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

            mergeWithBalance.total = (new BigNumber(mergeWithBalance.total)).plus(balance.total)
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
