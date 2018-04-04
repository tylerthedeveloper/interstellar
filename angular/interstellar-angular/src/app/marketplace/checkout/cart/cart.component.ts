// TODO: do we need to display totals...
    // if so --> do we need to subscribe to cart?


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../_market-models/cart-item';
import { AssetBalance, calcTotalsForMultipleAssets, currencyAssetsMapper } from 'app/stellar';


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    private cartItemsSource2: CartItem[];
    private cartItemsSource: Observable<CartItem[]>;
    private cartItemIDs: string[];
    private assetTotals: AssetBalance[];
    _userID = sessionStorage.getItem('user_doc_id');

    constructor(private _cartService: CartService,
                private _router: Router) {}

    ngOnInit() {
        this.cartItemsSource = this._cartService.Cart.map(cartItems => {
            this.cartItemIDs = cartItems.map((c: CartItem) => c.cartItemID);
            this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));

            // TODO: add to asset balance
            // this.assetTotals.forEach(ass => console.log(currencyAssetsMapper[ass.asset_type]));
            return cartItems;
        });
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    proceedToCheckout() {
        // TODO: ....
        // FOR EACH ... ALLOW CHECKBOXES ... UPDATE
        // GET ALL FOR EACH ON CHECKOUT IF IN CHECKOIUT
        this.updateAddToCheckout(this.cartItemIDs);
    }

    navigateToAllProducts() {
        this._router.navigate(['/products']);
    }

    emptyOutCart() {
        this._cartService.emptyCart();
    }
    // ────────────────────────────────────────────────────────────────────────────────



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

        console.log(obj);

        switch (action) {
            case 'purchase':
                this.updateAddToCheckout(new Array<string>(_cartItemID));
                break;
            case 'edit':
                this._cartService.updateCartItem(_cartItem, newCartItemData);
                break;
            case 'remove':
                this._cartService.removeCartItem(_cartItemID);
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

     // recalculateTotals() {
    //     // this.assetTotals = this._cartService.getCartAssetTotals()
    //     // const currentAssets: Asset[] = this._cartService.getCartAssetTotals();
    //     // const updatedAssets = calcTotalsForMultipleAssets(currentAssets);
    //     this._cartService.getCartAssetTotals()
    //                      .subscribe(curAssets => this.assetTotals = Observable.of(calcTotalsForMultipleAssets(curAssets)));
    //     // this.assetTotals = updatedAssets;
    // }

    // ────────────────────────────────────────────────────────────────────────────────

}


// import { filter } from 'rxjs/operators';
// For example on regular and observable piping + filtering
// this.cartItems = this.cartItems.filter(item => item.cartItemID !== cartItemID);
// this.cartItemsSource = this.cartItemsSource.map(items => {
//     let arr = Array<CartItem>();
//     arr = items.filter((item: CartItem) => item.cartItemID !== cartItemID )
//     return arr;
// });
