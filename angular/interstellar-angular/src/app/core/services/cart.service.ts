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
    private userCartCollection: AngularFirestoreCollection<CartItem>;
    private myCartRef: firebase.firestore.CollectionReference;

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.userCartCollection = afs.collection<CartItem>('user-cart').doc(this._userID).collection('cartItems');
        this.myCartRef = this.userCartCollection.ref;
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    getCurrentCart(): Observable<CartItem[]> {
        return this.userCartCollection.valueChanges();
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

    removeCartItem(cartItemID: string) {
        this.userCartCollection.doc(cartItemID).delete();
    }

    emptyCart() {
        console.log('eeee')
        // const batch = this.afs.firestore.batch();
        // const curItems = await this.userCartCollection.ref.get();
        // curItems.then(items => 
        //     items.forEach(item => {
        //         console.log(item);
        //         batch.delete(item.ref)
        //     }));
        // batch.commit();
        this.userCartCollection.valueChanges()
                    // .map(item => <Array<CartItem>> item)
                    .map(items => items.forEach(item => {
                        console.log(item)
                        this.myCartRef.doc(item.cartItemID).delete()
                    }));
        // this.userCartCollection.doc(this._userID).collection('cartItems').doc(item.cartItemID).delete();
    }
    // ────────────────────────────────────────────────────────────────────────────────


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
