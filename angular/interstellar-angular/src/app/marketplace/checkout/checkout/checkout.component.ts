import { Component, OnInit,  } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../_market-models/cart-item';
import { isValidSecretKey, AssetBalance, calcTotalsForMultipleAssets, 
        calcDifferenceForMultipleAssets, areValidNewBalances } from 'app/stellar';
import { Observable } from 'rxjs/Observable';

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
        private assetTotals: AssetBalance[];

        private cartItemIDs: string[] = [];
        private sellerIDs: string[] = [];
        private sellerPublicKeys: string[] = [];

        private balances: AssetBalance[] = [];
        private updatedBalances: AssetBalance[] = [];

        private stepChecker: Array<boolean> = [false, false, false, false]; // page nav step checking 
        // private isValidSecretKey: boolean;

        constructor(private _cartService: CartService,
                    private location: Location) { }
                    // private _router: Router

        ngOnInit() {
            this.checkoutItemsSource = this._cartService.Cart.map(cartItems => {
                const arr = cartItems.filter(check => check.isInCheckout === true);
                const cartPurchaseDetailsArray = new Array<AssetBalance>();
                arr.map(CIT => {
                    this.cartItemIDs.push(CIT.cartItemID);
                    this.sellerIDs.push(CIT.sellerUserID);
                    this.sellerPublicKeys.push(CIT.sellerPublicKey);
                    cartPurchaseDetailsArray.push(CIT.assetPurchaseDetails);
                });
                console.log(this.cartItemIDs);
                console.log(this.sellerIDs);
                console.log(this.sellerPublicKeys);
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
            const curSeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');
            if (!(curUserID && curPubKey && curSeedKey && 
                  curSeedKey === secretKey && 
                  isValidSecretKey(curSeedKey) === curPubKey)) {
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
                console.log(_updatedBalances);
                this.updatedBalances = _updatedBalances;
                console.log(this.stepChecker);            
                this.stepChecker[currentStep] = true;
                console.log(this.stepChecker);
            }
        }
        
        // verify valid new balances...
        validateFundsForPurchase(currentStep: number) {
            console.log(currentStep);
            console.log(this.updatedBalances);            
            if (areValidNewBalances(this.updatedBalances)) {
                console.log(this.stepChecker);            
                this.stepChecker[3] = true;
                console.log(this.stepChecker);
            }
        }

        completePurchase() { 
            console.log(this.assetTotals);
            console.log(this.cartItemIDs);
            console.log(this.sellerIDs);
            console.log(this.sellerPublicKeys);

            // const sellerKeys = this.
            // get user secret key
            // get seller public keys 
            // for each seller -> make payment in batch


            // completePurchase() {
                //     this.checkoutItemsSource.forEach(item => {

                //     })
                // }
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
