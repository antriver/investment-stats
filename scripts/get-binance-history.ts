import Binance from "binance-api-node";

require('dotenv').config();

const run = async () => {
    const binance = Binance({
        apiKey: process.env.BINANCE_KEY,
        apiSecret: process.env.BINANCE_SECRET,
    });

    //const res = await binance.allOrders({ symbol: 'BNB' });
    const res = await binance.myTrades({ symbol: 'BNBBUSD' })
    console.log('res', res);
};

run();
