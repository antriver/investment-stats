import Binance from 'binance-api-node';
import { Sequelize } from 'sequelize';
import fs from 'fs';
import {
    addBtcPricesToBalances,
    addFiatValueToBalance,
    flattenTickers,
    zeroBalanceFilter,
} from '../../functions/binance';

const binanceCreds = JSON.parse(fs.readFileSync(__dirname + '/../../../binance-credentials.json').toString());

const binance = Binance({
    apiKey: binanceCreds['api-key'],
    apiSecret: binanceCreds['api-secret'],
});

export const saveBinanceSnapshot = async (snapshotId: number, sequelize: Sequelize) => {
    const accountInfo = await binance.accountInfo();
    // console.log(JSON.stringify(accountInfo, null, 4));

    // @ts-ignore
    const tickers = await binance.publicRequest('get', '/api/v3/ticker/price');
    // console.log(JSON.stringify(tickers, null, 4));

    const flattenedTickers = flattenTickers(tickers);

    let balances = addBtcPricesToBalances(accountInfo.balances, flattenedTickers);
    balances = balances.filter(zeroBalanceFilter);
    balances.forEach((balance) => {
        addFiatValueToBalance(balance, 'GBP', flattenedTickers);
        addFiatValueToBalance(balance, 'BUSD', flattenedTickers);
    });

    console.log('balances', balances);

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
