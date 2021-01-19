import { AssetRepository } from '../src/backend/api/classes/AssetRepository';
import { initializeDb } from '../src/backend/database';
import BigNumber from 'bignumber.js';
import { execShellCommand } from '../src/functions/shell';
import { getRates, invertRates } from '../src/functions/forex';

const ysp = require('yahoo-stock-prices');

require('dotenv').config();

const run = async () => {
    const sequelize = await initializeDb();

    // Create a snapshot
    const [snapshotId] = await sequelize.query('INSERT INTO snapshots () VALUES ()');

    // Save crypto balances
    await execShellCommand(`php ${__dirname}/save-balances.php ${snapshotId}`);

    const assetRepository = new AssetRepository(sequelize);

    const assets = await assetRepository.getCurrentAssets();
    //const assets = [
    //  {
    //    asset: 'RR.L',
    //    totalAmount: '164.45354600',
    //    totalGbpPaid: '184.9864'
    //  },
    //]
    //console.log('assets', assets);

    const forexRates = await getRates();
    const inverseForexRates = invertRates(forexRates);

    console.log(`GBP -> USD:`, forexRates.USD);
    console.log(`GBP <- USD:`, inverseForexRates.USD);

    for (let i = 0; i < assets.length; i++) {
        const price = await ysp.getCurrentData(assets[i].asset);
        console.log(assets[i].asset, price);

        let currentPrice = new BigNumber(price.price);
        // GBp means pennies
        if (price.currency === 'GBp') {
            price.currency = 'GBP';
            currentPrice = currentPrice.dividedBy(100);
        }

        let usdPrice;
        let gbpPrice;
        if (price.currency === 'GBP') {
            gbpPrice = currentPrice;
        } else if (price.currency === 'USD') {
            usdPrice = currentPrice;
            gbpPrice = currentPrice.multipliedBy(inverseForexRates[price.currency]);
        } else {
            gbpPrice = currentPrice.multipliedBy(inverseForexRates[price.currency]);
        }

        if (usdPrice === undefined) {
            usdPrice = gbpPrice.multipliedBy(forexRates.USD);
        }

        const usdValue = usdPrice.multipliedBy(assets[i].totalAmount);
        const gbpValue = gbpPrice.multipliedBy(assets[i].totalAmount);
        const gbpProfit = gbpValue.minus(new BigNumber(assets[i].totalGbpPaid));

        await sequelize.query(
            'INSERT INTO snapshot_assets (snapshotId, asset, amount, usdPrice, gbpPrice, usdValue, gbpValue, gbpProfit) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            {
                bind: [
                    snapshotId,
                    assets[i].asset,
                    assets[i].totalAmount,
                    usdPrice.toString(),
                    gbpPrice.toString(),
                    usdValue.toString(),
                    gbpValue.toString(),
                    gbpProfit.toString()
                ]
            }
        );
    }
};

run();
