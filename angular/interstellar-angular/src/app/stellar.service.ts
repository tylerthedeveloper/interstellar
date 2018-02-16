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
  public pubKey: string = "GATRXWFRWECASFKW47MZJR4FOYH46Q6WRY5KWNRPVJM6WB7OL4VOD34N";
  private privKey: string;

  constructor(private _http: Http) {
    this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    StellarSdk.Network.useTestNetwork();
  }

  getAccountKeys() {
    // let pair: any = StellarSdk.Keypair.random();
    // let stellarKeys: IStellarKeyPair = new IStellarKeyPair();
    // stellarKeys.publicKey = pair.publicKey();
    // stellarKeys.secretKey = pair.secret();
    // return stellarKeys;
  }

  createAccount(): Observable<Response> {
      let apiUrl: string = 'https://horizon-testnet.stellar.org/friendbot';
      let pair = StellarSdk.Keypair.random();
      this.pubKey = pair.publicKey();
      this.privKey = pair.secret();
      alert(pair.secret()); // SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
      alert(pair.publicKey()); // GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB

      let params = new URLSearchParams();
      params.set('addr', pair.publicKey());
      return this._http.get(apiUrl, new RequestOptions({ params: params }))
        .map((response: Response) => response.json())
        .catch(this.HandleError);
    }

    checkBalance() : void { 
      alert(this.pubKey);
      this.server.loadAccount(this.pubKey).then(function(error, response, body) {
        if (error || response.statusCode !== 200) {
          console.error('ERROR!', error || body);
        }      
        alert('Balances for account: ' + this.pubKey);
        body.balances.forEach(function(balance) {
          alert('Type:' + balance.asset_type +  ', Balance:' + balance.balance);
        });
      });
      
    }

    HandleError(error: Response) {
      console.log(error);
      return Observable.throw(error.json().error || 'Server error');
    }

}
