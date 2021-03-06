import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Observable } from 'rxjs/Observable';
import { TransactionGroup } from 'app/marketplace/_market-models/transaction';

// import * as StellarSdk from 'stellar-sdk';
declare var StellarSdk: any;

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
    // sendPayment (transactionRecord: TransactionPaymentDetails) {
    //     console.log(transactionRecord);
    //     const secretKey = sessionStorage.getItem('seed_key');
    //     const pubKey = sessionStorage.getItem('public_key');
    //     const destinationKey: string = transactionRecord.receiverPublicKey;
    //     const assets = transactionRecord.assetBalance;
    //     const memo: string = transactionRecord.memo;
    //     if (!secretKey) { return; }
    //     const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
    //     const server = this._server;
    //     const handleError = this.HandleError;
    //     return server.loadAccount(destinationKey)
    //         .catch(StellarSdk.NotFoundError, function (error) {
    //             throw new Error('The destination account does not exist!');
    //         })
    //         .then(() => server.loadAccount(pubKey))
    //         .then(function(sourceAccount) {
    //             // const paymentOps = assets.map(asset => {
    //             //         return {
    //             //             destination: destinationKey,
    //             //             asset: StellarSdk.Asset.native(), // TODO: ASSET.ASSET_TYPE
    //             //             amount: asset.balance
    //             //         };
    //             // });
    //             // paymentOps.map(payOP => {
    //             //     console.log(payOP);
    //             //     const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
    //             //             .addOperation(StellarSdk.Operation.payment(payOP))
    //             //             .build();
    //             //             transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.

    //             // });

    //             const _asset = assets[0];
    //             console.log(_asset);
    //             const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
    //                 .addOperation(StellarSdk.Operation.payment({
    //                     destination: destinationKey,
    //                     asset: StellarSdk.Asset.native(), // todo: switch to above asset type...
    //                     memo: memo,
    //                     amount: _asset.balance
    //                 }))
    //             .build();
    //             // .sign(sourceKeys);
    //             transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.

    //             // assets.map(asset =>
    //                 // transaction.addOperation(StellarSdk.Operation.payment({
    //                 // .addOperation(StellarSdk.Operation.payment({
    //                 //     destination: destinationKey,
    //                 //     asset: StellarSdk.Asset.native(),
    //                 //       /*


    //                 //                 map to CORRECT asset


    //                 //             */
    //                 //    amount: _asset.amount
    //                 // }))
    //                 // transaction.addMemo(StellarSdk.Memo.text(memo))
    //             // .build(); //.sign(sourceKeys);
    //             // transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.
    //             return server.submitTransaction(transaction); // And finally, send it off to Stellar!
    //         })
    //         // .catch(handleError));
    //         .catch(function(error) {
    //             console.log(error);
    //             // TODO: test below...
    //             // If the result is unknown (no response body, timeout etc.) we simply resubmit
    //             // already built transaction:
    //             // server.submitTransaction(transaction);
    //             // handleError(error);
    //             throw error;
    //             // return error;
    //         })
    //         // .then(result => {
    //         //     throw Error;
    //         // })
    //         .then(result => result)
    //         // .catch(handleError));
    //         .catch(function(error) {
    //             console.log(error);
    //             // return error;
    //             throw error;
    //             // handleError(error);
    //         // If the result is unknown (no response body, timeout etc.) we simply resubmit
    //         // already built transaction:
    //         // server.submitTransaction(transaction);
    //         });
    // }
    sendPayment (transactionGroups: TransactionGroup[]) {
        // console.log(transactionRecord);
        const secretKey = sessionStorage.getItem('seed_key');
        const pubKey = sessionStorage.getItem('public_key');
        // const destinationKey: string = transactionRecord.receiverPublicKey;
        // const assets = transactionRecord.assetBalance;
        // const memo: string = transactionRecord.memo;
        if (!secretKey) { return; }
        const sourceKeys = StellarSdk.Keypair.fromSecret(secretKey);
        const server = this._server;
        // const handleError = this.HandleError;
        return server.loadAccount(pubKey)
            // server.loadAccount(destinationKey)
            // .catch(StellarSdk.NotFoundError, function (error) {
            //     throw new Error('The destination account does not exist!');
            // })
            // .then(() => server.loadAccount(pubKey))
            .then(function(sourceAccount) {
                // console.log(sourceAccount);
                /*
                todo:

                const paymentOps = transactionGroups.map(group => {
                    return {
                        destination: group.sellerPublicKey,
                        asset: StellarSdk.Asset.native(), // todo: switch to above asset type...
                        memo: group.transactionPaymentDetails.memo,
                        amount: group.transactionPaymentDetails.assetBalance[0].balance
                    };
                });
                // // assets.map(asset =>
                // // transaction.addOperation(StellarSdk.Operation.payment({
                //     // .addOperation(StellarSdk.Operation.payment({
                //         //     destination: destinationKey,
                //         //     asset: StellarSdk.Asset.native(),
                //         //    amount: _asset.amount
                //         // }))
                // // paymentOps.map(payOp => transactionBuilder.addOperation(StellarSdk.Operation.payment(payOp)));
                // transactionBuilder.build();
                const transaction = new StellarSdk.TransactionBuilder(sourceAccount);
                paymentOps.map(payOp => transaction.addOperation(StellarSdk.Operation.payment(payOp)));
                transaction.addOperation(StellarSdk.Operation.setOptions({
                        // Reset account back to what it was before this transaction
                        lowThreshold: 1,
                        medThreshold: 1,
                        highThreshold: 1,
                        signer: {
                                ed25519PublicKey: pubKey,
                                weight: 0
                            }
                        }));
                // .addOperation(StellarSdk.Operation.payment({
                //     destination: transactionGroups[0].transactionPaymentDetails.receiverPublicKey,
                //     asset: StellarSdk.Asset.native(), // todo: switch to above asset type...
                //     // memo: memo,
                //     amount: transactionGroups[0].transactionPaymentDetails.assetBalance[0].balance
                // }))
                transaction.build();
                // .sign(sourceKeys);
                // transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.
                */

                // console.log(transactionBuilder.toEnvelope().toXDR('base64'));

                // paymentOps.map(payOP => {
                //     console.log(payOP);
                //     const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                //             .addOperation(StellarSdk.Operation.payment(payOP))
                //             .build();
                //             transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.

                // });

                const group = transactionGroups[0];
                console.log(group.transactionPaymentDetails)
                console.log(group.transactionPaymentDetails.assetBalance[0])
                console.log(group.transactionPaymentDetails.assetBalance[0].balance)
                const transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                    .addOperation(StellarSdk.Operation.payment({
                         destination: group.sellerPublicKey,
                        asset: StellarSdk.Asset.native(), // todo: switch to above asset type...
                        memo: group.transactionPaymentDetails.memo,
                        amount: group.transactionPaymentDetails.assetBalance[0].balance
                    }))
                .build();
    //             // .sign(sourceKeys);
                transaction.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.

                // transactionBuilder.build(); // .sign(sourceKeys);
                // transactionBuilder.sign(sourceKeys); // Sign the transaction to prove you are actually the person sending it.
                // return server.submitTransaction(transactionBuilder); // And finally, send it off to Stellar!
                return server.submitTransaction(transaction);
                    // .then(function(transactionResult) {
                    // console.log(JSON.stringify(transactionResult, null, 2));
                    // console.log('\nSuccess! View the transaction at: ');
                    // console.log(transactionResult._links.transaction.href);
                    // })
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
            })
            .then(result => result)
            // .catch(handleError));
            .catch(function(error) {
                console.log(error);
                // handleError(error);
                throw error;
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



