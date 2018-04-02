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

    public ordersCollection: AngularFirestoreCollection<Order>;
    public userOrderCollection: AngularFirestoreCollection<Order>;
    public userOrderItems: Observable<Order[]>;
    public myOrderRef: firebase.firestore.CollectionReference;

    private orderItemIDs: string[] = [];
    private assetTotals: AssetBalance[] = [];

    // https://blog.cloudboost.io/build-simple-shopping-order-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');

        this.ordersCollection = afs.collection('orders');
        this.userOrderCollection = afs.collection('user-orders').doc(this._userID).collection('orderHistory');
        this.orderItemIDs = [];
        this.userOrderItems = this.userOrderCollection
                                    .valueChanges()
                                    .map(changes => {
                                        const _ids = changes.map(a => a.orderID);
                                        this.orderItemIDs = _ids;
                                        return changes;

        });
        this.myOrderRef = this.userOrderCollection.ref;

    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    get Order(): Observable<Order[]> {
        return this.userOrderItems;
    }

    get OrderItemIDs(): string[] {
        return this.orderItemIDs;
    }

    getNewOrderID(): string {
        const _newOrderID = this.afs.createId();
        return _newOrderID;
    }

    getOrderByID(orderItemID: string) {
        return this.ordersCollection.doc(orderItemID);
    }

    addNewOrder(orderData: string) {
        const _orderData = <Order>JSON.parse(orderData);
        const _docID = _orderData.orderID;
        console.log(_orderData);
        const batch = this.afs.firestore.batch();
        batch.set(this.ordersCollection.doc(_docID).ref, _orderData);
        batch.set(this.userOrderCollection.doc(_docID).ref, _orderData);
        batch.commit();
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
