import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { User } from 'app/user';
import { OrderCategory } from 'app/marketplace/_market-models/order-category';
import { Order } from 'app/marketplace/_market-models/order';


@Injectable()
export class OrderService {

    private ordersCollection: AngularFirestoreCollection<Order>;
    private userOrdersCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore) {
        this.ordersCollection = afs.collection<Order>('orders');
        this.userOrdersCollection = afs.collection<User>('users-orders');
    }

    getAllOrders(): Observable<Order[]> {
        return this.ordersCollection.valueChanges();
    }

    addOrder(orderData: string): void {
        const _userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        if (!_userID) {
            alert('You must be logged in order to post a new order');
            return;
        }

        const _orderData = <Order>JSON.parse(orderData);

        const _docID = this.afs.createId();
        const _cat = _orderData.orderCategory;
        console.log(_cat);
        _orderData.id = _docID;
        this.ordersCollection.doc(_docID).set(_orderData);
        this.orderCategoriesCollection.doc(`${_cat}/orders/${_docID}`).set(_orderData);
        this.userOrdersCollection.doc(`${_userID}/orders/${_docID}`).set(_orderData);

        // this.ordersCollection.add(_orderData);
        // this.orderCategoriesCollection.doc(_cat).set(_orderData);
        // this.userOrdersCollection.doc(`${_userID}/orders/${_docID}`).set(_orderData);

    }

    updateOrder(key: string, newOrderData: {}) {
        this.ordersCollection.doc(key).update(newOrderData);
        // this.orders.update(key, { text: newText });
    }

    deleteOrder(orderID: string) {
        // this.orders.remove(key);
    }

    getOrderByOrderId(orderID: string): Observable<any> {
        // console.log(this.ordersCollection.doc(orderID).valueChanges());
        // return this.afs.collection('orders', ref => ref.where('id', '==', orderID)).valueChanges();
        // return this.ordersCollection.doc(orderID).valueChanges();
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

    getOrdersByUserID(userID: string): Observable<any> {
        // `${_userID}/orders/${_docID}`
        // if (!userID) userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        return this.userOrdersCollection.doc(userID).collection('orders').valueChanges();
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

    getOrdersByCategory(category: string): Observable<any> {
        console.log(category);
        return this.orderCategoriesCollection.doc(category).collection('orders').valueChanges();
    }

    getOrdersByUserTitle(title: string): Observable<any> {
        // if(title !== "") {
        //     return Observable.create((observer : any) => {
        //         var self = this.afs;
        //         this.afs.list('/orders', {
        //             query: {
        //                 orderByChild: 'title',
        //                 equalTo: title
        //             }
        //         }).subscribe(order => {
        //             //console.log(order);
        //             observer.next(order);
        //         });
        //     });
        // }
        return;
    }

    private getKeyByCategoryId(_category: string) {
        // var cat = "";
        // return Object.keys(PostCategory).find(key => PostCategory[key] === _category)
        return;
    }

//     private getCategoryString(category: any): string {
//         switch(category) {
//             case OrderCategory.Apparel:
//                 return "Idea";
//             case OrderCategory.Meetup:
//                 return "Meetup";
//             case OrderCategory.Social:
//                 return "Social";
//             case OrderCategory.Question:
//                 OrderCategory "Question";
//             case Category.Other:
//                 return "Other";
//         }
//         return "";
//     }
}

// Apparel,
// Electronics,
// Food,
// Houseware,
// Software,

// Other
