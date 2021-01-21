export interface SnapshotAsset {
    id: number;
    snapshotId: number;
    service: string;
    asset: string;
    assetName?: string;
    amount: string;
    gbpValue: number;
    gbpProfit: number;
    percentageProfit?: number;
}
