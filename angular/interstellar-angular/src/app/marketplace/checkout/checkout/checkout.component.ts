import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../_market-models/cart-item';
import { Router } from '@angular/router';
import { Asset } from 'app/stellar';
import { calcTotalsForMultipleAssets } from '../../../stellar/utils';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

       // TODO: subscription choice here?
        // Why does async fetch first item after batch empty delete
        private cartItemsSource: CartItem[];
        private assetTotals: Asset[];
        private isValidSecretKey: boolean;
        // private cartItemsSource: Observable<CartItem[]>;

        @Input() CartItem: any;
        constructor(private _cartService: CartService,
                    private _router: Router) { }

        ngOnInit() {
            console.log(this.CartItem);
            // this.cartItemsSource = this._cartService.getCurrentCart().map(c => c);
            this.assetTotals = [];
            this._cartService.getCurrentCart().subscribe(cartItems => {
                    this.cartItemsSource = cartItems.filter(CIT => CIT.isInCheckout === true);
                    this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
                    console.log(this.cartItemsSource);
            });
        }

        validateCheckoutSecretKey(secretKey: string) {
            console.log(secretKey);


            // chec kfrom stellar. ....
            // check matcghes current public key ....
            // check maktches current secret key ....

            if (secretKey) {
                this.isValidSecretKey = true;
            }
        }


}
