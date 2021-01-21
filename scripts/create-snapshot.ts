import { initializeDb } from '../src/backend/database';
import { saveStocksSnapshot } from '../src/backend/snapshots/stocks';
import { saveBinanceSnapshot } from '../src/backend/snapshots/binance';

require('dotenv').config();

const run = async () => {
    const sequelize = await initializeDb();

    // Create a snapshot
    const [snapshotId] = await sequelize.query('INSERT INTO snapshots () VALUES ()');

    // Save stock prices
    // @ts-ignore
    await saveStocksSnapshot(snapshotId, sequelize);

    // Save crypto prices
    // @ts-ignore
    await saveBinanceSnapshot(snapshotId, sequelize);

    await sequelize.close();
};

run();
