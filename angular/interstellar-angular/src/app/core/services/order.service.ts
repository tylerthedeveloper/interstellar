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
import { Order } from '../../marketplace/_market-models/order';


@Injectable()
export class OrderService {

    private _userID: string;

    public userOrderCollection: AngularFirestoreCollection<Order>;
    public userOrderItems: Observable<Order[]>;
    public myOrderRef: firebase.firestore.CollectionReference;

    private orderItemIDs: string[] = [];
    // private assetTotals: Observable<Asset[]>; // = [];
    private assetTotals: AssetBalance[] = [];

    // https://blog.cloudboost.io/build-simple-shopping-order-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.userOrderCollection = afs.collection('user-order').doc(this._userID).collection('orderItems');
        this.orderItemIDs = [];
        // this.userOrderItems = this.userOrderCollection.valueChanges();
        this.userOrderItems = this.userOrderCollection
                                    .valueChanges()
                                    .map(changes => {
                                        // const _totals = new Array<Asset>();
                                        //     _ids.push(data.orderItemID);
                                        const _ids = changes.map(a => a.orderItemID);
                                        this.orderItemIDs = _ids;
                                        // this.assetTotals = _totals;
                                        return changes;

        });
        this.myOrderRef = this.userOrderCollection.ref;

    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    // return Observable.of({ items: this.userOrderItems, totals: this.assetTotals});
    // get Order(): Observable<any> {
    get Order(): Observable<Order[]> {
        return this.userOrderItems;
    }

    get OrderItemIDs(): string[] {
        return this.orderItemIDs;
    }

    getOrderAssetTotals() {
        return Observable.of(calcTotalsForMultipleAssets(this.assetTotals));
        // return Observable.of(this.assetTotals);
    }

    getOrderAssetTotals2() {
        return this.assetTotals;
        // return Observable.of(this.assetTotals);
    }

    addToOrder(newOrderItem: string) {
        const _orderItemData = <Order>JSON.parse(newOrderItem);


        // FOR COMPLETE ORDER
        // order type

        const _docID = this.afs.createId();
        _orderItemData.orderItemID = _docID;

        this.userOrderCollection.doc(_docID).set(_orderItemData);

        // this.userOrderCollection.doc(this._userID).collection('orderItems').add(_orderItemData)
        //                                 .catch(this.HandleError);
                                        // .then(res => res)
                                        // .map()
    }

    updateOrderItem(key: string, newOrderItemData: {}) {
        this.userOrderCollection.doc(key).update(newOrderItemData);
        // this.userOrderCollection.doc(this._userID).collection('orderItems').doc('orderItemID').update(newOrderItemData);
    }

    addToCheckout(orderItemIDs: string[]) {
        console.log(orderItemIDs);
        const batch = this.afs.firestore.batch();
        orderItemIDs.forEach(id => batch.update(this.myOrderRef.doc(id), {isInCheckout: true}));
        return batch.commit();
        // this.userOrderCollection.doc(orderItemID).update({isInCheckout: true});
    }

    removeOrderItem(orderItemID: string) {
        this.userOrderCollection.doc(orderItemID).delete();
        this.orderItemIDs.filter(_orderItemID => _orderItemID !== orderItemID);
    }

    batchRemoveOrderItems(orderItemIdArray: string[]) {
        console.log(this.orderItemIDs);
        const batch = this.afs.firestore.batch();
        orderItemIdArray.forEach(id => batch.delete(this.myOrderRef.doc(id)));
        console.log(this.orderItemIDs);
        return batch.commit()
            .catch(error => console.log(error))
            .then(res => this.orderItemIDs.filter(_orderItemID => orderItemIdArray.find(c => c === _orderItemID)));
        // console.log(this.orderItemIDs);
    }

    emptyOrder() {
        // console.log(this.orderItemIDs);
        // const batch = this.afs.firestore.batch();
        // this.orderItemIDs.forEach(id => batch.delete(this.myOrderRef.doc(id)));
        // batch.commit();
        // this.orderItemIDs = [];
        console.log(this.orderItemIDs);
        const batch = this.afs.firestore.batch();
        this.orderItemIDs.forEach(id => batch.delete(this.myOrderRef.doc(id)));
        console.log(this.orderItemIDs);
        batch.commit()
            .catch(error => console.log(error))
            .then(res => this.orderItemIDs = []);
        console.log(this.orderItemIDs);
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
