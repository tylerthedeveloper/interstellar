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

    // TODO: subscription choice here?
        // Why does async fetch first item after batch empty delete
    private subscription: ISubscription;
    // private cartItemsSource: CartItem[];
    private assetTotals: Asset[];
    
    private cartItems: any; // Observable<CartItem[]>;
    private cartItemsSource: Observable<CartItem[]>;
    cartItemDoc: AngularFirestoreDocument<CartItem>;
    userCartCollection: AngularFirestoreCollection<CartItem>;
    prodobs: any;

    constructor(private _cartService: CartService,
        private _router: Router, private afs: AngularFirestore
    ) { 
        
    }

    _userID = sessionStorage.getItem('user_doc_id');
    ngOnInit() {
        this.userCartCollection = this.afs.collection('user-cart').doc(this._userID).collection('cartItems');
        this.userCartCollection.valueChanges().subscribe(items => this.cartItems = items);
        // this.cartItemsSource = this.userCartCollection.snapshotChanges();
        this.cartItemsSource = this.userCartCollection.snapshotChanges()
                    .map(actions => {
                        return actions.map(a => {
                            const data = a.payload.doc.data() as CartItem;
                            const id = a.payload.doc.id;
                            return  data ;
                        })
                    })
                    
        // this.cartItemsSource = this._cartService.getCurrentCart().map(c => c);
        this.assetTotals = [];
        // /this.subscription =
        // this._cartService.getCurrentCart().subscribe(cartItems => this.cartItemsSource = cartItems);
        // this.cartItemsSource = this._cartService.getCurrentCart();
        // this.cartItemsSource.subscribe();

        // this._cartService.getCurrentCart().valueChanges().subscribe(cartItems => {
        //         this.cartItemsSource = cartItems;
        //         console.log(cartItems);
        //         this.assetTotals = calcTotalsForMultipleAssets(cartItems.map(CIT => CIT.assetPurchaseDetails));
        //         console.log(this.assetTotals.length);
        // });
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
        // this.cartItemsSource.map(items => items.forEach(item => this._cartService.removeCartItem(item.cartItemID)));
        // this.subscription.unsubscribe();
        // this.cartItemsSource;
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
                // this.cartItemDoc = this.afs.collection<CartItem>('user-cart').doc(this._userID).collection<CartItem>('cartItems').doc(cartItemID);
                // this.cartItemDoc.delete();
                // this.userCartCollection.doc(cartItemID).delete();
                // this._cartService.removeCartItem(cartItem.cartItemID);
                // this._cartService.
                console.log(this.cartItemsSource);
                this.cartItemDoc = <AngularFirestoreDocument<CartItem>> this.afs.collection('user-cart').doc(this._userID).collection<CartItem>('cartItems').doc(cartItemID);
                this.cartItemDoc.delete();

                this.cartItems = this.cartItems.filter(item => item.cartItemID !== cartItemID);

                if (this.cartItems.length === 0) {
                    this.afs.collection('user-cart').doc(this._userID).delete();
                    console.log(this.cartItemsSource);
                    console.log("hi");
                }
                console.log("bye");

                

                // TODO: convert to set

                // this.cartItemsSource = this.cartItemsSource.map(items => {
                //     let arr = Array<CartItem>();
                //     arr = items.filter((item: CartItem) => item.cartItemID !== cartItemID )
                //     return arr;
                // });
                break;
            default:
                return;
        }
    }

    updateAddToCheckout(cartItemID: string) {
        this._cartService.addToCheckout(cartItemID);
    }
}
