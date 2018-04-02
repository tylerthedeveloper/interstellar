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
import { concat } from 'rxjs/operators';
import { TransactionPaymentDetails, TransactionRecord, TransactionGroup } from 'app/marketplace/_market-models/transaction-group';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

        // TODO: subscription choice here?
        // Why does async fetch first item after batch empty delete
        // private checkoutItemsSource: CartItem[];
        private checkoutItemsSource: Observable<CartItem[]>;
        private checkoutItems: CartItem[];
        private assetTotals: AssetBalance[];

        private cartItemIDs: string[] = [];
        private sellerIDs: string[] = [];
        private sellerPublicKeys: string[] = [];

        private balances: AssetBalance[] = [];
        private updatedBalances: AssetBalance[] = [];

        private hasItems = false;
        private stepChecker: Array<boolean> = [false, false, false, false, false]; // page nav step checking

        private curSeedKey: string;

        constructor(private _cartService: CartService,
                    private _stellarAccountService: StellarAccountService,
                    private _stellarPaymentService: StellarPaymentService,
                    private _orderService: OrderService,
                    private _router: Router,
                    private location: Location) { }


        ngOnInit() {
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
                arr.map(CIT => {
                    this.cartItemIDs.push(CIT.cartItemID);
                    this.sellerIDs.push(CIT.sellerUserID);
                    this.sellerPublicKeys.push(CIT.sellerPublicKey);
                    cartPurchaseDetailsArray.push(CIT.assetPurchaseDetails);
                });
                console.log(this.checkoutItems);
                // console.log(this.sellerIDs);
                // console.log(this.sellerPublicKeys);
                // this.cartItemIDs = arr.map(CIT => CIT.cartItemID);
                // this.sellerPublicKeys = arr.map(CIT => CIT.sellerPublicKey);
                // this.sellerIDs = arr.map(CIT => CIT.sellerPublicKey);
                this.assetTotals = calcTotalsForMultipleAssets(cartPurchaseDetailsArray);
                // this.assetTotals = calcTotalsForMultipleAssets(arr.map(CIT => CIT.assetPurchaseDetails));
                return arr;
            });

            // this.assetTotals = [];
            // this.cartItemsSource = this._cartService.getCurrentCart().map(c => c);
            // this._cartService.getCurrentCart().subscribe(cartItems => {
            //         this.checkoutItemsSource = cartItems.filter(CIT => CIT.isInCheckout === true);
            //         this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
            //         console.log(this.checkoutItemsSource);
            // });
            this.balances = <AssetBalance[]> JSON.parse(sessionStorage.getItem('my_balances') || localStorage.getItem('balances'));
            console.log(this.balances);
        }

        validateCheckoutSecretKey(secretKey: string, currentStep: number) {

            if (!secretKey) {
                alert('Please enter a secret key');
                return;
            }
            const curUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
            const curPubKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
            // const curSeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');

            if (!(curUserID && curPubKey && this.curSeedKey &&
                  this.curSeedKey === secretKey &&
                  isValidSecretKey(this.curSeedKey) === curPubKey)) {
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
                // console.log(_updatedBalances);
                this.updatedBalances = _updatedBalances;
                // console.log(this.stepChecker);
                this.stepChecker[currentStep] = true;
                // console.log(this.stepChecker);
            }
        }

        // verify valid new balances...
        validateFundsForPurchase(currentStep: number) {
            if (areValidNewBalances(this.updatedBalances)) {
                this.stepChecker[3] = true;
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
            const transactions = this.checkoutItems.map(item => {
                return new TransactionRecord(
                    item.buyerUserID,
                    item.buyerPublicKey,
                    item.sellerUserID,
                    item.sellerPublicKey,
                    item.assetPurchaseDetails,
                    this.makeTransactionMemo(item.buyerPublicKey, item.sellerPublicKey),
                    item.productID,
                    item.productName,
                    'TODO ADD DESCRIPTION', // TODO: ....
                    item.quantityPurchased,
                    item.fixedUSDAmount);
                });

            // TODO: --> COMBINE PAYMENTS .... INTO TRANS GROUPS
            const transactionGroups = new Array<TransactionGroup>();
            let transactionGroups2 = new Array<TransactionGroup>();
            const firstTransaction = new Array(transactions.pop());
            const firstGroup = new TransactionGroup(firstTransaction);
            transactionGroups2.push(firstGroup);
            console.log(transactionGroups2);            
            transactions.forEach(transaction => {
                const sellerKey = transaction.receiverPublicKey;
                // if (transactionGroups2.length === 0) {
                //     transactionGroups2 = transactionGroups2.concat(transactionGroups2,
                //                                                     new TransactionGroup(new Array<TransactionRecord>(transaction)));
                //     console.log(transactionGroups2);
                // } else {
                    const transGroupIds = transactionGroups2.map(TG => TG.transactionRecords[0].receiverPublicKey);
                    const idx = transGroupIds.findIndex(ID => ID === sellerKey);
                    if (idx) {
                        transactionGroups2 = transactionGroups2.concat(new TransactionGroup(new Array<TransactionRecord>(transaction)));
                    } else {
                        let newListAtIndex = new Array<TransactionRecord>();
                        newListAtIndex = transactionGroups2[idx].transactionRecords;
                        newListAtIndex = newListAtIndex.concat(transaction);
                        transactionGroups2[idx].transactionRecords = newListAtIndex;
                        console.log(transactionGroups2);
                    }
                    // transactionGroups2.map((TG, index) => {
                    //     const isThisGroup = TG.transactionRecords[0].receiverPublicKey === sellerKey;
                    //     const isNotThisItem = TG.transactionRecords.findIndex(trans => trans.productID === transaction.productID);
                    //     console.log(isThisGroup)
                    //     console.log(isNotThisItem)
                    //     if (isThisGroup && (isNotThisItem === -1)) {
                    //         console.log(isThisGroup)
                    //         console.log(isNotThisItem)
                            // let newListAtIndex = new Array<TransactionRecord>();
                            // newListAtIndex = transactionGroups2[index].transactionRecords;
                            // newListAtIndex = newListAtIndex.concat(transaction);
                            // transactionGroups2[index].transactionRecords = newListAtIndex;
                            // console.log(transactionGroups2);
                    //     } else if (isNotThisItem === -1) {
                    //         console.log('else ');
                    //         transactionGroups2 = transactionGroups2.concat(new TransactionGroup(new Array<TransactionRecord>(transaction)));
                    //         console.log(transactionGroups2);                            
                    //     }
                    // });
                // }
                });
            console.log(transactionGroups2);

            /*
             transactions.forEach(transaction => {
                const sellerKey = transaction.receiverPublicKey;
                if (transactionGroups2.length === 0) {
                    transactionGroups2 = new Array(new TransactionGroup(new Array<TransactionRecord>(transaction)));
                    console.log(transactionGroups2);
                } else {
                    transactionGroups2.map((TG, index) => {
                        const idx = TG.transactionRecords.findIndex(TR => TR.receiverPublicKey === sellerKey);
                        if (idx) {
                            let newListAtIndex = new Array<TransactionRecord>();
                            newListAtIndex = transactionGroups2[index].transactionRecords;
                            newListAtIndex.push(transaction);
                            transactionGroups2[index].transactionRecords = newListAtIndex;
                            console.log(idx)
                            console.log(transactionGroups2);
                        } else {
                            transactionGroups2 = transactionGroups2.concat(new TransactionGroup(new Array<TransactionRecord>(transaction)));
                            console.log(transactionGroups2);
                        }
                    });
                }
                });
            */


            const transactionPaymentDetails = this.checkoutItems.map(item => {
                return new TransactionPaymentDetails(item.sellerPublicKey,
                                                     item.assetPurchaseDetails,
                                                     this.makeTransactionMemo(item.buyerPublicKey, item.sellerPublicKey));
            });



            // FIXME: TEST THE BELOW
            // NEED TO BE CAREFUL WITH ASYNC CALL BACKS AND ERROR HANDLING ...
            // nEED TO CONFIRM COMPLETION BEFORE MUTATION OF SUBSEQUENT STEPS
            this.stepChecker[2] = false;
            this.stepChecker[3] = false;

            let result = Promise.resolve();
            transactionPaymentDetails.forEach(task => {
                result = result.then(() => this._stellarPaymentService.sendPayment(task));
            });

            this.stepChecker[4] = true;

            this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal =>
                sessionStorage.setItem('my_balances', JSON.stringify(bal)));

                       // NEED TO UPDATE BALANCES
            // or just pull from stellar ...
            // const newStellarBalances = this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal => {
            //         console.log(bal);
            //         sessionStorage.setItem('my_balances', JSON.stringify(bal));
            //     }
            // )

            // const combined = Observable.forkJoin(

            // const combined = Observable.of([]);
            // transactionRecords.map(trans => {
            //     setTimeout(combined.pipe(concat(this._stellarPaymentService.sendPayment2(trans))), 5000);
            // });
            // const subscribe = combined.subscribe(val =>
            //     console.log('Example: Basic concat:', val)
            // );


            // Promise.all(transactionRecords.map(trans => this._stellarPaymentService.sendPayment2(trans)));
            // setTimeout(() => this._stellarPaymentService.sendPayment2(transactionRecords[1]), 10000);


            // transactionRecords.forEach(trans => {
            //     this._stellarPaymentService.sendPayment2(trans).subscribe(
            //         res => {
            //             // or can try ... EMPTY CART FOR THOSE WHERE CHECKOUT === TRUE
            //             this.stepChecker[4] = true;
            //         },
            //         err => console.log(err)
            //     );
            // });

            // this._stellarPaymentService.sendPayment(transactionRecords).subscribe(
            //         res => {
            //             // or can try ... EMPTY CART FOR THOSE WHERE CHECKOUT === TRUE
            //             this.stepChecker[4] = true;
            //         },
            //         err => console.log(err)
            //     );

            // TODO: testing above fix request
            // SUBSEQUENT HANDLING... should this be async???
            // const combined = Observable.forkJoin(
            //     this._stellarPaymentService.sendPayment(transactionRecord).catch(error => Observable.of(error)),
            //     this._cartService.batchRemoveCartItems(this.cartItemIDs),
            //     this._stellarAccountService.authenticate(this.curSeedKey)
            // );

            //   combined.subscribe(latestValues => {
            //       const [ firstObs, secondObs, thirdObs ] = latestValues;
            //       console.log( 'firstObs' , firstObs);
            //       console.log( 'secondObs' , secondObs);
            //       console.log( 'thirdObs' , thirdObs);
            //   });


        }

        proceedToOrderConfirmation() {
            // TODO: CREATE NEW ID FROM ORDER SERICE MAYBE????
            // TODO: PREVENT GOIONG BACK ....
            // TODO: PREVENT FORM RESUBMISSION

            // FOR ALL ITEMS...
            const TEMPITEM = this.checkoutItems[0];

            // const _order = new Order(this._transactionRecord,
            //                          TEMPITEM.productID,
            //                          TEMPITEM.productName,
            //                          TEMPITEM.quantityPurchased,
            //                          TEMPITEM.assetPurchaseDetails);

            // const _orderID = this._orderService.getNewOrderID();
            // _order.orderID = _orderID;
            // this._orderService.addNewOrder(JSON.stringify(_order));
            // this._cartService.batchRemoveCartItems(this.cartItemIDs);
            // setTimeout(() => this._router.navigate(['../cart/checkout/order-confirmation', _orderID]), 2000);
        }

          // TODO: TOO LONG... WHAT SHOULD GO HERE ... ONLY 28 CHARACTERS
        makeTransactionMemo(buyerPublicKey: string, sellerPublicKey: string) {
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
