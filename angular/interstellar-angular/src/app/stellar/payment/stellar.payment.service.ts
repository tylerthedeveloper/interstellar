import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';

import { TransactionPaymentDetails } from 'app/marketplace/_market-models/transaction-group';

@Injectable()
export class StellarPaymentService {

    public _server: any;

    constructor() {
        this._server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        StellarSdk.Network.useTestNetwork();
    }

    /*

        NEED BETTER ERROR HANDLING FOR INSUFFICIENT FUNDS
        THROW REAL ERROR

    */

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @param  {TransactionPaymentDetails} transactionRecord
     */
    sendPayment (transactionRecord: TransactionPaymentDetails) {
        console.log(transactionRecord);
        const secretKey = sessionStorage.getItem('seed_key');
        const pubKey = sessionStorage.getItem('public_key');
        const destinationKey: string = transactionRecord.receiverPublicKey;
        const assets = transactionRecord.assetBalance;
        const memo: string = transactionRecord.memo;
        if (!secretKey) { return; }
        const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
        const server = this._server;
        const handleError = this.HandleError;
        return server.loadAccount(destinationKey)
            .catch(StellarSdk.NotFoundError, function (error) {
                throw new Error('The destination account does not exist!');
            })
            .then(() => server.loadAccount(pubKey))
            .then(function(sourceAccount) {
                const paymentOps = assets.map(asset => {
                        return {
                            destination: destinationKey,
                            asset: StellarSdk.Asset.native(), // TODO: ASSET.ASSET_TYPE
                            amount: asset.balance
                        };
                });
                // const _asset = paymentOps[0];
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
                    // transaction.addMemo(StellarSdk.Memo.text(memo))
                // .build(); //.sign(sourceKeys);
                // transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.
                // return server.submitTransaction(transaction); // And finally, send it off to Stellar!
            })
            // .catch(handleError));
            .catch(function(error) {
                console.log(error);
                // TODO: test below...
                // If the result is unknown (no response body, timeout etc.) we simply resubmit
                // already built transaction:
                // server.submitTransaction(transaction);
                // handleError(error);
                throw error;
                // return error;
            })
            .then(result => result)
            // .catch(handleError));
            .catch(function(error) {
                console.log(error);
                // return error;
                throw error;
                // handleError(error);
            // If the result is unknown (no response body, timeout etc.) we simply resubmit
            // already built transaction:
            // server.submitTransaction(transaction);
            });
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    /**
     * @param  {Response} error
     */
    HandleError(error: Response) {
        // alert(error);
        return Observable.throw(error || 'Server error');
    }
    // ────────────────────────────────────────────────────────────────────────────────



}

// function InsufficientFundsException() {
//     alert('Insufficient funds for that asset.\n' +
//           'Either you don\'t have enough to complete the transaction \n' +
//           'or you will end up below the minimum balance');
// }



