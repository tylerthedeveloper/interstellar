import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { User } from '../../user';
import { Order } from '../../marketplace/_market-models/order';


@Injectable()
export class CartService {

    // private cardProductsCollection: AngularFirestoreCollection<Order>;
    private _userID: string;
    private userCartCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore) {
        // this.cardProductsCollection = afs.collection<Order>('cart');
        this.userCartCollection = afs.collection<User>('user-cart');
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
    }

    getCurrentCart(): Observable<Order[]> {
        return this.userCartCollection.doc(this._userID)
                                        .collection('cartItems')
                                        .valueChanges()
                                        .map(orders => <Array<Order>> orders);
    }

    addToCart(newCartItem: string): void {
        console.log(newCartItem);
        if (!this._userID) {
            return alert('You must be logged in order to view your cart');
        }
        const _orderData = <Object>JSON.parse(newCartItem);


        // FOR COMPLETE ORDER
        // const _docID = this.afs.createId();
        // newCartItem.orderID = _docID;

        // order type


        this.userCartCollection.doc(this._userID).collection('cartItems').add(_orderData);

    }

    updateOrder(key: string, newOrderData: {}) {
        // this.ordersCollection.doc(key).update(newOrderData);
        // this.orders.update(key, { text: newText });
    }

    deleteOrder(orderID: string) {
        // this.orders.remove(key);
    }

    getOrderByOrderId(orderID: string): Observable<any> {
        return Observable.create((observer: any) => {
            this.afs.collection('orders', ref => ref.where('id', '==', orderID))
                .valueChanges()
                // .first()
                .subscribe(prod =>  {
                    observer.next(prod[0]);
                    // console.log(prod[0]);
                });
        });
    }

    getOrdersByUserName(name: string): Observable<any> {
        /*
        Observable.create((observer : any) => {
            this.userService.getUserByName(name).first().subscribe(user => {
                //console.log(user[0].uid);
                observer.next(new Array(this.afs.list(`/user-orders/${user[0].uid}`)));
            });
        });
        */
        // return this.afs.list(`/user-orders/names/${name}`);
        return;

    }

}
