import { Component, OnInit,  } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

import { isValidSecretKey, AssetBalance, calcTotalsForMultipleAssets,
        calcDifferenceForMultipleAssets, areValidNewBalances,
        StellarPaymentService, TransactionRecord, StellarAccountService } from 'app/stellar';

import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../_market-models/cart-item';
import { OrderService } from '../../../core/services/order.service';


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
        // private isValidSecretKey: boolean;

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
                        // setTimeout(() => {}, 5000);
                        alert(alertMessage);
                        this._router.navigate(['../cart']);
                    }
                } else {
                    this.hasItems = true;
                }
                const cartPurchaseDetailsArray = new Array<AssetBalance>();
                this.checkoutItems = cartItems;
                arr.map(CIT => {
                    this.cartItemIDs.push(CIT.cartItemID);
                    this.sellerIDs.push(CIT.sellerUserID);
                    this.sellerPublicKeys.push(CIT.sellerPublicKey);
                    cartPurchaseDetailsArray.push(CIT.assetPurchaseDetails);
                });
                // console.log(this.cartItemIDs);
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
            // console.log(this.assetTotals);
            // console.log(this.cartItemIDs);
            // console.log(this.sellerIDs);
            // console.log(this.sellerPublicKeys);

            // const sellerKeys = this.
            // get user secret key
            // get seller public keys
            // TODO: ITERATE OVER ALL ITEMS ...
            const checkoutItem = this.checkoutItems[0];

            // TODO: 'create a memo thingy somewhere... some how...'
            // const memo = `Order #: ${checkoutItem.}`;
            const memo = 'create a memo thingy...';

            const transactionRecord = new TransactionRecord (checkoutItem.buyerPublicKey,
                                                             checkoutItem.sellerPublicKey,
                                                             checkoutItem.assetPurchaseDetails,
                                                             memo);



            // NEED TO UPDATE BALANCES
            // or just pull from stellar ...
            // const newStellarBalances = this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal => {
            //         console.log(bal);
            //         sessionStorage.setItem('my_balances', JSON.stringify(bal));
            //     }
            // )

            // FIXME: TEST THE BELOW
            // NEED TO BE CAREFUL WITH ASYNC CALL BACKS AND ERROR HANDLING ...
            // nEED TO CONFIRM COMPLETION BEFORE MUTATION OF SUBSEQUENT STEPS
            this._stellarPaymentService.sendPayment(transactionRecord).subscribe(
                res => {
                    // or can try ... EMPTY CART FOR THOSE WHERE CHECKOUT === TRUE
                    this.stepChecker[3] = false;
                    this.stepChecker[4] = true;
                    this._cartService.batchRemoveCartItems(this.cartItemIDs);
                    this._stellarAccountService.authenticate(this.curSeedKey).subscribe(bal =>
                                    sessionStorage.setItem('my_balances', JSON.stringify(bal)));
                },
                err => console.log(err)
            );

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

            const id = 'NEWID247894765';
            setTimeout(this._router.navigate(['../cart/checkout/order-confirmation', id]), 1000);
        }

        returnHome(): void {

        }

        logout(): void {

        }

        returnToCart() {
            this.location.back();
        }

        updateStep(currentStep: number) {
            console.log(currentStep);
            this.stepChecker[currentStep - 1] = true;
            console.log(this.stepChecker);
        }


}
