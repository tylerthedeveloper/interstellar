// TODO: CLLEAN UP UNUSED CODE

import { Component, OnInit,  } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { isValidSecretKey, AssetBalance, calcTotalsForMultipleAssets,
        calcDifferenceForMultipleAssets, areValidNewBalances,
        StellarPaymentService, StellarAccountService } from 'app/stellar';

import { OrderService } from 'app/core/services/order.service';
import { CartItem } from 'app/marketplace/_market-models/cart-item';
import { CartService } from 'app/core/services/cart.service';
import { Order } from 'app/marketplace/_market-models/order';
import { TransactionPaymentDetails, TransactionRecord, TransactionGroup } from 'app/marketplace/_market-models/transaction-group';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

        // TODO: subscription choice here?
        private checkoutItemsSource: Observable<CartItem[]>;
        private checkoutItems: CartItem[];
        private assetTotals: AssetBalance[];

        private cartItemIDs: string[] = [];
        private sellerIDs: string[] = [];
        private sellerPublicKeys;

        private balances: AssetBalance[] = [];
        private updatedBalances: AssetBalance[] = [];

        private stepChecker: Array<boolean> = [false, false, false, false, false]; // page nav step checking

        private curUserID: string;
        private curPubKey: string;
        private curSeedKey: string;

        private hasItems = false;
        private _transactionGroups: TransactionGroup[];

        private _pageError = false;

        constructor(private _cartService: CartService,
                    private _stellarAccountService: StellarAccountService,
                    private _stellarPaymentService: StellarPaymentService,
                    private _orderService: OrderService,
                    private _router: Router,
                    private location: Location) { }


        ngOnInit() {
            this.curUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
            this.curPubKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
            this.curSeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');

            this.checkoutItemsSource = this._cartService.Cart.map(cartItems => {
                const arr = cartItems.filter(check => check.isInCheckout === true);
                if (!arr || arr.length === 0) {
                    const alertMessage = 'It seems your currently don\'t have items to checkout, returning to cart';
                    if (!this.stepChecker[4]) {
                        alert(alertMessage);
                        this._router.navigate(['../cart']);
                    }
                } else {
                    this.hasItems = true;
                }
                const cartPurchaseDetailsArray = new Array<AssetBalance>();
                this.checkoutItems = arr;
                const _sellerPublicKeys = new Array();
                arr.map(CIT => {
                    this.cartItemIDs.push(CIT.cartItemID);
                    this.sellerIDs.push(CIT.sellerUserID);
                    _sellerPublicKeys.push(CIT.sellerPublicKey);
                    cartPurchaseDetailsArray.push(CIT.assetPurchaseDetails);
                });
                this.sellerPublicKeys = new Set(_sellerPublicKeys);
                this.assetTotals = calcTotalsForMultipleAssets(cartPurchaseDetailsArray);
                return arr;
            });

            this.balances = <AssetBalance[]> JSON.parse(sessionStorage.getItem('my_balances') || localStorage.getItem('balances'));
            console.log(this.balances);
        }

        validateCheckoutSecretKey(secretKey: string, currentStep: number) {

            if (!secretKey) {
                alert('Please enter a secret key');
                return;
            }

            if (!(this.curUserID && this.curPubKey && this.curSeedKey &&
                  this.curSeedKey === secretKey &&
                  isValidSecretKey(this.curSeedKey) === this.curPubKey)) {
                    alert('there is missing information or that key is not valid or does not match');
            } else {
                this.stepChecker[currentStep] = true;
            }
        }

        calculateFundsForPurchase(currentStep: number) {
            const _updatedBalances = calcDifferenceForMultipleAssets(this.balances, this.assetTotals);
            if (!_updatedBalances) {
                return;
            } else {
                this.updatedBalances = _updatedBalances;
                // console.log(_updatedBalances);
                this.stepChecker[currentStep] = true;
            }
        }

        // verify valid new balances...
        validateFundsForPurchase(currentStep: number) {
            // TODO: is step == 3
            console.log(currentStep);
            if (areValidNewBalances(this.updatedBalances)) {
                this.stepChecker[3] = true;
            } else {
                alert('You don\'t seem to have sufficient funds or \n ' +
                'the purchase amount goes below the minimum required holding threshold');
                return;

            }
        }


        completePurchase() {
            // const sellerKeys = this.
            // get user secret key
            // get seller public keys
            // TODO: ITERATE OVER ALL ITEMS ...
            // this.checkoutItems

            // TODO: 'create a memo thingy somewhere... some how...'
            // const memo = `Order #: ${checkoutItem.}`;
            const memo = 'create a memo thingy...';

            // TURN ITEMS INTO TRANSACTIONS
            const transactions = this.makeTransactionRecords();

            // TODO: --> put into helper
            // TODO: test for each by index error
            // COMBINE PAYMENTS .... INTO TRANS GROUPS
            const transactionGroups = new Array<TransactionGroup>();
            Array.from(this.sellerPublicKeys).map((key: string) => {
                console.log(key);
                const newGroup = new TransactionGroup(key);
                newGroup.transactionID = this._orderService.getNewOrderID();
                transactionGroups.push(newGroup);
            });

            // TODO: --> put into helper
            //  /// this.makeTransactionGroups(transactionGroups, transactions);
            console.log(JSON.stringify(transactionGroups));
            for (let i = 0; i < transactions.length; i++) {
                const transaction = transactions[i];
                const sellerKey = transaction.receiverPublicKey;
                const idx = transactionGroups.findIndex(group => group.sellerPublicKey === sellerKey);
                if (!transactionGroups[idx].transactionRecords) {
                    transactionGroups[idx].transactionRecords = new Array<TransactionRecord>();
                }
                const newListAtIndex = transactionGroups[idx].transactionRecords.concat(transaction);
                transactionGroups[idx].transactionRecords = newListAtIndex;
            }
            console.log(JSON.stringify(transactionGroups));


            // TODO: --> put into helper
            // this.fillTransactionGroups(transactionGroups);
            for (let i = 0; i < transactionGroups.length; i++) {
                const transGroup = transactionGroups[i];
                const groupAssetPurchaseDetails = transGroup.transactionRecords.map(trans => trans.assetPurchaseDetails);
                const totalAssetPurchaseDetails = calcTotalsForMultipleAssets(groupAssetPurchaseDetails);
                transGroup.transactionPaymentDetails =
                        new TransactionPaymentDetails(this.curPubKey,
                                                      transGroup.sellerPublicKey,
                                                      totalAssetPurchaseDetails,
                                                      this.makeTransactionMemo(this.curPubKey, transGroup.sellerPublicKey));
            }
            this._transactionGroups = transactionGroups;

            // FIXME: TEST THE BELOW
            // NEED TO BE CAREFUL WITH ASYNC CALL BACKS AND ERROR HANDLING ...
            // NEED TO CONFIRM COMPLETION BEFORE MUTATION OF SUBSEQUENT STEPS
            this.stepChecker[2] = false;
            this.stepChecker[3] = false;

            let result = Promise.resolve();
            // let _error = false;
            for (const transGroup of transactionGroups) {
                if (this._pageError) { break; }
                // TODO: onrejceted
                result = result.then(() => this._stellarPaymentService.sendPayment(transGroup.transactionPaymentDetails)
                                .catch(e => {
                                    alert('tere has been an error');
                                    this._pageError = true;
                                    console.log(this._pageError);
                                }));
            }

            console.log(this._pageError);
            if (!this._pageError) {
                // TODO: wait for the above
                this.stepChecker[4] = true;
                console.log('no erorr');
                this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal =>
                        sessionStorage.setItem('my_balances', JSON.stringify(bal)));
                return;
            }



            // TODO: Review trials below - ssave what is needed
            /*
                NEED TO UPDATE BALANCES
                or just pull from stellar ...
                const newStellarBalances = this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal => {
                        console.log(bal);
                        sessionStorage.setItem('my_balances', JSON.stringify(bal));
                    }
                )

                const combined = Observable.forkJoin(

                const combined = Observable.of([]);
                transactionRecords.map(trans => {
                    setTimeout(combined.pipe(concat(this._stellarPaymentService.sendPayment2(trans))), 5000);
                });
                const subscribe = combined.subscribe(val =>
                    console.log('Example: Basic concat:', val)
                );


                Promise.all(transactionRecords.map(trans => this._stellarPaymentService.sendPayment2(trans)));
                setTimeout(() => this._stellarPaymentService.sendPayment2(transactionRecords[1]), 10000);


                transactionRecords.forEach(trans => {
                    this._stellarPaymentService.sendPayment2(trans).subscribe(
                        res => {
                            // or can try ... EMPTY CART FOR THOSE WHERE CHECKOUT === TRUE
                            this.stepChecker[4] = true;
                        },
                        err => console.log(err)
                    );
                });

                this._stellarPaymentService.sendPayment(transactionRecords).subscribe(
                        res => {
                            // or can try ... EMPTY CART FOR THOSE WHERE CHECKOUT === TRUE
                            this.stepChecker[4] = true;
                        },
                        err => console.log(err)
                    );

                TODO: testing above fix request
                SUBSEQUENT HANDLING... should this be async???
                const combined = Observable.forkJoin(
                    this._stellarPaymentService.sendPayment(transactionRecord).catch(error => Observable.of(error)),
                    this._cartService.batchRemoveCartItems(this.cartItemIDs),
                    this._stellarAccountService.authenticate(this.curSeedKey)
                );

                combined.subscribe(latestValues => {
                    const [ firstObs, secondObs, thirdObs ] = latestValues;
                    console.log( 'firstObs' , firstObs);
                    console.log( 'secondObs' , secondObs);
                    console.log( 'thirdObs' , thirdObs);
                });
            */


        }

        proceedToOrderConfirmation() {
            // TODO: PREVENT GOIONG BACK ....
            // TODO: PREVENT FORM RESUBMISSION

            const _orderID = this._orderService.getNewOrderID();
            const _order = new Order(this.curUserID, _orderID, this._transactionGroups);
            this._orderService.addNewOrder(JSON.stringify(_order));
            this._cartService.batchRemoveCartItems(this.cartItemIDs);
            setTimeout(() => this._router.navigate(['../cart/order-history', _orderID]), 2000);
        }

        makeTransactionRecords() {
            return this.checkoutItems.map(item => {
                    return new TransactionRecord(item.buyerUserID, item.buyerPublicKey, item.sellerUserID,
                        item.sellerPublicKey, item.assetPurchaseDetails,
                        this.makeTransactionMemo(item.buyerPublicKey, item.sellerPublicKey),
                        item.productID, item.productName, 'TODO ADD DESCRIPTION', // TODO: ....
                        item.quantityPurchased, item.fixedUSDAmount);
                    });
        }

        // makeTransactionGroups(transactionGroups: TransactionGroup[], transactionRecords: TransactionRecord[]) {
        //     // console.log(transactionGroups);
        //     transactionRecords.forEach(transaction => {
        //         const sellerKey = transaction.receiverPublicKey;
        //             const transGroupIds = transactionGroups.map(TG => TG.transactionRecords[0].receiverPublicKey);
        //             const idx = transGroupIds.findIndex(ID => ID === sellerKey);
        //             if (idx === -1) {
        //                 console.log(transactionGroups);
        //                 transactionGroups = transactionGroups.concat(new TransactionGroup(new Array<TransactionRecord>(transaction)));
        //                 console.log(transactionGroups);
        //             } else {
        //                 console.log(transactionGroups);
        //                 let newListAtIndex = new Array<TransactionRecord>();
        //                 newListAtIndex = transactionGroups[idx].transactionRecords;
        //                 newListAtIndex = newListAtIndex.concat(transaction);
        //                 transactionGroups[idx].transactionRecords = newListAtIndex;
        //                 console.log(transactionGroups);
        //         }
        //     });
        // }

        // fillTransactionGroups(transactionGroups: TransactionGroup[]) {
        //     for (let transGroup of transactionGroups) {
        //     // transactionGroups.map(transGroup => {
        //         const groupAssetPurchaseDetails = transGroup.transactionRecords.map(trans => trans.assetPurchaseDetails);
        //         const totalAssetPurchaseDetails = calcTotalsForMultipleAssets(groupAssetPurchaseDetails);
        //         transGroup.transactionID = this._orderService.getNewOrderID();
        //         transGroup.transactionPaymentDetails = new Array<TransactionPaymentDetails>();
        //         totalAssetPurchaseDetails.map(purchaseDetails => {
        //             const sellerPublicKey = transGroup.transactionRecords[0].receiverPublicKey;
        //             transGroup.transactionPaymentDetails.push(
        //                     new TransactionPaymentDetails(this.curPubKey,
        //                                                   sellerPublicKey,
        //                                                   purchaseDetails,
        //                                                   this.makeTransactionMemo(this.curPubKey, sellerPublicKey)));
        //         });
        //     }
        // }

        // TODO: TOO LONG... WHAT SHOULD GO HERE ... ONLY 28 CHARACTERS
        makeTransactionMemo(buyerPublicKey: string, sellerPublicKey: string) {
            console.log(buyerPublicKey);
            console.log(buyerPublicKey);
            const buyerKey = buyerPublicKey.substr(0, 5);
            const sellerKey = sellerPublicKey.substr(0, 5);
            return `From ${buyerKey}... to ${sellerKey}...`;
        }

        returnHome(): void {

        }

        logout(): void {

        }

        returnToCart() {
            this.location.back();
        }

        updateStep(currentStep: number) {
            // console.log(currentStep);
            this.stepChecker[currentStep - 1] = true;
            // console.log(this.stepChecker);
        }


}
