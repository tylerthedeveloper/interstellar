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
import { TransactionRecord, OrderType } from '../../marketplace/_market-models/transaction';


@Injectable()
export class OrderService {

    private _userID: string;

    /** AFS Collections */
    private ordersCollection: AngularFirestoreCollection<Order>;
    private userOrdersRef: firebase.firestore.CollectionReference;
    private userOrderCollection: AngularFirestoreCollection<Order>;
    private userOrderItems: Observable<Order[]>;
    private userTransRecordSales: Observable<TransactionRecord[]>;
    private userTransRecordPurchases: Observable<TransactionRecord[]>;

    private transactionsCollection: AngularFirestoreCollection<TransactionRecord>;
    private userTransCollection: AngularFirestoreCollection<TransactionRecord>;
    // public userTransPurchasesCollection: AngularFirestoreCollection<TransactionRecord>;
    // public userTransSalesCollection: AngularFirestoreCollection<TransactionRecord>;

    // https://blog.cloudboost.io/build-simple-shopping-order-with-angular-4-observables-subject-subscription-part-2-2d3735cde5f

    constructor(private afs: AngularFirestore) {
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.ordersCollection = afs.collection<Order>('orders');
        this.transactionsCollection = afs.collection<TransactionRecord>('transactions');
        this.userTransCollection = afs.collection<TransactionRecord>('user-transactions');
        this.userOrderCollection = afs.collection('user-orders');
        this.userOrdersRef = this.userOrderCollection.ref;
        this.userOrderItems = this.userOrderCollection.doc(this._userID).collection<Order>('orderHistory').valueChanges();
        this.userTransRecordSales = this.userTransCollection.doc(this._userID)
                .collection<TransactionRecord>('sales').valueChanges();
        this.userTransRecordPurchases = this.userTransCollection.doc(this._userID)
                .collection<TransactionRecord>('purchases').valueChanges();
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M Y P U B L I C  C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    get Orders(): Observable<any> {
        return this.userOrderItems;
    }

    /**
     * @returns Observable
     */
    get TransactionSales(): Observable<any> {
        return this.userTransRecordSales;
    }

    /**
     * @returns Observable
     */
    get TransactionPurchases(): Observable<any> {
        return this.userTransRecordPurchases;
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

    addTransactions(transactionRecords: TransactionRecord[]): Promise<any> {
        const batch = this.afs.firestore.batch();
        transactionRecords.map(record => {
            const transactionID = record.transactionID;
            const buyerID = record.buyerUserID;
            const sellerID = record.sellerUserID;
            const recordObj = <TransactionRecord>JSON.parse(JSON.stringify(record));
            batch.set(this.transactionsCollection.doc(transactionID).ref, recordObj);

            recordObj.orderType = OrderType.Sale;
            batch.set(this.userTransCollection.doc(sellerID).collection('sales').doc(transactionID).ref, recordObj);

            recordObj.orderType = OrderType.Purchase;
            batch.set(this.userTransCollection.doc(buyerID).collection('purchases').doc(transactionID).ref, recordObj);
        });
        return batch.commit();
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    getOrdersByUserID(userID: string) {
        return this.ordersCollection.doc(userID).valueChanges().map(o => <Order> o);
    }

    getTransactionSalesByUserID(userID: string): Observable<TransactionRecord[]> {
        return this.userTransCollection.doc(userID).collection<TransactionRecord>('sales').valueChanges();
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
