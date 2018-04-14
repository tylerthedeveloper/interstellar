//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 *  RETURN RESPONSES FROM ACTIONS ... PROMISE OR OBSERVABLE DOESNT MATTER - NEED CONFRIMATION OF SUCCESS
 */
//

import { Injectable  } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Order } from '../../marketplace/_market-models/order';


@Injectable()
export class OrderService {

    private _userID: string;

    /** AFS Collections */
    public ordersCollection: AngularFirestoreCollection<Order>;
    public userOrderCollection: AngularFirestoreCollection<Order>;
    public userOrderItems: Observable<Order[]>;
    private userOrdersRef: firebase.firestore.CollectionReference;

    private orderItemIDs: string[] = [];

    // https://blog.cloudboost.io/build-simple-shopping-order-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');

        this.ordersCollection = afs.collection<Order>('orders');
        this.userOrderCollection = afs.collection('user-orders');
        this.userOrdersRef = this.userOrderCollection.ref;
        this.orderItemIDs = [];
        this.userOrderItems = this.userOrderCollection.doc(this._userID)
                                    .collection<Order>('orderHistory')
                                    .valueChanges()
                                    .map(changes => {
                                        const _ids = changes.map(a => a.orderID);
                                        this.orderItemIDs = _ids;
                                        return changes;

        });

    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    get Orders(): Observable<Order[]> {
        return this.userOrderItems;
    }
    /**
     * @returns string
     */
    get OrderItemIDs(): string[] {
        return this.orderItemIDs;
    }
    /**
     * @returns string
     */
    getNewOrderID(): string {
        const _newOrderID = this.afs.createId();
        return _newOrderID;
    }
    /**
     * @param  {string} orderItemID
     * @returns Observable
     */
    getOrderByID(orderItemID: string): Observable<Order> {
        return this.ordersCollection.doc(orderItemID).valueChanges().map(o => <Order> o);
    }

    /**
     * @param  {string} orderData
     * @returns Promise
     */
    addNewOrder(orderData: string): Promise<any> {
        const _orderData = <Order>JSON.parse(orderData);
        const _docID = _orderData.orderID;
        console.log(_orderData);
        const batch = this.afs.firestore.batch();
        batch.set(this.ordersCollection.doc(_docID).ref, _orderData);
        batch.set(this.userOrderCollection.doc(_docID).ref, _orderData);
        return batch.commit();
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
