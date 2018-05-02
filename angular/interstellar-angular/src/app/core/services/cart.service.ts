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
    private cartItemProductIDs: string[] = [];
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
                    // const _ids = changes.map(a => a.cartItemID);
                    // this.cartItemIDs = _ids;

                    changes.map(item => {
                        this.cartItemIDs.push(item.cartItemID);
                        this.cartItemProductIDs.push(item.productID);
                    });
                    // this.cartItemIDs = changes.map(a => a.cartItemID);
                    // this.cartItemProductIDs = changes.map(a => a.cartItemID);
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
     * @returns string
     */
    get CartItemProductIDs(): string[] {
        return this.cartItemProductIDs;
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
        // TODO  FOR COMPLETE ORDER + order type
        const _docID = this.afs.createId();
        _cartItemData.cartItemID = _docID;
        const findCartItem = this.cartItemProductIDs.find(cartItemProdID => cartItemProdID === _cartItemData.productID);
        return new Promise((resolve, reject) => {
            if (findCartItem) {
                return reject('Error-message: item already in cart');
            }
            this.cartItemProductIDs.push(_cartItemData.productID);
            return resolve(this.userCartCollection.doc(_docID)
                            .set(_cartItemData)
                            .then(() => true)
                            .catch(this.HandleError));
        });

        // this.userCartCollection.doc(this._userID).collection('cartItems').add(_cartItemData)
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
     * @param  {string} cartItemID
     */
    removeCartItem(cartItemID: string, cartItemProductID: string) {
        this.userCartCollection.doc(cartItemID).delete();
        this.cartItemProductIDs.filter(_cartItemProdID => _cartItemProdID !== cartItemProductID);
        this.cartItemIDs.filter(_cartItemID => _cartItemID !== cartItemID);
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: B A T C H   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //

    /**
     * @param  {string[]} cartItemIDs
     */
    addToCheckout(cartItemIDs: string[]): Promise<boolean> {
        console.log(cartItemIDs);
        const batch = this.afs.firestore.batch();
        cartItemIDs.forEach(id => batch.update(this.myCartRef.doc(id), { isInCheckout: true }));
        return batch.commit().then(() => true).catch(() => false);
    }

    /**
     * @param  {string[]} cartItemIdArray
     * @returns Promise {string[]}
     */
    batchRemoveCartItems(cartItemIdArray: string[]): Promise<string[]> {
        const batch = this.afs.firestore.batch();
        cartItemIdArray.forEach(id => batch.delete(this.myCartRef.doc(id)));
        return batch.commit()
            .catch(error => console.log(error))
            .then(() => this.cartItemIDs.filter(_cartItemID => cartItemIdArray.find(c => c === _cartItemID)));
    }

    batchMarkItemsPaidFor(cartItemIdArray: string[]): Promise<boolean> {
        console.log(cartItemIdArray);
        const batch = this.afs.firestore.batch();
        cartItemIdArray.map(id => batch.update(this.myCartRef.doc(id), { isPaidFor: true }));
        return batch.commit().then(() => true).catch(() => false);
    }

    batchUpdateTickerPrices(cartItemPairArray: any[]): Promise<boolean> {
        // console.log(cartItemIdArray);
        const batch = this.afs.firestore.batch();
        console.log('any');
        cartItemPairArray.map((itemPair: any) => {
            const _id = itemPair.id;
            console.log(itemPair);
            const _updatedAssetBalance: any = {
                asset_type: itemPair.assetBalance.asset_type,
                balance: itemPair.assetBalance.balance,
                coin_name: itemPair.assetBalance.coin_name
            }
            console.log(_updatedAssetBalance);
            batch.update(this.myCartRef.doc(_id), { assetPurchaseDetails: _updatedAssetBalance });
        });
        return batch.commit().then(() => true).catch(() => false);
    }

    emptyCart(): Promise<any> {
        const batch = this.afs.firestore.batch();
        this.cartItemIDs.forEach(id => batch.delete(this.myCartRef.doc(id)));
        return batch.commit()
            .catch(error => console.log(error))
            .then((res) => {
                this.cartItemIDs = [];
                this.cartItemProductIDs = [];
                return Promise.resolve(res);
            });
        // console.log(this.cartItemIDs);
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
