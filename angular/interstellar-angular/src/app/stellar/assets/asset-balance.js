"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var asset_1 = require("./asset");
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
var AssetBalance = /** @class */ (function (_super) {
    __extends(AssetBalance, _super);
    function AssetBalance(obj) {
        var _this = _super.call(this, obj.asset_type, obj.coin_name) || this;
        _this.balance = (obj.balance) ? obj.balance : '';
        return _this;
        // this.asset_type = (obj.asset_type) ? obj.asset_type : '';
        // this.coin_name = (obj.coin_name) ? obj.coin_name : '';
    }
    return AssetBalance;
}(asset_1.Asset));
exports.AssetBalance = AssetBalance;
