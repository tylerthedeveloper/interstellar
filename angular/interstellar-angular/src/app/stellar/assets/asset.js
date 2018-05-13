"use strict";
exports.__esModule = true;
var Asset = /** @class */ (function () {
    // constructor(obj?: {
    //             asset_type?: string,
    //             coin_name?: string}) {
    //                 this.asset_type = (obj.asset_type) ? obj.asset_type : '';
    //                 this.coin_name = (obj.coin_name) ? obj.coin_name : '';
    // }
    function Asset(asset_type, coin_name) {
        this.asset_type = (asset_type) ? asset_type : '';
        this.coin_name = (coin_name) ? coin_name : '';
    }
    return Asset;
}());
exports.Asset = Asset;
