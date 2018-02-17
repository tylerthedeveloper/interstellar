import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import * as StellarSDK from "stellar-sdk";

// --> import {IStellarKeyPair} from './stellar-key-pair';

// -> import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
// --> import {AccountBalance} from '../../account/account-balance/account-balance.model';
// -> import {forEach} from '@angular/router/src/utils/collection';


@Injectable()
export class StellarService {

  public server: any;
  public pubKey: string;
  private privKey: string;

  constructor(private _http: Http) {
    this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    StellarSdk.Network.useTestNetwork();
    this.pubKey = "GDGBTSMUSTHKK2E7NBBNQ33Q2XBK4CCYJZZFHKSCDWIWXODQCQU4DJC2";
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
      this.pubKey = pair.publicKey();
      this.privKey = pair.secret();
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

    checkBalance() : void { 
      if (this.pubKey) {
        // alert(this.pubKey);
        let pubkey = this.pubKey;
        this.server.loadAccount(pubkey).then(function(account) {
          // if (error || response.statusCode !== 200) {
          //   console.error('ERROR!', error || body);
          // }      
          alert('Balances for account: ' + pubkey);
          account.balances.forEach(function(balance) {
            alert('Type:' + balance.asset_type +  ', Balance:' + balance.balance);
          });
        }); 
      }
      else {
        alert("null balanve");
      }
    }

    HandleError(error: Response) {
      alert(error);
      return Observable.throw(error.json().error || 'Server error');
    }

}
