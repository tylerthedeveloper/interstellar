// TODO: CLLEAN UP UNUSED CODE --> anything with step checker
/** Angular */
import { Component, OnInit  } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

/** RxJS and forms */
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CustomValidators } from 'app/shared/forms/form.utils';
import 'rxjs/add/observable/forkJoin';

/** Stellar */
import { isValidSecretKey, AssetBalance, calcTotalsForMultipleAssets,
        calcDifferenceForMultipleAssets, areValidNewBalances,
        StellarPaymentService, StellarAccountService } from 'app/stellar';

/** Services */
import { CartService, OrderService, ProductService } from 'app/core/services';

/** Models */
import { CartItem, Order } from 'app/marketplace/_market-models/';
import { TransactionPaymentDetails, TransactionRecord, TransactionGroup } from 'app/marketplace/_market-models/transaction';

/** UI */
import { MatVerticalStepper } from '@angular/material';

/** Other */
import { stellarKeyLength } from 'app/core/_constants/quantities';
import { BaseComponent } from 'app/base.component';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent extends BaseComponent implements OnInit {

        private checkoutItemsSource: Observable<CartItem[]>;
        private checkoutItems: CartItem[];
        private assetTotals: AssetBalance[];

        private cartItemIDs: string[] = [];
        private sellerIDs: string[] = [];
        private sellerPublicKeys;

        private balances: AssetBalance[];
        private updatedBalances: AssetBalance[];
        private validNewBalances = false;

        private stepChecker: Array<boolean> = [false, false, false, false, false]; // page nav step checking

        private curUserID: string;
        private curPubKey: string;
        private curSeedKey: string;

        private hasItems = false;
        private _transactionRecords: TransactionRecord[];
        private _transactionGroups: TransactionGroup[];

        private _pageError = false;
        // private _productQuantityPairs: Array<any>;
        firstFormGroup: FormGroup;
        secondFormGroup: FormGroup;
        thirdFormGroup: FormGroup;

        constructor(private _cartService: CartService,
                    private _stellarAccountService: StellarAccountService,
                    private _stellarPaymentService: StellarPaymentService,
                    private _orderService: OrderService,
                    private _productService: ProductService,
                    private _formBuilder: FormBuilder,
                    private _router: Router,
                    private location: Location) {
                        super();
                    }

        ngOnInit() {
            this.curUserID = this.myBaseUserID;
            this.curPubKey = this.myBasePublicKey;
            this.curSeedKey = this.myBaseSeedKey;
            this.balances = <Array<AssetBalance>> (JSON.parse(this.myBaseBalances));
            console.log(this.balances);
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
                this.assetTotals = <Array<AssetBalance>> calcTotalsForMultipleAssets(cartPurchaseDetailsArray);
                return arr;
            });

            this.initForm();
            // this.balances = <AssetBalance[]> JSON.parse(sessionStorage.getItem('my_balances') || localStorage.getItem('balances'));
            // https://stackoverflow.com/questions/46710178/material-design-stepper-how-to-remove-disable-steps?rq=1
            // https://stackoverflow.com/questions/47314219/using-separate-components-in-a-linear-mat-horizontal-stepper?rq=1
        }

        //
        // ────────────────────────────────────────────────────────────────────────── I ──────────
        //   :::::: V A L I D A T O R   M E T H O D S : :  :   :    :     :        :          :
        // ────────────────────────────────────────────────────────────────────────────────────
        //
        /**
         * @param  {string} secretKey
         * @param  {MatVerticalStepper} stepper
         */
        validateCheckoutSecretKey(secretKey: string, stepper: MatVerticalStepper) {
            if (!secretKey) {
                alert('Please enter a secret key');
                return;
            }
            if (!(this.curUserID && this.curPubKey && this.curSeedKey &&
                  this.curSeedKey === secretKey &&
                  isValidSecretKey(this.curSeedKey) === this.curPubKey)) {
                    alert('there is missing information or that key is not valid or does not match');
            } else {
                stepper.next();
            }
        }

        /**
         * @param  {number} currentStep
         */
        calculateFundsForPurchase() {
            console.log(this.balances);
            console.log(this.assetTotals);
            const _updatedBalances = calcDifferenceForMultipleAssets(this.balances, this.assetTotals);
            if (!_updatedBalances) {
                return;
            } else {
                this.updatedBalances = _updatedBalances;
            }
        }

        /**
         * @param  {number} currentStep
         */
        // todo: confirm valid balances
        validateFundsForPurchase() {
            if (areValidNewBalances(this.updatedBalances)) {
                // this.stepChecker[3] = true;
                this.validNewBalances = true;
                // return true;
            } else {
                return alert('You don\'t seem to have sufficient funds or \n ' +
                      'the purchase amount goes below the minimum required holding threshold');
            }
        }


        /**
         * @param  {MatVerticalStepper} matStepper
         */
