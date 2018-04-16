//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 *  1 - NEED TO TEST MERGE
 *  2 - NEED TO SWITCH TO REAL NETWORK
 *  3 - NEED TO TEST ON REAL NETWORK
 * *** NEED TO USE COOKIE CACHING - LOCAL DOESNT WORK
 */
//


import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';

// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';


import * as StellarSDK from 'stellar-sdk';
import { AssetBalance } from '..';
import { isValidSecretKey } from 'app/stellar/stellar.utils';

declare var StellarSdk: any;

@Injectable()
export class StellarAccountService {

    public _server: any;

    // this.pubKey = "GDGBTSMUSTHKK2E7NBBNQ33Q2XBK4CCYJZZFHKSCDWIWXODQCQU4DJC2";
    constructor(private _http: Http) {
        StellarSdk.Network.useTestNetwork();
        this._server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    createAccount(): Observable<Response> {
        const apiUrl = 'https://horizon-testnet.stellar.org/friendbot';
        const pair = StellarSdk.Keypair.random();
        sessionStorage.setItem('public_key', pair.publicKey()); // GATQTGZDN5GMJLNXQHWRCV4ZMBH4YFZXPACUUL756DIEP2NUGNUNBCHD
        sessionStorage.setItem('seed_key', pair.secret()); // SDYNRKS26KECW72663P6XD7N4SDKH5QERBIKYOTEH2TY25NLKW5QBBHL
        const params = new URLSearchParams();
        params.set('addr', pair.publicKey());
        const options = new RequestOptions({
          params: params
        });
        return this._http.get(apiUrl, options)
          .map((response: Response) => response.json())
          .catch(this.HandleError);
          // .subscribe(() => { return this.authenticate(pair.secret() }));
    }

    /**
     * @param  {string} secretKey
     * @returns Observable
     */
    authenticate (secretKey: string): Observable<Array<AssetBalance>> {
        const pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
            sessionStorage.setItem('public_key', pubkey);
            sessionStorage.setItem('seed_key', secretKey);
            return Observable.fromPromise(this._server.loadAccount(pubkey)
                .catch(StellarSdk.NotFoundError, function (error) {
                    throw new Error('The destination account does not exist!');
                })
                .then(account => account))
                .map((r: any) => <Array<AssetBalance>> r.balances)
                .catch(this.HandleError);
                // .catch(e => Observable.throw(e));
        } else {
            return Observable.throw('That is not a valid secret key');
        }
    }

    /**
     * @param  {string} secretKey
     */
    mergeAccountWithKey (secretKey: string) {
        const pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
            return this.authenticate(secretKey);
        } else {
            alert('That doesn\'t seem to be a valid stellar key');
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────
    //
    HandleError(error: Response) {
        // alert(error);
        return Observable.throw(error || 'Server error');
    }
    // ────────────────────────────────────────────────────────────────────────────────

}
