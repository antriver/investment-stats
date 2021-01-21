import { Sequelize } from 'sequelize';
import { AssetRepository } from '../../classes/AssetRepository';
import { getRates, invertRates } from '../forex';
import BigNumber from 'bignumber.js';

const ysp = require('yahoo-stock-prices');

export const saveStocksSnapshot = async (snapshotId: number, sequelize: Sequelize) => {
    const assetRepository = new AssetRepository(sequelize);

    const assets = await assetRepository.getCurrentStocks();
    // Limit to 1 stock for testing:
    // const assets = [
    //     {
    //         asset: 'RR.L',
    //         totalAmount: '164.45354600',
    //         totalGbpPaid: '184.9864',
    //     },
    // ];
    console.log('assets', assets);

    const forexRates = await getRates();
    const inverseForexRates = invertRates(forexRates);

    console.log('GBP -> USD:', forexRates.USD);
    console.log('GBP <- USD:', inverseForexRates.USD);

    for (let i = 0; i < assets.length; i++) {
        console.log(`Getting price for ${assets[i].asset}`);
        let price;
        try {
            price = await ysp.getCurrentData(assets[i].asset);
        } catch (e) {
            console.log(`Getting price for ${assets[i].asset} failed.`, e);
            continue;
        }

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
                    gbpProfit.toString(),
                ],
            },
        );
    }
};
