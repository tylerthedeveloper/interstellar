import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../_market-models/cart-item';
import { AssetBalance, calcTotalsForMultipleAssets } from 'app/stellar';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    private cartItemsSource: Observable<CartItem[]>;
    private cartItemIDs: string[] = [];
    private _checkedCartItemIDs: string[] = [];
    private assetTotals: AssetBalance[];

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
    checkoutSelectedItems() {
        this._cartService.batchRemoveCartItems(this._checkedCartItemIDs);
    }

    proceedToCheckout() {
        this.updateAddToCheckout(this.cartItemIDs);
    }

    removeSelectedItems() {
        this._cartService.batchRemoveCartItems(this._checkedCartItemIDs);
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
        const _action = obj.action;
        const _cartItemID =  obj.payload;
        let newCartItemData = '';
        if (obj.newData) {
            newCartItemData = obj.newData;
        }

        console.log(obj);

        switch (_action) {
            case 'purchase':
                this.updateAddToCheckout(new Array<string>(_cartItemID));
                break;
            case 'edit':
                this._cartService.updateCartItem(_cartItemID, newCartItemData);
                break;
            case 'remove':
                this._cartService.removeCartItem(_cartItemID);
                break;
            case 'checkItem':
                // TODO:
                console.log(_cartItemID);
                this._checkedCartItemIDs.push(_cartItemID);
                break;
            default:
                return;
        }
    }

    updateAddToCheckout(cartItemIDs: string[]) {
        console.log(cartItemIDs);
        this._cartService.addToCheckout(cartItemIDs)
                        .catch(err => console.log(err))
                        .then(() => this._router.navigate(['/cart/checkout']));
    }

    navigateToAllProducts() {
        this._router.navigate(['/products']);
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