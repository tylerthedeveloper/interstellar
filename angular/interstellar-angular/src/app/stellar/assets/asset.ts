export class Asset {
    asset_type: string;
    coin_name: string;

    // constructor(obj?: {
    //             asset_type?: string,
    //             coin_name?: string}) {
    //                 this.asset_type = (obj.asset_type) ? obj.asset_type : '';
    //                 this.coin_name = (obj.coin_name) ? obj.coin_name : '';
    // }
    constructor(asset_type: string,
                coin_name: string) {
                this.asset_type = (asset_type) ? asset_type : '';
                this.coin_name = (coin_name) ? coin_name : '';
    }

}
