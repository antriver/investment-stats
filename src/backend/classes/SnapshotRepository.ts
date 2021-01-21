import { QueryTypes, Sequelize } from 'sequelize';
import { Snapshot } from '../models/Snapshot';
import { SnapshotAsset } from '../models/SnapshotAsset';

export class SnapshotRepository {
    constructor(private db: Sequelize) {
    }

    async get(id: any): Promise<Snapshot> {
        const snapshots = await this.db.query(
            'SELECT * FROM snapshots where id = $1 limit 1',
            {
                type: QueryTypes.SELECT,
                bind: [
                    parseInt(id),
                ],
            },
        );
        // @ts-ignore
        return snapshots[0];
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
                `SELECT
                     sa.*,
                     a.name,
                     a.logoUrl
                 FROM
                     snapshot_assets sa
                     LEFT JOIN assets a ON a.asset = sa.asset
                 WHERE
                     sa.snapshotId = $1`,
            {
                type: QueryTypes.SELECT,
                bind: [
                    snapshotId,
                ],
            },
        );
    }

    async getSnapshots(): Promise<Snapshot[]> {
        return this.db.query(
                `SELECT *
                 FROM snapshots
                 ORDER BY
                     id DESC`,
            {
                type: QueryTypes.SELECT,

            },
        );
    }
}
