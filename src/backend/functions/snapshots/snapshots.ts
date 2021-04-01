import { AssetInterface } from '../../models/AssetInterface';
import { AssetRepository } from '../../classes/AssetRepository';
import { CoinMarketCap } from '../../classes/CoinMarketCap';
import { saveBinanceSnapshot } from './binance';
import { saveStocksSnapshot } from './stocks';
import { Sequelize } from 'sequelize';

export const createSnapshot = async (sequelize: Sequelize): Promise<number> => {
    // Create a snapshot
    const [snapshotId] = await sequelize.query('INSERT INTO snapshots () VALUES ()');

    // Save crypto prices
    // @ts-ignore
    await saveBinanceSnapshot(snapshotId, sequelize);

    // Save stock prices
    // @ts-ignore
    // await saveStocksSnapshot(snapshotId, sequelize);

    // Save info for any new crypto that might have appeared.
    const assetRepository = new AssetRepository(sequelize);

    const cmc = new CoinMarketCap();
    const missingAssets = await assetRepository.getMissingAssets();
    for (let i = 0; i < missingAssets.length; i++) {
        const missingAsset = missingAssets[i];
        console.log(`Fetching missing info for ${missingAsset}...`);

        const symbolData = await cmc.getSymbol(missingAsset);
        if (symbolData) {
            const asset: AssetInterface = {
                asset: symbolData.symbol,
                assetType: 'crypto',
                name: symbolData.name,
                logoUrl: symbolData.logo,
            };
            console.log('Saving new asset', asset);
            await assetRepository.saveAsset(asset);
        } else {
            const asset: AssetInterface = {
                asset: missingAsset,
                assetType: 'unknown',
                name: null,
                logoUrl: null,
            };
            console.log('Failed to get data for asset', asset);
            await assetRepository.saveAsset(asset);
        }
    }

    // @ts-ignore
    return snapshotId;
};
