//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 *  RETURN RESPONSES FROM ACTIONS ... PROMISE OR OBSERVABLE DOESNT MATTER - NEED CONFRIMATION OF SUCCESS
 */
//


import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { User } from '../../user';
import { CartItem } from '../../marketplace/_market-models/cart-item';


@Injectable()
export class CartService {

    private _userID: string;
    public userCartCollection: AngularFirestoreCollection<CartItem>;
    public userCartItems: Observable<CartItem[]>;
    public myCartRef: firebase.firestore.CollectionReference;

    // https://blog.cloudboost.io/build-simple-shopping-cart-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.userCartCollection = afs.collection<CartItem>('user-cart').doc(this._userID).collection('cartItems');
        this.userCartItems = this.userCartCollection.valueChanges();
        this.myCartRef = this.userCartCollection.ref;
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    // getCurrentCart(): AngularFirestoreCollection<CartItem> {
    //     return this.userCartCollection;
    getCurrentCart(): Observable<CartItem[]> {
        return this.userCartItems;
        // return this.userCartCollection.doc(this._userID)
        //                                 .collection('cartItems')
        //                                 .valueChanges();
                                        // .map(res => res)
                                        // .map(cartItems => <Array<CartItem>> cartItems);
    }

    addToCart(newCartItem: string) {
        console.log(newCartItem);
        const _cartItemData = <CartItem>JSON.parse(newCartItem);

        // FOR COMPLETE ORDER
        // order type

        const _docID = this.afs.createId();
        _cartItemData.cartItemID = _docID;
        this.userCartCollection.doc(_docID).set(_cartItemData);
        // this.userCartCollection.doc(this._userID).collection('cartItems').add(_cartItemData)
        //                                 .catch(this.HandleError);
                                        // .then(res => res)
                                        // .map()
    }

    updateCartItem(key: string, newCartItemData: {}) {
        this.userCartCollection.doc(key).update(newCartItemData);
        // this.userCartCollection.doc(this._userID).collection('cartItems').doc('cartItemID').update(newCartItemData);
    }

    addToCheckout(cartItemID: string) {
        this.userCartCollection.doc(cartItemID).update({isInCheckout: true});
    }

    removeCartItem(cartItemID: string) {
        this.userCartCollection.doc(cartItemID).delete();
    }

    // TODO: implement batch delete... determine where to pull from ... dont AWAIT subscribe
    emptyCart() {
        this.userCartCollection
                .valueChanges()
                .map(items => items.forEach(item => this.myCartRef.doc(item.cartItemID).delete()));
    }
    // ────────────────────────────────────────────────────────────────────────────────


    // TODO: implement error handling
    //
    // ────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────
    //
    HandleError(error: Response) {
        // alert(error);
        return Observable.throw(error || 'Server error');
    }
    // ────────────────────────────────────────────────────────────────────────────────

}
