export class Asset {
    asset_type: string;
    amount: string;

    constructor(asset_type: string,
                amount: string) {
                this.asset_type = asset_type;
                this.amount = amount;
    }

}
