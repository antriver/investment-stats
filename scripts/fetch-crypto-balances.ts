import Binance from 'binance-api-node'

//const Binance = require('node-binance-api');

import fs from 'fs';

const binanceCreds = JSON.parse(fs.readFileSync(__dirname + '/../binance-credentials.json').toString());

//const binance = new Binance().options({
//    APIKEY: binanceCreds['api-key'],
//    APISECRET: binanceCreds['api-secret']
//});

const binance = Binance({
    apiKey: binanceCreds['api-key'],
    apiSecret: binanceCreds['api-secret'],
});

//const augmentBalances = (balances, )

const run = async () => {
    //const accountInfo = await binance.accountInfo();
    //console.log(JSON.stringify(accountInfo, null, 4));

    // @ts-ignore
    const tickers = await binance.publicRequest('get', '/api/v3/ticker/price');
    console.log(JSON.stringify(tickers, null, 4));



    //const tickers = await binance.bookTickers();
    //console.log(tickers);

    //const prices = await binance.avgPrice();
    //console.log('prices', prices);

    //const accountInfo = await binance.accountInfo();
    //console.log(JSON.stringify(accountInfo, null, 4));
};

run();


