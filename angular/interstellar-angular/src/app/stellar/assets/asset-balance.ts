// TODO: add to asset balance
// const currencyAssetsMapper = {
//     'native' : 'Lumens',
//     'tycoin' : 'TyCoins'
// };

export class AssetBalance {
    balance: string;
    asset_type: string;

    constructor(balance: string,
                asset_type: string) {
                    this.balance = balance;
                    this.asset_type = asset_type;
    }

}
