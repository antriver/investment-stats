export interface SnapshotAsset {
    id: number;
    snapshotId: number;
    service: string;
    asset: string;
    name?: string;
    logoUrl?: string;
    amount: string;
    gbpValue: number;
    gbpProfit: number;
    percentageProfit?: number;
}
