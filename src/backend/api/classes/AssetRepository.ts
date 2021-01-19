import { QueryTypes, Sequelize } from 'sequelize';
import { Asset } from '../models/Asset';

export class AssetRepository {
    constructor(private db: Sequelize) {
    }

    async getCurrentAssets(): Promise<Asset[]> {
        return this.db.query(
            'SELECT * FROM current_assets',
            { type: QueryTypes.SELECT },
        );
        //return this.db.query(
        //    `SELECT
        //         asset,
        //         sum(amount) as totalAmount,
        //         sum(gbpPaid) as totalGbpPaid
        //     FROM asset_transactions
        //     GROUP BY
        //         asset
        //     HAVING totalAmount > 0`,
        //    { type: QueryTypes.SELECT },
        //);
    }
}
