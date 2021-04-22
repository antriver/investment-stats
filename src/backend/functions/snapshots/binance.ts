import Binance from 'binance-api-node';
import { Sequelize } from 'sequelize';
import {
    addPricesToBalances,
    createBalances,
    flattenTickers,
    mergeBalances,
    zeroBalanceFilter,
} from '../binance';

const createBinance = () => {
    return Binance({
        apiKey: process.env.BINANCE_KEY,
        apiSecret: process.env.BINANCE_SECRET,
    });
};

export const getBinanceBalances = async () => {
    const binance = createBinance();

    const accountInfo = await binance.accountInfo();
    // console.log(JSON.stringify(accountInfo, null, 4));

    // @ts-ignore
    const tickers = await binance.publicRequest('get', '/api/v3/ticker/price');
    // console.log(JSON.stringify(tickers, null, 4));

    const flattenedTickers = flattenTickers(tickers);

    let balances = createBalances(accountInfo.balances);
    balances = mergeBalances(balances);
    balances = balances.filter(zeroBalanceFilter);
    console.log('balances', balances);

    addPricesToBalances(balances, flattenedTickers);

    console.log('balances', JSON.stringify(balances, null, 4));

    return balances;
};

export const saveBinanceSnapshot = async (snapshotId: number, sequelize: Sequelize) => {
    const balances = await getBinanceBalances();

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
                    balance.prices.BUSD ? balance.prices.BUSD : null,
                    balance.prices.GBP ? balance.prices.GBP : null,
                    balance.values.BUSD ? balance.values.BUSD : null,
                    balance.values.GBP ? balance.values.GBP : null,
                    null,
                ],
            },
        );
    }
};
