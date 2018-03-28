import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../_market-models/cart-item';
import { ISubscription } from 'rxjs/Subscription';
import { Asset } from 'app/stellar';
import { calcTotalsForMultipleAssets } from '../../../stellar/utils';
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/mergeMap';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    private cartItemsSource: Observable<CartItem[]>;
    private cartItemIDs: string[];
    private assetTotals: Asset[];
    _userID = sessionStorage.getItem('user_doc_id');

    constructor(private _cartService: CartService,
                private _router: Router) {}

    ngOnInit() {
        this.cartItemsSource = this._cartService.Cart;
        
        this.cartItemIDs = this._cartService.CartItemIDs;
        // this.cartItemIDs = this.cartItemsSource.map((c: CartItem) => c.cartItemID)

        // TODO: ASSET TOTALS.... HOW AND WHERE???

        // this.cartItemsSource = this.userCartCollection.snapshotChanges()
        //             .map(actions => {
                        
        //                 // this.assetTotals = [];        
        //                 // this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
                        
                        
        //                 return actions.map(a => {
        //                     const data = a.payload.doc.data() as CartItem;
        //                     const id = a.payload.doc.id;
        //                     return  data ;
        //                 })
        //             })

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
    proceedToCheckout() {
        // TODO: ....
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
        // this.cartItemsSource.map(items => items.forEach(item => this._cartService.removeCartItem(item.cartItemID)));
        // this.subscription.unsubscribe();
        this.cartItemsSource.map(c => console.log(c));
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
                console.log(obj);
                this.updateAddToCheckout(_cartItemID);
                this.proceedToCheckout();
                break;
            case 'edit':
                console.log('ed');
                this._cartService.updateCartItem(_cartItem, newCartItemData);
                break;
            case 'remove':
                console.log('rem');
                // this.cartItemDoc = this.afs.collection<CartItem>('user-cart').doc(this._userID).collection<CartItem>('cartItems').doc(cartItemID);
                // this.cartItemDoc.delete();
                // this.userCartCollection.doc(cartItemID).delete();
                this._cartService.removeCartItem(_cartItemID);
                // this.cartItemDoc = <AngularFirestoreDocument<CartItem>> this.afs.collection('user-cart').doc(this._userID).collection<CartItem>('cartItems').doc(cartItemID);
                // this.cartItemDoc.delete();

                //
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

    updateAddToCheckout(cartItemID: string) {
        this._cartService.addToCheckout(cartItemID);
    }
}


// For example on regular and observable piping + filtering
// this.cartItems = this.cartItems.filter(item => item.cartItemID !== cartItemID);
// this.cartItemsSource = this.cartItemsSource.map(items => {
//     let arr = Array<CartItem>();
//     arr = items.filter((item: CartItem) => item.cartItemID !== cartItemID )
//     return arr;
// });
