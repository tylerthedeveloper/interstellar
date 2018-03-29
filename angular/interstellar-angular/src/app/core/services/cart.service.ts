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
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { calcTotalsForMultipleAssets, AssetBalance } from 'app/stellar';

import { User } from '../../user';
import { CartItem } from '../../marketplace/_market-models/cart-item';


@Injectable()
export class CartService {

    private _userID: string;

    public userCartCollection: AngularFirestoreCollection<CartItem>;
    public userCartItems: Observable<CartItem[]>;
    public myCartRef: firebase.firestore.CollectionReference;

    private cartItemIDs: string[] = [];
    // private assetTotals: Observable<Asset[]>; // = [];
    private assetTotals: AssetBalance[] = [];

    // https://blog.cloudboost.io/build-simple-shopping-cart-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.userCartCollection = afs.collection('user-cart').doc(this._userID).collection('cartItems');
        this.cartItemIDs = [];
        // this.userCartItems = this.userCartCollection.valueChanges();
        this.userCartItems = this.userCartCollection
                                    .valueChanges()
                                    .map(changes => {
                                        // const _totals = new Array<Asset>();
                                        //     _ids.push(data.cartItemID);
                                        const _ids = changes.map(a => a.cartItemID);
                                        this.cartItemIDs = _ids;
                                        // this.assetTotals = _totals;
                                        return changes;

        });
        this.myCartRef = this.userCartCollection.ref;

    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    // return Observable.of({ items: this.userCartItems, totals: this.assetTotals});
    // get Cart(): Observable<any> {
    get Cart(): Observable<CartItem[]> {
        return this.userCartItems;
    }

    get CartItemIDs(): string[] {
        return this.cartItemIDs;
    }

    getCartAssetTotals() {
        return Observable.of(calcTotalsForMultipleAssets(this.assetTotals));
        // return Observable.of(this.assetTotals);
    }

    getCartAssetTotals2() {
        return this.assetTotals;
        // return Observable.of(this.assetTotals);
    }

    addToCart(newCartItem: string) {
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

    addToCheckout(cartItemIDs: string[]) {
        console.log(cartItemIDs);
        const batch = this.afs.firestore.batch();
        cartItemIDs.forEach(id => batch.update(this.myCartRef.doc(id), {isInCheckout: true}));
        return batch.commit();
        // this.userCartCollection.doc(cartItemID).update({isInCheckout: true});
    }

    removeCartItem(cartItemID: string) {
        this.userCartCollection.doc(cartItemID).delete();
        this.cartItemIDs.filter(_cartItemID => _cartItemID !== cartItemID);
    }

    emptyCart() {
        console.log(this.cartItemIDs);
        const batch = this.afs.firestore.batch();
        this.cartItemIDs.forEach(id => batch.delete(this.myCartRef.doc(id)));
        batch.commit();
        this.cartItemIDs = [];
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
