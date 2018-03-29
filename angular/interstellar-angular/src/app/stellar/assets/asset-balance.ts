export class AssetBalance {
    asset_type: string;
    balance: string;

    constructor(asset_type: string,
                balance: string) {
                this.asset_type = asset_type;
                this.balance = balance;
    }

}
