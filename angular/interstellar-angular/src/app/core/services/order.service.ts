//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 *  todo: RETURN RESPONSES FROM ACTIONS ... PROMISE OR OBSERVABLE DOESNT MATTER - NEED CONFRIMATION OF SUCCESS
 */
//

import { Injectable  } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Order } from '../../marketplace/_market-models/order';
import { TransactionRecord } from '../../marketplace/_market-models/transaction';


@Injectable()
export class OrderService {

    private _userID: string;

    /** AFS Collections */
    public ordersCollection: AngularFirestoreCollection<Order>;
    private userOrdersRef: firebase.firestore.CollectionReference;
    public userOrderCollection: AngularFirestoreCollection<Order>;
    public userOrderItems: Observable<Order[]>;

    public transactionsCollection: AngularFirestoreCollection<TransactionRecord>;
    public userTransactionsCollection: AngularFirestoreCollection<TransactionRecord>;

    // private orderItemIDs: string[] = [];

    // https://blog.cloudboost.io/build-simple-shopping-order-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.ordersCollection = afs.collection<Order>('orders');
        this.transactionsCollection = afs.collection<TransactionRecord>('transactions');
        this.userTransactionsCollection = afs.collection<TransactionRecord>('user-transactions');
        this.userOrderCollection = afs.collection('user-orders');
        this.userOrdersRef = this.userOrderCollection.ref;
        // this.orderItemIDs = [];
        this.userOrderItems = this.userOrderCollection.doc(this._userID).collection<Order>('orderHistory').valueChanges();
                // .map(changes => {
                //     const _ids = changes.map(a => a.orderID);
                //     this.orderItemIDs = _ids;
                //     return changes;
        // });
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    get Orders(): Observable<any> {
        return this.userOrderItems;
    }

    // get OrderItemIDs(): string[] {
    //     return this.orderItemIDs;
    // }

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
        // const transactions = _orderData.transactionsGroups.map(group => group.transactionRecords);
        // console.log(_orderData);
        const batch = this.afs.firestore.batch();
        batch.set(this.ordersCollection.doc(_docID).ref, _orderData);
        batch.set(this.userOrdersRef.doc(this._userID).collection('orderHistory').doc(_docID), _orderData);
        return batch.commit();
    }

    addTransactions(transactionRecords: TransactionRecord[]): Observable<any> {
        const batch = this.afs.firestore.batch();
        return Observable.of(transactionRecords.map(record => {
            const transactionID = record.transactionID;
            const sellerID = record.sellerUserID;
            const recordObj = JSON.parse(JSON.stringify(record));
            batch.set(this.transactionsCollection.doc(transactionID).ref, recordObj);
            batch.set(this.userTransactionsCollection.doc(sellerID).collection('transactions').doc(transactionID).ref, recordObj);
            return batch.commit();
        }));
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
