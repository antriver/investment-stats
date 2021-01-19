import { Express } from 'express';
import { Sequelize } from 'sequelize';
import { AssetRepository } from './classes/AssetRepository';
import { SnapshotRepository } from './classes/SnapshotRepository';

export const runApi = async (expressApp: Express, db: Sequelize): Promise<void> => {
    console.log('Initializing API...');

    const assetRepository = new AssetRepository(db);
    const snapshotRepository = new SnapshotRepository(db);

    expressApp.get('/api/assets', async (req, res) => {
        const assets = await assetRepository.getCurrentAssets();
        res.json(assets);
    });

    expressApp.get('/api/snapshots/latest', async (req, res) => {
        const snapshot = await snapshotRepository.getLatestSnapshot();
        const assets = await snapshotRepository.getSnapshotAssets(snapshot.id);

        const response = {
            snapshot,
            assets
        };

        res.json(response);
    });
};
