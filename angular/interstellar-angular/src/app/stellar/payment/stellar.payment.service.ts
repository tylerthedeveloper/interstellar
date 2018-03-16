import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import * as StellarSDK from 'stellar-sdk';
import { AccountBalance } from '../account/account-balance';
import { isValidSecretKey, isValidNewBalance, getBalanceforAsset, StellarLumensMinimum } from '../utils';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';


@Injectable()
export class StellarPaymentService {

    public _server: any;

    constructor(private _http: Http) {
        this._server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        StellarSdk.Network.useTestNetwork();
    }

    /*

        NEED BETTER ERROR HANDLING FOR INSUFFICIENT FUNDS
        THROW REAL ERROR

    */
    sendPayment = (destinationKey: string, assetType: string, amount: string, memo: string) : Observable<Response> => {
        const secretKey = sessionStorage.getItem('seed_key');
        const pubKey = sessionStorage.getItem('public_key');
        if (!secretKey) { return; }
        const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
        const server = this._server;
        let transaction: any;
        const handleError = this.HandleError;
        return Observable.fromPromise(server.loadAccount(destinationKey)
            .catch(StellarSdk.NotFoundError, function (error) {
                throw new Error('The destination account does not exist!');
            })
            .then(() => server.loadAccount(pubKey))
            .then(function(sourceAccount) {
                const curBal = getBalanceforAsset(sourceAccount.balances, assetType);
                if (!(curBal !== -1 && isValidNewBalance(curBal, amount))) { throw new InsufficientFundsException(); }
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
      // alert(error);
      return Observable.throw(error || 'Server error');
    }
}

function InsufficientFundsException() {
    alert('Insufficient funds for that asset.\n' +
          'Either you don\'t have enough to complete the transaction \n' +
          'or you will end up below the minimum balance');
}
