import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import * as StellarSDK from "stellar-sdk";
import { AccountBalance } from './account-balance';
import { isValidSecretKey, isValidNewBalance, getBalanceforAsset, StellarLumensMinimum } from '../utils';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'; 
import 'rxjs/add/observable/fromPromise'; 


@Injectable()
export class StellarAccountService {

    public _server: any;

    //this.pubKey = "GDGBTSMUSTHKK2E7NBBNQ33Q2XBK4CCYJZZFHKSCDWIWXODQCQU4DJC2";
    constructor(private _http: Http) {
        this._server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        StellarSdk.Network.useTestNetwork();
    }

    getAccountKeys() {
      // let pair: any = StellarSdk.Keypair.random();
      // let stellarKeys: IStellarKeyPair = new IStellarKeyPair();
      // stellarKeys.publicKey = pair.publicKey();
      // stellarKeys.secretKey = pair.secret();
      // return stellarKeys;
    }

    createAccount() : Observable<Response> {
        let apiUrl: string = 'https://horizon-testnet.stellar.org/friendbot';
        let pair = StellarSdk.Keypair.random();
        sessionStorage.setItem("public_key", pair.publicKey()); // GATQTGZDN5GMJLNXQHWRCV4ZMBH4YFZXPACUUL756DIEP2NUGNUNBCHD
        sessionStorage.setItem("seed_key", pair.secret()); // SDYNRKS26KECW72663P6XD7N4SDKH5QERBIKYOTEH2TY25NLKW5QBBHL
        let params = new URLSearchParams();
        params.set('addr', pair.publicKey());
        let options = new RequestOptions({
          params: params
        });  
        return this._http.request(apiUrl, options)
          .map((response: Response) => response.json())
          .catch(this.HandleError);
          //.subscribe(() => { return this.authenticate(pair.secret() }));
    }

    authenticate = (secretKey: string) : Observable<Array<AccountBalance>> => {
        var pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
            sessionStorage.setItem("public_key", pubkey);
            sessionStorage.setItem("seed_key", secretKey);
            return Observable.fromPromise(this._server.loadAccount(pubkey)
                .catch(StellarSdk.NotFoundError, function (error) {
                    throw new Error('The destination account does not exist!');
                })
                .then(account => account))
                .map((r: any) => <Array<AccountBalance>> r.balances)
                .catch(this.HandleError);        
                // .catch(e => Observable.throw(e));
        } else {
            return Observable.throw('That is not a valid secret key');   
        }
    }

    mergeAccountWithKey = (secretKey: string) => {
        var pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
            return this.authenticate(secretKey);
        } else {
            alert("That doesn't seem to be a valid stellar key");
        }
    }

    HandleError(error: Response) {
        //alert(error);
        return Observable.throw(error || 'Server error');
      }
}