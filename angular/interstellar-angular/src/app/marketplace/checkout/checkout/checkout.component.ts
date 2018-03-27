import { Component, OnInit,  } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../_market-models/cart-item';
import { Router } from '@angular/router';
import { Asset, isValidSecretKey, AccountBalance } from 'app/stellar';
import { calcTotalsForMultipleAssets } from '../../../stellar/utils';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

       // TODO: subscription choice here?
        // Why does async fetch first item after batch empty delete
        // private cartItemsSource: Observable<CartItem[]>;
        private checkoutItemsSource: CartItem[];
        private assetTotals: Asset[];
        private stepChecker: Array<boolean> = [false, false, false];
        private balances: AccountBalance[];
        private updatedBalances: AccountBalance[];
        // private isValidSecretKey: boolean;

        constructor(private _cartService: CartService,
                    private location: Location) { }
                    // private _router: Router

        ngOnInit() {
            // this.cartItemsSource = this._cartService.getCurrentCart().map(c => c);
            this.assetTotals = [];
            this._cartService.getCurrentCart().subscribe(cartItems => {
                    this.checkoutItemsSource = cartItems.filter(CIT => CIT.isInCheckout === true);
                    this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
                    console.log(this.checkoutItemsSource);
            });
            this.balances = <AccountBalance[]> JSON.parse(sessionStorage.getItem('my_balances') || localStorage.getItem('balances'));
            console.log(this.balances);
        }

        // completePurchase() {
        //     this.checkoutItemsSource.forEach(item => {

        //     })
        // }

        validateCheckoutSecretKey(secretKey: string, currentStep: number) {

            // TODO: check from stellar. ....
            // check matcghes current public key ....
            // check maktches current secret key ....
            const curUserID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
            const curPubKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
            const curSeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');
            if (!(curUserID && curPubKey && curSeedKey && curSeedKey === secretKey && isValidSecretKey(curSeedKey) === curPubKey)) {
                alert('fals');
            } else {
                this.stepChecker[currentStep] = true;
            }
        }

        validateFundsForPurchase(secretKey: string, currentStep: number) {
            console.log(secretKey);
            console.log(currentStep);
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
