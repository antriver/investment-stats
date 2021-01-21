import Binance from 'binance-api-node';
import { Sequelize } from 'sequelize';
import {
    addBtcPricesToBalances,
    addFiatValueToBalance,
    flattenTickers, mergeBalances,
    zeroBalanceFilter,
} from '../functions/binance';

const createBinance = () => {
    return Binance({
        apiKey: process.env.BINANCE_KEY,
        apiSecret: process.env.BINANCE_SECRET,
    });
};

export const saveBinanceSnapshot = async (snapshotId: number, sequelize: Sequelize) => {
    const binance = createBinance();

    const accountInfo = await binance.accountInfo();
    // console.log(JSON.stringify(accountInfo, null, 4));

    // @ts-ignore
    const tickers = await binance.publicRequest('get', '/api/v3/ticker/price');
    // console.log(JSON.stringify(tickers, null, 4));

    const flattenedTickers = flattenTickers(tickers);

    let mergedBalances = mergeBalances(accountInfo.balances);
    mergedBalances = mergedBalances.filter(zeroBalanceFilter);
    console.log('mergedBalances', mergedBalances);

    const balances = addBtcPricesToBalances(mergedBalances, flattenedTickers);
    // balances = balances.filter(zeroBalanceFilter);
    balances.forEach((balance) => {
        addFiatValueToBalance(balance, 'GBP', flattenedTickers);
        addFiatValueToBalance(balance, 'BUSD', flattenedTickers);
    });
    console.log('balances', JSON.stringify(balances, null, 4));

    for (let i = 0; i < balances.length; i++) {
        const balance = balances[i];
        await sequelize.query(
            `INSERT INTO snapshot_assets (snapshotId, service, asset, amount, usdPrice, gbpPrice, usdValue, gbpValue, gbpProfit)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            {
                bind: [
                    snapshotId,
                    'binance',
                    balance.asset,
                    balance.total,
                    null,
                    null,
                    balance.values.BUSD.total,
                    balance.values.GBP.total,
                    null,
                ],
            },
        );
    }
};
