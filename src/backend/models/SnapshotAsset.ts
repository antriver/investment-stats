export interface SnapshotAsset {
    id: number;
    snapshotId: number;
    service: string;
    asset: string;
    amount: string;
    usdPrice: number;
    usdValue: number;
    gbpPrice: number;
    gbpValue: number;

    gbpProfit?: number;

    percentageProfit?: number;

    name?: string;
    logoUrl?: string;
}
