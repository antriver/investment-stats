import Binance from 'binance-api-node';

import fs from 'fs';

const binanceCreds = JSON.parse(fs.readFileSync(__dirname + '/../binance-credentials.json')
    .toString());

const binance = Binance({
    apiKey: binanceCreds['api-key'],
    apiSecret: binanceCreds['api-secret'],
});

const run = async () => {
    // const accountInfo = await binance.accountInfo();
    // console.log(JSON.stringify(accountInfo, null, 4));

    // @ts-ignore
    // const tickers = await binance.publicRequest('get', '/api/v3/ticker/price');
    // console.log(JSON.stringify(tickers, null, 4));

    // const tickers = await binance.bookTickers();
    // console.log(tickers);

    // const prices = await binance.avgPrice();
    // console.log('prices', prices);

    // const accountInfo = await binance.accountInfo();
    // console.log(JSON.stringify(accountInfo, null, 4));

    // const assets = await binance.assetDetail();
    // console.log(JSON.stringify(assets, null, 4));

    const assets = await binance.assetDetail();
    console.log(JSON.stringify(assets, null, 4));
};

run();
