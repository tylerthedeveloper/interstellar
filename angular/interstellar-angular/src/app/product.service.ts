import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Product } from './product'

//-- import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { UserService } from './user.service';
import { Subject } from 'rxjs/Subject';

// import { StateStore } from "../_stores/state.store";

import { User } from './user';

declare var GeoFire: any;

@Injectable()
export class ProductService {

    // products: FirebaseListObservable<any>;
    //user: firebase.User;
    user: User;
    location: Position;
    firebaseRef : firebase.database.Reference;
    geoFire : any;
    geoFireRef : any;

    constructor(private afs: AngularFirestore) {
                



                // db.list('/posts'); store here ???
                                // when ask for them??
                                // infinite scroll, etstablish socket!
                
                // let _user = ... 
                //sesh storage... service:
                // CREATE PARENT COMPONENT


                this.firebaseRef = firebase.database().ref('locations/posts');
                this.geoFire = new GeoFire(this.firebaseRef);
                this.geoFireRef = this.geoFire.ref(); 
    }

    // getAllPosts(): Observable<any> {
    //     return this.afs.list('/posts', { query: { orderByChild: 'timestamp' }});
    // }
    
    addProduct(productData: {}) {
        
        ////
        ///temp value!!!!!
        //category = "Idea";

        /////
        ///
        // var productData = {  
        //     authorID: this.user.id,            
        //     author: this.user.fullName,
        //     title: title,
        //     content: content,
        //     timestamp: firebase.database.ServerValue.TIMESTAMP,
        //     category: category
        // }
        // var catstring = this.getKeyByCategoryId(category);
        // var productKey = this.afs.database.ref("/products").push().key;
        // this.afs.database.ref(`products/${productKey}`).set(productData);
        // this.afs.database.ref(`user-products/ids/${this.user.uid}/${productKey}`).set(productData);
        // this.afs.database.ref(`user-products/names/${this.user.name}/${productKey}`).set(productData);
        // this.afs.database.ref(`product-categories/${catstring}/${productKey}`).set(productData);
    
    }

    updatePost(key: string, newText: string) {
        // this.products.update(key, { text: newText });
    }

    deletePost(key: string) {    
        // this.products.remove(key); 
    }

    getPostsByUserID(userID : string): Observable<any> {
        // return this.afs.list(`/user-products/ids/${userID}`);
        return;
    }

    getPostsByUserName(name : string): Observable<any> {
        /*
        Observable.create((observer : any) => {
            this.userService.getUserByName(name).first().subscribe(user => {
                //console.log(user[0].uid);
                observer.next(new Array(this.afs.list(`/user-products/${user[0].uid}`)));        
            });
        });
        */
        // return this.afs.list(`/user-products/names/${name}`);        
        return;
        
    }

    getPostsByCategory(category : string): Observable<any> {
        // return this.afs.list(`/product-categories/${category}`);
        return;
    }
    
    getPostsByUserTitle(title : string): Observable<any> {
        // if(title !== "") {
        //     return Observable.create((observer : any) => {
        //         var self = this.afs;
        //         this.afs.list('/products', {
        //             query: {
        //                 orderByChild: 'title',
        //                 equalTo: title
        //             }
        //         }).subscribe(product => {
        //             //console.log(product);
        //             observer.next(product);
        //         });
        //     });
        // }
        return;
    }

    private getKeyByCategoryId(_category: string) {
        //var cat = "";
        // return Object.keys(PostCategory).find(key => PostCategory[key] === _category)
        return;
    }

}



/*
    private getCategoryString(category: string) : string {
        switch(category) {
            case Category.Idea:
                return "Idea";
            case Category.Meetup:
                return "Meetup";
            case Category.Social:
                return "Social";
            case Category.Question:
                return "Question";
            case Category.Interview:
                return "Interview";
            case Category.Other:
                return "Other";
        }
        return "";
    }
        */
