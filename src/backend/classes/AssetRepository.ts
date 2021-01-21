import { QueryTypes, Sequelize } from 'sequelize';
import { OwnedAsset } from '../models/OwnedAsset';
import { Asset, AssetInterface } from '../models/AssetInterface';

export class AssetRepository {
    constructor(private db: Sequelize) {
    }

    async getCurrentAssets(): Promise<OwnedAsset[]> {
        return this.db.query(
            'SELECT * FROM current_assets',
            { type: QueryTypes.SELECT },
        );
    }

    async getCurrentStocks(): Promise<OwnedAsset[]> {
        return this.db.query(
            "SELECT * FROM current_assets WHERE assetType = 'stock'",
            { type: QueryTypes.SELECT },
        );
    }

    async getAllCrypto(): Promise<{[key: string]: AssetInterface}> {
        const rows = await this.db.query(
            "SELECT * FROM assets WHERE assetType = 'crypto'",
            { type: QueryTypes.SELECT },
        );

        const assets: {[key: string]: AssetInterface} = {};
        rows.forEach((row) => {
            // @ts-ignore
            assets[row.asset] = row;
        });

        return assets;
    }

    async getMissingAssets(): Promise<string[]> {
        const rows = await this.db.query(
            `SELECT sa.asset
            FROM snapshot_assets sa
            LEFT JOIN assets a ON a.asset = sa.asset
            WHERE a.asset IS NULL
            GROUP BY sa.asset`,
            { type: QueryTypes.SELECT },
        );

        // @ts-ignore
        return rows.map((row) => row.asset);
    }

    async saveAsset(asset: AssetInterface) {
        await this.db.query(
            'INSERT INTO assets (asset, assetType, name, logoUrl) VALUES ($1, $2, $3, $4) ON DUPLICATE KEY UPDATE name = VALUES(name), logoUrl = VALUES(logoUrl)',
            {
                bind: [
                    asset.asset,
                    asset.assetType,
                    asset.name,
                    asset.logoUrl,
                ],
            },
        );
    }
}
