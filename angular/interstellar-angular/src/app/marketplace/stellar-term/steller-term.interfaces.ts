export interface StellarTermObject {
    _meta: any;
    assets: Array<any>;
    pairs: Array<any>;
}

export interface StellarTermAsset {
    activityScore: number;
    code: string;
    domain: string;
    id: string;
    issuer: string;
    price_USD: number;
    price_XLM: number;
    slug: string;
    volume24h_USD: number;
    volume24h_XLM: number;
    website: string;
}
