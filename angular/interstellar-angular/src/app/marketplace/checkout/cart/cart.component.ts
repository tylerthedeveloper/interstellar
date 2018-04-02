// TODO: do we need to display totals...
    // if so --> do we need to subscribe to cart?


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../_market-models/cart-item';
import { AssetBalance, calcTotalsForMultipleAssets } from 'app/stellar';

// import { calcTotalsForMultipleAssets } from '../../../stellar/utils';


import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    // private cartItemsSource: CartItem[];
    private cartItemsSource: Observable<CartItem[]>;
    private cartItemIDs: string[];
    private assetTotals: AssetBalance[];
    _userID = sessionStorage.getItem('user_doc_id');

    constructor(private _cartService: CartService,
                private _router: Router) {}

    ngOnInit() {
        // this._cartService.Cart.subscribe(cartItems => {
            // this.cartItemsSource = cartItems;
            // console.log(cartItems);
        this.cartItemsSource = this._cartService.Cart.map(cartItems => {
            this.cartItemIDs = cartItems.map((c: CartItem) => c.cartItemID);
            // console.log(cartItems.map(CIT => CIT.assetPurchaseDetails));
            // console.log(calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails)));
            this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
            return cartItems;
        });

        // this.cartItemIDs = this.cartItemsSource.map((c: CartItem) => c.cartItemID)
        // this.recalculateTotals();
        // this.assetTotals = this._cartService.getCartAssetTotals();

        // TODO: ASSET TOTALS.... HOW AND WHERE???
        // this._cartService.getCurrentCart().valueChanges().subscribe(cartItems => {
        //         this.cartItemsSource = cartItems;
        //         this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
        // });
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    // recalculateTotals() {
    //     // this.assetTotals = this._cartService.getCartAssetTotals()
    //     // const currentAssets: Asset[] = this._cartService.getCartAssetTotals();
    //     // const updatedAssets = calcTotalsForMultipleAssets(currentAssets);
    //     this._cartService.getCartAssetTotals()
    //                      .subscribe(curAssets => this.assetTotals = Observable.of(calcTotalsForMultipleAssets(curAssets)));
    //     // this.assetTotals = updatedAssets;
    // }

    proceedToCheckout() {
        // TODO: ....
        // UPDATE CART ITEM
        // ADD IF IS IN CHECKOUT
        // FOR EACH ... ALLOW CHECKBOXES ... UPDATE
        // GET ALL FOR EACH ON CHECKOUT IF IN CHECKOIUT
        // this.assetTotals = Observable.of(this._cartService.getCartAssetTotals2());
        // console.log(this.cartItemIDs);
        this.updateAddToCheckout(this.cartItemIDs);
        // this._router.navigate(['/cart/checkout']);
    }

    navigateToAllProducts() {
        this._router.navigate(['/products']);
    }

    emptyOutCart() {
        this._cartService.emptyCart();
    }

    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    onCartItemAction(data: string) {
        const obj = JSON.parse(data);
        const action = obj.action;
        const _cartItem = obj.payload;
        const _cartItemID = _cartItem.cartItemID;
        let newCartItemData = '';
        if (obj.newData) {
            newCartItemData = obj.newData;
        }

        switch (action) {
            case 'purchase':
                // console.log(obj);
                this.updateAddToCheckout(new Array<string>(_cartItemID));
                break;
            case 'edit':
                console.log('ed');
                this._cartService.updateCartItem(_cartItem, newCartItemData);
                break;
            case 'remove':
                console.log('rem');
                this._cartService.removeCartItem(_cartItemID);
                // this.recalculateTotals();
                // TODO: this if check does not work because cant verify empty observable ... might not nmatter!!!
                //
                // if (!this.cartItemsSource) {
                //     this.afs.collection('user-cart').doc(this._userID).delete();
                //     console.log(this.cartItemsSource);
                //     console.log("hi");
                // }
                break;
            default:
                return;
        }
    }

    updateAddToCheckout(cartItemIDs: string[]) {
        console.log(cartItemIDs);
        this._cartService.addToCheckout(cartItemIDs)
                        .catch(err => console.log(err))
                        .then(res => this._router.navigate(['/cart/checkout']));
    }
}


// import { filter } from 'rxjs/operators';
// For example on regular and observable piping + filtering
// this.cartItems = this.cartItems.filter(item => item.cartItemID !== cartItemID);
// this.cartItemsSource = this.cartItemsSource.map(items => {
//     let arr = Array<CartItem>();
//     arr = items.filter((item: CartItem) => item.cartItemID !== cartItemID )
//     return arr;
// });
