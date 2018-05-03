import { Asset } from './asset';

// export class AssetBalance {
//     balance: string;
//     asset_type: string;
//     coin_name: string;

//     constructor(obj?: {
//                 balance?: string,
//                 asset_type?: string,
//                 coin_name?: string}) {
//                     this.balance = (obj.balance) ? obj.balance : '';
//                     this.asset_type = (obj.asset_type) ? obj.asset_type : '';
//                     this.coin_name = (obj.coin_name) ? obj.coin_name : '';
//     }

// }

export class AssetBalance extends Asset {
    balance: string;
    asset_type: string;
    coin_name: string;

        constructor(obj?: {
                balance?: string,
                asset_type?: string,
                coin_name?: string}) {
                    super(obj.asset_type, obj.coin_name);
                    this.balance = (obj.balance) ? obj.balance : '';
                    // this.asset_type = (obj.asset_type) ? obj.asset_type : '';
                    // this.coin_name = (obj.coin_name) ? obj.coin_name : '';
    }
    // constructor(balance: string,
    //             asset_type: string,
    //             coin_name: string) {
    //                 super(asset_type, coin_name);
    //                 this.balance = (balance) ? balance : '';
    // }

}