// TODO: --> put all into helper
        completePurchase(matStepper: MatVerticalStepper) {
            // const sellerKeys = this.
            // get user secret key
            // get seller public keys

            // const memo = `Order #: ${checkoutItem.}`;

            // TURN ITEMS INTO TRANSACTIONS
            console.log('b4 trans');
            const transactions = this._transactionRecords = this.makeTransactionRecords();
            console.log('after trans');

            // COMBINE PAYMENTS .... INTO TRANS GROUPS
            console.log('b4 groups');
            const transactionGroups = new Array<TransactionGroup>();
            Array.from(this.sellerPublicKeys).map((key: string) => {
                console.log('in groups');
                const newGroup = new TransactionGroup(key);
                newGroup.transactionGroupID = this._orderService.getNewOrderID();
                transactionGroups.push(newGroup);
            });
            console.log('after groups');

// this.makeTransactionGroups(transactionGroups, transactions);
            // console.log(JSON.stringify(transactionGroups));
            console.log('b4 transloop');
            for (let i = 0; i < transactions.length; i++) {
                console.log('in transloop');
                const transaction = transactions[i];
                const sellerKey = transaction.receiverPublicKey;
                const idx = transactionGroups.findIndex(group => group.sellerPublicKey === sellerKey);
                if (!transactionGroups[idx].transactionRecords) {
                    transactionGroups[idx].transactionRecords = new Array<TransactionRecord>();
                }
                const newListAtIndex = transactionGroups[idx].transactionRecords.concat(transaction);
                transactionGroups[idx].transactionRecords = newListAtIndex;
            }
            console.log('in transloop');
            // console.log(JSON.stringify(transactionGroups));

            // this.fillTransactionGroups(transactionGroups);
            for (let i = 0; i < transactionGroups.length; i++) {
                const transGroup: TransactionGroup = transactionGroups[i];
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
            // this.stepChecker[2] = false;
            // this.stepChecker[3] = false;
            /*
                let result = Promise.resolve();
                for (const transGroup of transactionGroups) {
                    if (this._pageError) { break; }
                    // TODO: onrejceted
                    result = result.then(() => this._stellarPaymentService.sendPayment(transGroup.transactionPaymentDetails)
                                    .catch(e => {
                                        alert(`there has been an error:\n ${e}`);
                                        this._pageError = true;
                                        // console.log(this._pageError);
                                    }));
                }

                // console.log(this._pageError);
                if (!this._pageError) {
                    // TODO: wait for the above
                    this.stepChecker[4] = true;
                    console.log('no erorr');
                    this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal => {
                        sessionStorage.setItem('my_balances', JSON.stringify(bal));
                        console.log(JSON.stringify(bal));
                        console.log(sessionStorage.getItem('my_balances'));
                        matStepper.next();
                        this.proceedToOrderConfirmation();
                        return;
                    });
                }
            }
        */


// FIXME: JOIN PROMISES AND BLOCK THREAD
                // let result = Promise.resolve();
                // const TRANSGROUPNEEDTOCHANGE = transactionGroups[0];
                // const TRANSGROUPNEEDTOChangeFirstRecord = transactionGroups[0].transactionRecords[0];
                // const recordInCheckout = this.checkoutItems.find(item => item.productID === TRANSGROUPNEEDTOChangeFirstRecord.productID);
                // if (recordInCheckout.isPaidFor) {
                //     console.log(recordInCheckout);
            //     return alert(`Error: you have already completed transaction id number: ${TRANSGROUPNEEDTOCHANGE.transactionGroupID}`);
                // }
                // result = result.then(() => this._stellarPaymentService.sendPayment(TRANSGROUPNEEDTOCHANGE.transactionPaymentDetails)
                // .catch(e => {
                //     alert(`there has been an error:\n ${e}`);
                //     this._pageError = true;
                // })
                // .then(() => {
                //     TRANSGROUPNEEDTOCHANGE.isPaidFor = true;
                //     const THISGROUPITEMIDS = TRANSGROUPNEEDTOCHANGE.transactionRecords.map(record => record.transactionID);
                //     console.log(TRANSGROUPNEEDTOCHANGE);
                //         matStepper.next();
                //             this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal => {
                //                 // console.log(JSON.stringify(bal));
                //                 sessionStorage.setItem('my_balances', JSON.stringify(bal));
                //                 // console.log(sessionStorage.getItem('my_balances'));
                //                 this.stepChecker[4] = true;
                //                 // todo:
                //                 this._cartService.batchMarkItemsPaidFor(THISGROUPITEMIDS)
                //                     .catch(error => Observable.of(error))
                //                     .then(() => {
                //                         this.thirdFormGroup.get('thirdCtrlFirst').setValue(true);
                //                         this.proceedToOrderConfirmation();
                //                         return;
                //                     });
                //             });
                //         })
                //         .catch(e => {
                //             alert(`there has been an error:\n ${e}`);
                //             this._pageError = true;
                //         }));
                // const TRANSGROUPNEEDTOCHANGE = transactionGroups[0];
            let transGroupItemIDs = new Array<string>();
            transactionGroups.map(group => {
                // const TRANSGROUPNEEDTOChangeFirstRecord = transactionGroups[0].transactionRecords[0];
                const groupRecord = group.transactionRecords[0];
                // const recordInCheckout = this.checkoutItems.find(item => item.productID === TRANSGROUPNEEDTOChangeFirstRecord.productID);
                const recordInCheckout = this.checkoutItems.find(item => item.productID === groupRecord.productID);
                const curGroupIds = group.transactionRecords.map(record => record.transactionID);
                transGroupItemIDs = transGroupItemIDs.concat(curGroupIds);
                if (recordInCheckout.isPaidFor) {
                    console.log(recordInCheckout);
                    return alert(`Error: you have already completed transaction id number: ${group.transactionGroupID}`);
                }
            });
            let result = Promise.resolve();
            result = result.then(() => this._stellarPaymentService.sendPayment(transactionGroups)
                        .catch(e => {
                            alert(`there has been an error:\n ${e}`);
                            this._pageError = true;
                        })
                        .then(() => {
                            // for (const groupIndex of transactionGroups) {
                            for (let j = 0; j < transactionGroups.length; j++) {
                                transactionGroups[j].isPaidFor = true;
                            }
                        // const THISGROUPITEMIDS = transactionGroups.map(group => transactionRecords.map(record => record.transactionID);
                            // console.log(TRANSGROUPNEEDTOCHANGE);
                                matStepper.next();
                                    this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal => {
                                        // console.log(JSON.stringify(bal));
                                        sessionStorage.setItem('my_balances', JSON.stringify(bal));
                                        // console.log(sessionStorage.getItem('my_balances'));
                                        this.stepChecker[4] = true;
                                        // todo:
                                        this._cartService.batchMarkItemsPaidFor(transGroupItemIDs)
                                            .catch(error => Observable.of(error))
                                            .then(() => {
                                                this.thirdFormGroup.get('thirdCtrlFirst').setValue(true);
                                                this.proceedToOrderConfirmation();
                                                return;
                                            });
                                    });
                                })
                                .catch(e => {
                                    alert(`there has been an error:\n ${e}`);
                                    this._pageError = true;
                                }));

    }


    //
    // ──────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: B U I L D E R   H E L P E R   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────────
    //

    // https://stackblitz.com/edit/angular-1czeuw?file=app%2Fapp.component.html
    initForm(): any {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.compose([
                            Validators.required, // ValidateFormSecretKeyLength, minLength, maxLength
                            CustomValidators.ValidateFormFieldLength(stellarKeyLength)
                            ]),
                            [CustomValidators.ValidateFormFieldMatch(this.curSeedKey)]
                        ]
        });
        this.thirdFormGroup = this._formBuilder.group({
            thirdCtrlFirst: ['', Validators.required, ],
        });
        // this.thirdFormGroup.get('thirdCtrlFirst').disable();
    }

    /**
     * @returns TransactionRecord[]
     */
    makeTransactionRecords(): TransactionRecord[] {
        return this.checkoutItems.map(item => {
                // const newTransID = this._orderService.getNewOrderID();
                return new TransactionRecord(item.cartItemID, item.buyerUserID, item.buyerPublicKey,
                    item.sellerUserID, item.sellerPublicKey, item.assetPurchaseDetails,
                    this.makeTransactionMemo(item.buyerPublicKey, item.sellerPublicKey),
                    item.productID, item.productName, item.productShortDescription,
                    item.quantityPurchased, item.fixedUSDAmount, item.productCategory,
                    item.oldQuantity);
        });
    }


    /**
    // TODO: TOO LONG... WHAT SHOULD GO HERE ... ONLY 28 CHARACTERS
    * @param  {string} buyerPublicKey
    * @param  {string} sellerPublicKey
    * @returns string
    */
    makeTransactionMemo(buyerPublicKey: string, sellerPublicKey: string): string {
        const buyerKey = buyerPublicKey.substr(0, 5);
        const sellerKey = sellerPublicKey.substr(0, 5);
        return `From ${buyerKey}... to ${sellerKey}...`;
    }
    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ────────────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: N A V I G A T I O N   H E L P E R   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns void
     */
    proceedToOrderConfirmation(): void {
        // TODO: PREVENT GOIONG BACK ... PREVENT FORM RESUBMISSION --> ,aybe try promise resolving
        const _productQuantityUpdates = this._transactionRecords.map(record => {
            return {
                    productID: record.productID,
                    sellerID: record.sellerUserID,
                    newQuantity: (record.oldQuantity - record.quantityPurchased),
                    category: record.productCategory
                };
        });
        const _orderID = this._orderService.getNewOrderID();
        const _order = new Order(this.curUserID, _orderID, this._transactionGroups);

// consideration: SUBSEQUENT HANDLING... should this be async???
        const combined = Observable.forkJoin(
            this._orderService.addNewOrder(JSON.stringify(_order)),
            this._orderService.addTransactions(this._transactionRecords),
            this._productService.updateProductQuantities(_productQuantityUpdates).catch(error => Observable.of(error)),
            this._cartService.batchRemoveCartItems(this.cartItemIDs).catch(error => Observable.of(error)),
        );

        combined.subscribe(latestValues => {
            const [ firstObs, secondObs, thirdObs ] = latestValues;
            console.log( 'firstObs' , firstObs);
            console.log( 'secondObs' , secondObs);
            console.log( 'thirdObs' , thirdObs);
        }).add(() => setTimeout(() => this._router.navigate(['../cart/order-history', _orderID]), 2000));

    }

    returnHome(): void {
        this._router.navigate(['home']);
    }

    logout(): void {
    }

    /**
     * @returns void
     */
    returnToCart(): void {
        this.location.back();
    }
    // ────────────────────────────────────────────────────────────────────────────────

    /**
     * @param  {number} currentStep
     * @returns void
     */
    updateStep(currentStep: number): void {
        console.log(currentStep);
        this.stepChecker[currentStep - 1] = true;
    }
    // ─────────────────────────────────────────────────────────────────

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
