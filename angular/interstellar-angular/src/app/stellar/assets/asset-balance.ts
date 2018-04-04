export class AssetBalance {
    balance: string;
    asset_type: string;
    coin_name: string;

    constructor(balance: string,
                asset_type: string,
                coin_name: string) {
                    this.balance = balance;
                    this.asset_type = asset_type;
                    this.coin_name = coin_name;
    }

}
