import { Component, OnInit,  } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../_market-models/cart-item';
import { isValidSecretKey, AssetBalance, calcTotalsForMultipleAssets, calcDifferenceForMultipleAssets } from 'app/stellar';
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
        private cartItemIDs: string[];    
        private balances: AssetBalance[];
        private updatedBalances: AssetBalance[];

        private stepChecker: Array<boolean> = [false, false, false]; // page nav step checking 
        // private isValidSecretKey: boolean;

        constructor(private _cartService: CartService,
                    private location: Location) { }
                    // private _router: Router

        ngOnInit() {
            this.checkoutItemsSource = this._cartService.Cart.map(cartItems => {
                const arr = cartItems.filter(check => check.isInCheckout === true);
                this.cartItemIDs = arr.map(CIT => CIT.cartItemID);
                this.assetTotals = calcTotalsForMultipleAssets(arr.map(CIT => CIT.assetPurchaseDetails));
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

        // completePurchase() {
        //     this.checkoutItemsSource.forEach(item => {

        //     })
        // }

        validateCheckoutSecretKey(secretKey: string, currentStep: number) {

            if (!secretKey) {
                alert('Please enter a secret key');
                return;
            }
            const curUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
            const curPubKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
            const curSeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');
            if (!(curUserID && curPubKey && curSeedKey) && 
                  curSeedKey === secretKey && 
                  isValidSecretKey(curSeedKey) === curPubKey) {
                    alert('there is missing information or that key is not valid or does not match');
            } else {
                this.stepChecker[currentStep] = true;
            }
        }

        validateFundsForPurchase(currentStep: number) {
            // console.log(secretKey);
            // console.log(currentStep);

            // TODO: Get rid of ACcount Balance --> use Asset or Account Balance
            
            // const tempArrDoChange = this.balances.map(bal => new Asset(bal.asset_type, bal.balance));
            console.log(this.balances);
            console.log(this.assetTotals);
            
            const _updatedBalances = calcDifferenceForMultipleAssets(this.balances, this.assetTotals);
            console.log(_updatedBalances);
            this.stepChecker[currentStep] = true;


            // // chec kfrom stellar. ....
            // // check matcghes current public key ....
            // // check maktches current secret key ....
            // const curUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
            // const curPubKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
            // const curSeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');
            // if (!(curUserID && curPubKey && curSeedKey && curSeedKey === secretKey)) {
            //                     alert('fals');
            // } else {
            //     // this.isValidSecretKey = true;
            //     this.updateStep(currentStep);
            // }
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
