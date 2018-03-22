import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../_market-models/cart-item';
import { ISubscription } from 'rxjs/Subscription';
import { Asset } from 'app/stellar';
import { calcTotalsForMultipleAssets } from '../../../stellar/utils';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    // TODO: subscription choice here?
        // Why does async fetch first item after batch empty delete
    private subscription: ISubscription;
    private cartItemsSource: CartItem[];
    private assetTotals: Asset[];
    // private cartItemsSource: Observable<CartItem[]>;

    constructor(private _cartService: CartService,
                private _router: Router) { }

    ngOnInit() {
        // this.cartItemsSource = this._cartService.getCurrentCart().map(c => c);
        this.assetTotals = [];
        this.subscription = this._cartService.getCurrentCart().subscribe(cartItems => {
                this.cartItemsSource = cartItems;
                this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
                console.log(this.assetTotals.length);
        });
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    proceedToCheckout() {

        // UPDATE CART ITEM
        // ADD IF IS IN CHECKOUT
        // FOR EACH ... ALLOW CHECKBOXES ... UPDATE
        // GET ALL FOR EACH ON CHECKOUT IF IN CHECKOIUT


        this._router.navigate(['/cart/checkout']);
    }

    navigateToAllProducts() {
        this._router.navigate(['/products']);
    }

    emptyOutCart() {
        this.cartItemsSource.forEach(item => this._cartService.removeCartItem(item.cartItemID));
        this.subscription.unsubscribe();
        this.cartItemsSource = [];
    }

    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    onCartItemAction(data: string) {
        const obj = JSON.parse(data);
        const action = obj.action;
        const cartItem = obj.payload;
        const cartItemID = cartItem.cartItemID;
        let newCartItemData = '';
        if (obj.newData) {
            newCartItemData = obj.newData;
        }

        switch (action) {
            case 'purchase':
                console.log(obj);
                this.updateAddToCheckout(cartItemID);
                this.proceedToCheckout();
                break;
            case 'edit':
                console.log('ed');
                this._cartService.updateCartItem(cartItem, newCartItemData);
                break;
            case 'remove':
                console.log('rem');
                console.log(cartItem);
                this._cartService.removeCartItem(cartItem.cartItemID);
                this.cartItemsSource = this.cartItemsSource.filter(item => item.cartItemID !== cartItem.cartItemID);
                break;
            default:
                return;
        }
    }

    updateAddToCheckout(cartItemID: string) {
        this._cartService.addToCheckout(cartItemID);
    }
}
