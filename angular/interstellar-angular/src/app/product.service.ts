import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PostCategory, Post } from '../_models/product';

// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

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

    constructor(private db: AngularFireDatabase, 
                public afService : AFService,
                public userService : UserService) {
                



                this.posts = ... // db.list('/posts'); store here ???
                                // when ask for them??
                                // infinite scroll, etstablish socket!
                
                let _user = ... //sesh storage... service:
                // CREATE PARENT COMPONENT





                this.firebaseRef = firebase.database().ref('locations/posts');
                this.geoFire = new GeoFire(this.firebaseRef);
                this.geoFireRef = this.geoFire.ref(); 
    }

    getAllPosts(): Observable<any> {
        return this.db.list('/posts', { query: { orderByChild: 'timestamp' }});
    }
    
    addPost(title: string, content: string, category: string) {
        
        ////
        ///temp value!!!!!
        //category = "Idea";

        /////
        ///
        var productData = {  
            authorID: this.user.uid,            
            author: this.user.name,
            title: title,
            content: content,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            category: category
        }
        var catstring = this.getKeyByCategoryId(category);
        var productKey = this.db.database.ref("/products").push().key;
        this.db.database.ref(`products/${productKey}`).set(productData);
        this.db.database.ref(`user-products/ids/${this.user.uid}/${productKey}`).set(productData);
        this.db.database.ref(`user-products/names/${this.user.name}/${productKey}`).set(productData);
        this.db.database.ref(`product-categories/${catstring}/${productKey}`).set(productData);
    
    }

    updatePost(key: string, newText: string) {
        this.products.update(key, { text: newText });
    }

    deletePost(key: string) {    
        this.products.remove(key); 
    }

    getPostsByUserID(userID : string): Observable<any> {
        return this.db.list(`/user-products/ids/${userID}`);
    }

    getPostsByUserName(name : string): Observable<any> {
        /*
        Observable.create((observer : any) => {
            this.userService.getUserByName(name).first().subscribe(user => {
                //console.log(user[0].uid);
                observer.next(new Array(this.db.list(`/user-products/${user[0].uid}`)));        
            });
        });
        */
        return this.db.list(`/user-products/names/${name}`);        
        
    }

    getPostsByCategory(category : string): Observable<any> {
        return this.db.list(`/product-categories/${category}`);
    }
    
    getPostsByUserTitle(title : string): Observable<any> {
        if(title !== "") {
            return Observable.create((observer : any) => {
                var self = this.db;
                this.db.list('/products', {
                    query: {
                        orderByChild: 'title',
                        equalTo: title
                    }
                }).subscribe(product => {
                    //console.log(product);
                    observer.next(product);
                });
            });
        }
    }

    public getAllPostsByLocation(radius: number) : Observable<any> { //: FirebaseListObservable<any> { 

        let _coords = this.location.coords;

        var geoQuery = this.geoFire.query({
            center: [_coords.latitude, _coords.longitude],
            radius: radius //kilometers
        });

        return Observable.create((observer : any) => {
            var self = this.db;
            geoQuery.on("key_entered", function(key: any, location: any, distance: any) {
                self.object(`/products/${key}`).subscribe(product => {
                    //console.log(product);
                    observer.next(product);
                });
            })
        });
    }

    private getKeyByCategoryId(_category: string) {
        //var cat = "";
        return Object.keys(PostCategory).find(key => PostCategory[key] === _category)
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
