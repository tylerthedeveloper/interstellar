export class AssetBalance {
    balance: string;
    asset_type: string;
    coin_name: string;

    constructor(obj?: {
                balance?: string,
                asset_type?: string,
                coin_name?: string}) {
                    this.balance = (obj.balance) ? obj.balance : '';
                    this.asset_type = (obj.asset_type) ? obj.asset_type : '';
                    this.coin_name = (obj.coin_name) ? obj.coin_name : '';
    }

}
