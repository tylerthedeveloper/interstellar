import { Injectable  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StellarTermObject, StellarTermAsset } from 'app/stellar/stellar-term/stellar-term.interfaces';
import { Observable } from 'rxjs/Observable';
import { AssetBalance } from 'app/stellar';

// import { Observable } from 'rxjs/Observable';

@Injectable()
export class StellarTermService {

    private _stellarTermURL = 'https://api.stellarterm.com/v1/ticker.json';

    constructor(private _httpClient: HttpClient) {}

    getPriceForAsset(assetType: string) {
        return Observable.create((observer: any) => {
            this._httpClient.get(this._stellarTermURL).subscribe((payload: StellarTermObject) => {
                    const updatedOn = payload._meta.start;
                    const assets = payload.assets as Array<StellarTermAsset>;
                    const assetBalances = new Array<AssetBalance>();
                    for (const asset of assets) {
                        if (assetType === asset.code) {
                            assetBalances.push(new AssetBalance({
                                asset_type: asset.code,
                                coin_name: asset.code, // todO: resolve coin_name
                                balance: String(asset.price_USD)
                            }));
                            observer.next(asset);
                            break;
                        }
                    }
            });
        });
    }

    getPriceForAssets(assetTypes: Set<string>) {
        // return Observable.create((observer: any) => {
            return this._httpClient.get(this._stellarTermURL).map((payload: StellarTermObject) => {
                    const updatedOn = payload._meta.start;
                    const assets = payload.assets as Array<StellarTermAsset>;
                    const assetBalances = new Array<AssetBalance>();
                    for (const asset of assets) {
                        if (assetTypes.has(asset.code) && asset.domain !== 'stronghold.co') {
                            assetBalances.push(new AssetBalance({
                                asset_type: asset.code,
                                coin_name: asset.code, // todO: resolve coin_name
                                balance: String(asset.price_USD)
                            }));
                            // console.log(asset)
                            // observer.next(
                            const curBalance = new AssetBalance({
                                asset_type: asset.code,
                                coin_name: asset.code, // todO: resolve coin_name
                                balance: String(asset.price_USD)
                            });
                        }
                    }
                    return assetBalances;
            });
    }
}
