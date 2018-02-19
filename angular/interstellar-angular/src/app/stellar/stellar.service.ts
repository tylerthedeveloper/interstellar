import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import * as StellarSDK from "stellar-sdk";
import { AccountBalance } from './account/account-balance';
import { isValidSecretKey, isValidNewBalance, getBalanceforAsset, StellarLumensMinimum } from './utils';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'; 
import 'rxjs/add/observable/fromPromise'; 

// import {Observable} from 'rxjs/Rx';

// -> import {forEach} from '@angular/router/src/utils/collection';

@Injectable()
export class StellarService {

    public _server: any;

    public _pubKey: string = "";
    public _privKey: string= ""; //SESSION MAMNAGEMENT
    // public balanceAmt: number;
    // public balanceAssetType: string;

    constructor(private _http: Http) {
      this._server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      StellarSdk.Network.useTestNetwork();
      //this.pubKey = "GDGBTSMUSTHKK2E7NBBNQ33Q2XBK4CCYJZZFHKSCDWIWXODQCQU4DJC2";
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
        return this._http.request(apiUrl, options)
          .map((response: Response) => response.json())
          .catch(this.HandleError);
    }

    authenticate = (secretKey: string) : Observable<Array<AccountBalance>> => {
        var pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
            sessionStorage.setItem("public_key", pubkey);
            sessionStorage.setItem("seed_key", secretKey);
            this._pubKey = pubkey;
            this._privKey = secretKey;        
            return Observable.fromPromise(this._server.loadAccount(pubkey)
                .catch(StellarSdk.NotFoundError, function (error) {
                    throw new Error('The destination account does not exist!');
                })
                .then(account => account))
                .map((r: any) => <Array<AccountBalance>> r.balances)
                .catch(this.HandleError);        
        }
    }


    /*

        NEED BETTER ERROR HANDLING FOR INSUFFICIENT FUNDS
        THROW REAL ERROR

    */
    sendPayment = (destinationKey: string, assetType: string, amount: string, memo: string) : Observable<Response> => {
          if (!this._privKey) return;
          let pubkey = this._pubKey;
          var sourceKeys = StellarSdk.Keypair.fromSecret(this._privKey);
          var server = this._server;
          var transaction;
          var handleError = this.HandleError;
          return Observable.fromPromise(server.loadAccount(destinationKey)
              .catch(StellarSdk.NotFoundError, function (error) {
                  throw new Error('The destination account does not exist!');
              })
              .then(() => server.loadAccount(pubkey))
              .then(function(sourceAccount) {
                    let curBal = getBalanceforAsset(sourceAccount.balances, assetType);
                    if (!(curBal !== -1 && isValidNewBalance(curBal, amount))) throw new InsufficientFundsException();
                    transaction = new StellarSdk.TransactionBuilder(sourceAccount) // Start building the transaction.
                        .addOperation(StellarSdk.Operation.payment({
                            destination: destinationKey,
                            asset: StellarSdk.Asset.native(),
                            /*


                              map to right asset


                            */
                            amount: amount
                        }))
                      .addMemo(StellarSdk.Memo.text(memo))
                      .build();
                    transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.
                    return server.submitTransaction(transaction); // And finally, send it off to Stellar!
              })
              .catch(function(error) {
                // handleError(error);
                // return error;
                throw error;
              // If the result is unknown (no response body, timeout etc.) we simply resubmit
              // already built transaction:
              // server.submitTransaction(transaction);
              })
              .then(result => result)
              // .catch(handleError));
              .catch(function(error) {
                  // handleError(error);
                  // return error;
                  throw error;
                // If the result is unknown (no response body, timeout etc.) we simply resubmit
                // already built transaction:
                // server.submitTransaction(transaction);
              }));
      }

    HandleError(error: Response) {
      //alert(error);
      return Observable.throw(error || 'Server error');
    }
}

function InsufficientFundsException() {
    alert("Insufficient funds for that asset.\n" + 
          "Either you don't have enough to complete the transaction \n" + 
          "or you will end up below the minimum balance");
}
