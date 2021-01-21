export interface AssetInterface {
    asset: string;
    assetType: string;
    name: string;
    logoUrl: string;
}

export class Asset implements AssetInterface {
    asset: string;

    assetType: string;

    name: string;

    logoUrl: string;
}
