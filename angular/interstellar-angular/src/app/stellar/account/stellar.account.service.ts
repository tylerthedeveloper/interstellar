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

const enum ErrorMessage {
    InvalidStellarKey = 'That doesn\'t seem to be a valid stellar key',
    StellarKeyNotFound = 'The destination account does not exist!'
}

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
          /*
                    transaction = new TransactionBuilder(source)
            .addOperation(Operation.createAccount({
                    destination: destinationA,
                    startingBalance: "20"
                }) // <- funds and creates destinationA
                .addOperation(Operation.payment({
                    destination: destinationB,
                    amount: "100"
                    asset: Asset.native()
                }) // <- sends 100 XLM to destinationB
            .build();

            transaction.sign(sourceKeypair);

            */
    }

    /**
     * @param  {string} secretKey
     * @returns Observable
     */
    authenticate (secretKey: string): Observable<Array<AssetBalance>> {
        const pubkey = isValidSecretKey(secretKey);
        if (!pubkey) {
            return Observable.throw(ErrorMessage.InvalidStellarKey);
        } else {
            sessionStorage.setItem('public_key', pubkey);
            sessionStorage.setItem('seed_key', secretKey);
            const handleError = this.HandleError;
            return Observable.fromPromise(this._server.loadAccount(pubkey)
                .catch(StellarSdk.NotFoundError, function (error) {
                    throw new Error(ErrorMessage.StellarKeyNotFound + '\n' + error);
                    // throw new Error('The destination account does not exist!: \n' + error);
                })
                .then(account => account))
                .map((r: any) => <Array<AssetBalance>> r.balances)
                .catch(handleError);
                // .catch(e => Observable.throw(e));
        }
    }

    /**
     * @param  {string} secretKey
     */
    // check if key exists
    mergeAccountWithKey (secretKey: string) {
        const pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
            return this.authenticate(secretKey).map(balz => balz); // .catch(e => e)
        //     // console.log('a')
        } else {
        //     console.log('b')
        //     // alert('That doesn\'t seem to be a valid stellar key');
        //     // return Observable.throw('That doesn\'t seem to be a valid stellar key');
            // return Observable.throw('That doesn\'t seem to be a valid stellar key')
            return Observable.create(observer => observer.error(ErrorMessage.InvalidStellarKey));

        // //     // return Observable.of(null)
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────
    //
    checkAccountAlreadyExists (pubKey: string) {
        // const pubkey = isValidSecretKey(secretKey);
        // if (!pubkey) {
        //     return Observable.throw('That is not a valid secret key');
        // } else {
        //     sessionStorage.setItem('public_key', pubkey);
        //     sessionStorage.setItem('seed_key', secretKey);
        //     const handleError = this.HandleError;
        //     return Observable.fromPromise(this._server.loadAccount(pubkey)
        //         .catch(StellarSdk.NotFoundError, function (error) {
        //             throw new Error('The destination account does not exist!: \n' + error);
        //         })
        //         .then(account => account))
        //         .map((r: any) => <Array<AssetBalance>> r.balances)
        //         .catch(handleError);
        //         // .catch(e => Observable.throw(e));
        // }
    }


    HandleError(error: Response) {
        // alert(error);
        return Observable.throw(error || 'Server error');
    }
    // ────────────────────────────────────────────────────────────────────────────────
}
