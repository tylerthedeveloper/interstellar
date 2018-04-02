import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';
import * as StellarSDK from 'stellar-sdk';

import { isValidSecretKey, isValidNewBalance, getBalanceforAsset, StellarLumensMinimum } from '../utils';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';
import { AssetBalance } from 'app/stellar';
import { TransactionPaymentDetails } from 'app/marketplace/_market-models/transaction-group';

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
    sendPayment (transactionRecord: TransactionPaymentDetails) {
        console.log(transactionRecord);
        const secretKey = sessionStorage.getItem('seed_key');
        const pubKey = sessionStorage.getItem('public_key');
        const destinationKey: string = transactionRecord.receiverPublicKey;

        const assets = transactionRecord.assetBalance;

        // const asset_type: string = transactionRecord.assetBalance.asset_type;
        // const amount: string = transactionRecord.assetBalance.balance;

        const memo: string = transactionRecord.memo;
        if (!secretKey) { return; }
        const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
        const server = this._server;
        // let transaction: any;
        const handleError = this.HandleError;
        return server.loadAccount(destinationKey)
            .catch(StellarSdk.NotFoundError, function (error) {
                throw new Error('The destination account does not exist!');
            })
            .then(() => server.loadAccount(pubKey))
            .then(function(sourceAccount) {
                // const curBal = getBalanceforAsset(sourceAccount.balances, assetType);
                // if (!(curBal !== -1 && isValidNewBalance(curBal, amount))) { throw new InsufficientFundsException(); }
                
                var paymentOps = assets.map(asset => {
                        return {
                            destination: destinationKey,
                            asset: StellarSdk.Asset.native(), // TODO: ASSET.ASSET_TYPE
                            amount: asset.balance
                        }
                });
                const _asset = paymentOps[0];
                // const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                paymentOps.map(payOP => {
                    const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                            .addOperation(StellarSdk.Operation.payment(payOP))
                            .build();
                            transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.

                });


                // assets.map(asset => 
                    // transaction.addOperation(StellarSdk.Operation.payment({
                    // .addOperation(StellarSdk.Operation.payment({
                    //     destination: destinationKey,
                    //     asset: StellarSdk.Asset.native(), // TODO: ASSET.ASSET_TYPE
                    //       /*


                    //                 map to CORRECT asset


                    //             */
                    //    amount: _asset.amount
                    // }))
                    // transaction.addOperation(StellarSdk.Operation.setOptions({
                    //     // Reset account back to what it was before this transaction
                    //     // lowThreshold: 1,
                    //     // medThreshold: 1,
                    //     // highThreshold: 1,
                    //     signer: {
                    //       ed25519PublicKey: pubKey,
                    //       weight: 1,
                    //     },
                    //   }))
                    // transaction.addMemo(StellarSdk.Memo.text(memo))
                // .build(); //.sign(sourceKeys);
                // transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.
                // return server.submitTransaction(transaction); // And finally, send it off to Stellar!
            })
            .catch(function(error) {
            // handleError(error);
            // return error;
            console.log(error);
            throw error;
            // If the result is unknown (no response body, timeout etc.) we simply resubmit
            // already built transaction:
            // server.submitTransaction(transaction);
            })
            .then(result => result)
            // .then(result => { throw Error; } )
            // .catch(handleError));
            .catch(function(error) {
                // handleError(error);
                // return error;
                console.log(error);
                throw error;
            // If the result is unknown (no response body, timeout etc.) we simply resubmit
            // already built transaction:
            // server.submitTransaction(transaction);
            });
    }

        // sendPayment (destinationKey: string, assetType: string, amount: string, memo: string): Observable<Response> {
/*
        sendPayment (transactionRecords: TransactionRecord[]): Observable<any> {
            console.log(transactionRecords);
            const secretKey = sessionStorage.getItem('seed_key');
            const pubKey = sessionStorage.getItem('public_key');
            return Observable.of(transactionRecords.map(transactionRecord => {
                const destinationKey: string = transactionRecord.receiverPublicKey;
                const amount: string = transactionRecord.assetBalance.balance;
                const memo: string = transactionRecord.memo;
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
                        // const curBal = getBalanceforAsset(sourceAccount.balances, assetType);
                        // if (!(curBal !== -1 && isValidNewBalance(curBal, amount))) { throw new InsufficientFundsException(); }
                        // * Start building the transaction * //
                        transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                            .addOperation(StellarSdk.Operation.payment({
                                destination: destinationKey,
                                asset: StellarSdk.Asset.native(),
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
                    console.log(error);
                    throw error;
                    // If the result is unknown (no response body, timeout etc.) we simply resubmit
                    // already built transaction:
                    // server.submitTransaction(transaction);
                    })
                    .then(result => result)
                    // .then(result => { throw Error; } )
                    // .catch(handleError));
                    .catch(function(error) {
                        // handleError(error);
                        // return error;
                        console.log(error);
                        throw error;
                    // If the result is unknown (no response body, timeout etc.) we simply resubmit
                    // already built transaction:
                    // server.submitTransaction(transaction);
                    }));
                }));
        }
*/

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



