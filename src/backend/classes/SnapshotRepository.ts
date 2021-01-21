import { QueryTypes, Sequelize } from 'sequelize';
import { Snapshot } from '../models/Snapshot';
import { SnapshotAsset } from '../models/SnapshotAsset';

export class SnapshotRepository {
    constructor(private db: Sequelize) {
    }

    async getLatestSnapshot(): Promise<Snapshot> {
        const snapshots = await this.db.query(
            'SELECT * FROM snapshots order by id desc limit 1',
            { type: QueryTypes.SELECT },
        );
        // @ts-ignore
        return snapshots[0];
    }

    async getSnapshotAssets(snapshotId: number): Promise<SnapshotAsset[]> {
        return this.db.query(
            `SELECT sa.*, a.name
             FROM snapshot_assets sa
             LEFT JOIN assets a ON a.asset = sa.asset
             WHERE sa.snapshotId = $1`,
            {
                type: QueryTypes.SELECT,
                bind: [
                    snapshotId
                ]
            },
        );
    }
}
