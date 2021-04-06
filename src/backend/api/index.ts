import { Express } from 'express';
import { Sequelize } from 'sequelize';
import { AssetRepository } from '../classes/AssetRepository';
import { SnapshotRepository } from '../classes/SnapshotRepository';
import { OwnedAsset } from '../models/OwnedAsset';
import { createSnapshot } from '../functions/snapshots/snapshots';
import { getBinanceBalances } from '../functions/snapshots/binance';
import BigNumber from 'bignumber.js';

export const runApi = async (expressApp: Express, db: Sequelize): Promise<void> => {
    console.log('Initializing API...');

    const assetRepository = new AssetRepository(db);
    const snapshotRepository = new SnapshotRepository(db);

    expressApp.get('/api/assets', async (req, res) => {
        const assets = await assetRepository.getCurrentAssets();

        // Return them indexed by asset.
        const results: { [key: string]: OwnedAsset } = {};

        assets.forEach((asset) => {
            results[asset.asset] = asset;
        });

        res.json(results);
    });

    expressApp.get('/api/snapshots/latest', async (req, res) => {
        const snapshot = await snapshotRepository.getLatestSnapshot();
        const assets = await snapshotRepository.getSnapshotAssets(snapshot.id);

        const response = {
            snapshot,
            assets,
        };

        res.json(response);
    });

    expressApp.get('/api/snapshots/:snapshotId', async (req, res) => {
        const snapshot = await snapshotRepository.get(req.params.snapshotId);
        const assets = await snapshotRepository.getSnapshotAssets(snapshot.id);

        const response = {
            snapshot,
            assets,
        };

        res.json(response);
    });

    expressApp.get('/api/snapshots', async (req, res) => {
        const snapshots = await snapshotRepository.getSnapshots();

        res.json(snapshots);
    });

    expressApp.post('/api/snapshots', async (req, res) => {
        const snapshotId = await createSnapshot(db);

        res.json({ snapshotId });
    });

    expressApp.get('/api/binance-balances', async (req, res) => {
        const balances = await getBinanceBalances();

        res.json(balances);
    });

    expressApp.get('/api/binance-balances.csv', async (req, res) => {
        let balances = await getBinanceBalances();

        balances = balances.sort((a, b) => {
            if (a.asset === b.asset) {
                return 0;
            }

            return a.asset > b.asset ? 1 : -1;
        });

        let usdTotal = new BigNumber(0);
        let gbpTotal = new BigNumber(0);

        const csv = balances.map((bal) => {
            usdTotal = usdTotal.plus(bal.values.BUSD);
            gbpTotal = gbpTotal.plus(bal.values.GBP);

            return [
                bal.asset,
                bal.total,
                bal.values.BUSD,
                bal.values.GBP,
            ];
        });

        csv.unshift([
            'Total',
            '',
            usdTotal.toString(),
            gbpTotal.toString(),
        ]);

        const str = csv.join('\n');

        res.send(str);
    });
};
