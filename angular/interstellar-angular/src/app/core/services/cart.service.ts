//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 *  RETURN RESPONSES FROM ACTIONS ... PROMISE OR OBSERVABLE DOESNT MATTER - NEED CONFRIMATION OF SUCCESS
 */
//


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { calcTotalsForMultipleAssets, AssetBalance } from 'app/stellar';

import { CartItem } from '../../marketplace/_market-models/cart-item';

import 'rxjs/add/observable/of';

@Injectable()
export class CartService {

    /** AFS Collections */
    public userCartCollection: AngularFirestoreCollection<CartItem>;
    public userCartItems: Observable<CartItem[]>;
    public myCartRef: firebase.firestore.CollectionReference;

    private _userID: string;

    /** Service stored AFS collections  */
    private cartItemIDs: string[] = [];
    private assetTotals: AssetBalance[] = []; // private assetTotals: Observable<Asset[]>; // = [];

    // https://blog.cloudboost.io/build-simple-shopping-cart-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        if (this._userID) {
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
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @returns Observable
     */
    get Cart(): Observable<CartItem[]> {
        // get Cart(): Observable<any> {
        // return Observable.of({ items: this.userCartItems, totals: this.assetTotals});
        return this.userCartItems;
    }

    /**
     * @returns string
     */
    get CartItemIDs(): string[] {
        return this.cartItemIDs;
    }

    /**
     */
    getCartAssetTotals() {
        return Observable.of(calcTotalsForMultipleAssets(this.assetTotals));
        // return Observable.of(this.assetTotals);
    }
    /**
     */
    getCartAssetTotals2() {
        return this.assetTotals;
        // return Observable.of(this.assetTotals);
    }
    /**
     * @param  {string} newCartItem
     */
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

    /**
     * @param  {string} key
     * @param  {{}} newCartItemData
     */
    updateCartItem(key: string, newCartItemData: {}) {
        this.userCartCollection.doc(key).update(newCartItemData);
        // this.userCartCollection.doc(this._userID).collection('cartItems').doc('cartItemID').update(newCartItemData);
    }

    /**
     * @param  {string[]} cartItemIDs
     */
    addToCheckout(cartItemIDs: string[]) {
        console.log(cartItemIDs);
        const batch = this.afs.firestore.batch();
        cartItemIDs.forEach(id => batch.update(this.myCartRef.doc(id), { isInCheckout: true }));
        return batch.commit();
    }
    /**
     * @param  {string} cartItemID
     */
    removeCartItem(cartItemID: string) {
        this.userCartCollection.doc(cartItemID).delete();
        this.cartItemIDs.filter(_cartItemID => _cartItemID !== cartItemID);
    }

    /**
     * @param  {string[]} cartItemIdArray
     */
    batchRemoveCartItems(cartItemIdArray: string[]) {
        const batch = this.afs.firestore.batch();
        cartItemIdArray.forEach(id => batch.delete(this.myCartRef.doc(id)));
        // console.log(this.cartItemIDs);
        return batch.commit()
            .catch(error => console.log(error))
            .then(() => this.cartItemIDs.filter(_cartItemID => cartItemIdArray.find(c => c === _cartItemID)));
        // console.log(this.cartItemIDs);
    }

    /**
     */
    emptyCart() {
        const batch = this.afs.firestore.batch();
        this.cartItemIDs.forEach(id => batch.delete(this.myCartRef.doc(id)));
        batch.commit()
            .catch(error => console.log(error))
            .then(() => this.cartItemIDs = []);
        console.log(this.cartItemIDs);
    }
    // ────────────────────────────────────────────────────────────────────────────────


    // TODO: implement error handling
    //
    // ────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────
    //

    /**
     * @param  {Response} error
     */
    HandleError(error: Response) {
        // alert(error);
        return Observable.throw(error || 'Server error');
    }
    // ────────────────────────────────────────────────────────────────────────────────

}
