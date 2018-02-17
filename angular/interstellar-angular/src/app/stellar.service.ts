import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import * as StellarSDK from "stellar-sdk";

// --> import {IStellarKeyPair} from './stellar-key-pair';

// -> import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//--> import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';

// --> import {AccountBalance} from '../../account/account-balance/account-balance.model';
// -> import {forEach} from '@angular/router/src/utils/collection';

export class AccountBalance {
  asset_type: string;
  balance: string;
}

const isValidSecretKey = (secretKey : string) : string => {
  try {
      return StellarSdk.Keypair.fromSecret(secretKey).publicKey();
  } catch (e) {
      //alert("Account does not exist or key is invalid: \n " + e);
      return;
  }
}

export {isValidSecretKey}

@Injectable()
export class StellarService {

    public server: any;

    public _pubKey: string = "";
    public _privKey: string= ""; //SESSION MAMNAGEMENT
    public balanceAmt: number;
    public balanceAssetType: string;

    constructor(private _http: Http) {
      this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      StellarSdk.Network.useTestNetwork();
      //this.pubKey = "GDGBTSMUSTHKK2E7NBBNQ33Q2XBK4CCYJZZFHKSCDWIWXODQCQU4DJC2";
      this.balanceAmt = 0;
      this.balanceAssetType = "none";
    }

    getAccountKeys() {
      // let pair: any = StellarSdk.Keypair.random();
      // let stellarKeys: IStellarKeyPair = new IStellarKeyPair();
      // stellarKeys.publicKey = pair.publicKey();
      // stellarKeys.secretKey = pair.secret();
      // return stellarKeys;
    }

    createAccount() { // : Observable<Response>
      let apiUrl: string = 'https://horizon-testnet.stellar.org/friendbot';
      let pair = StellarSdk.Keypair.random();
      this._pubKey = pair.publicKey();
      this._privKey = pair.secret();
      alert(pair.secret()); // SDYNRKS26KECW72663P6XD7N4SDKH5QERBIKYOTEH2TY25NLKW5QBBHL
      alert(pair.publicKey()); // GATQTGZDN5GMJLNXQHWRCV4ZMBH4YFZXPACUUL756DIEP2NUGNUNBCHD

      let params = new URLSearchParams();
      params.set('addr', pair.pubKey);
      let options = new RequestOptions({
        params: params
      });  
      //return this._http.request()
      return this._http.request(apiUrl, options)
        .map((response: Response) => response.json())
        .catch(this.HandleError);
    }

    

    

    authenticate = (secretKey : string) : boolean => {
        let pubkey = isValidSecretKey(secretKey); 
        if (!pubkey) return false;
        this._privKey = secretKey;
        this._pubKey = pubkey;
        this.server.loadAccount(pubkey).then(function(account) {
          alert('Balances for account: ' + pubkey);
          account.balances.forEach(function(balance) {
            alert('Type:' + balance.asset_type +  ', Balance:' + balance.balance);
          });
        });
    }


    getBalance(secretKey: string) : Observable<Array<AccountBalance>> {
        var pubkey = isValidSecretKey(secretKey); 
        if (pubkey) {
            return Observable.fromPromise(this.server.loadAccount(pubkey)
              .then(function (account) {
                return account;
              }))
              .map((r: any) => <Array<AccountBalance>> r.balances)
              .catch(this.HandleError);        
        }
    }

    HandleError(error: Response) {
      alert(error);
      return Observable.throw(error.json().error || 'Server error');
    }

}
