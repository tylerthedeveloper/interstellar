import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// -- import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { User } from 'app/user';
import { ProductCategory } from 'app/marketplace/_market-models/product-category';
import { Product } from 'app/marketplace/_market-models/product';

// import { StateStore } from "../_stores/state.store";


@Injectable()
export class ProductService {

    // products: FirebaseListObservable<any>;
    // user: firebase.User;
    // user: User;
    // location: Position;
    // firebaseRef : firebase.database.Reference;
    // geoFire : any;
    // geoFireRef : any;
    private productsCollection: AngularFirestoreCollection<Product>;
    private productCategoriesCollection: AngularFirestoreCollection<ProductCategory>;
    private userProductsCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore) {
                // when ask for them??
                // infinite scroll, etstablish socket!
                // let _user = ...
                // sesh storage... service:
                // CREATE PARENT COMPONENT

            this.productsCollection = afs.collection<Product>('products');
            this.productCategoriesCollection = afs.collection<ProductCategory>('products-categories');
            this.userProductsCollection = afs.collection<User>('users-products');
    }

    getAllProducts(): Observable<Product[]> {
        return this.productsCollection.valueChanges();
    }

    addProduct(productData: string): void {
        ////
        // /temp value!!!!!
        // category = "Idea";

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

        const _userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        if (!_userID) {
            alert('You must be logged in order to post a new product');
            return;
        }

        const _productData = <Product>JSON.parse(productData);

        const _docID = this.afs.createId();
        const _cat = _productData.productCategory;
        console.log(_cat);
        _productData.id = _docID;
        this.productsCollection.doc(_docID).set(_productData);
        this.productCategoriesCollection.doc(`${_cat}/products/${_docID}`).set(_productData);
        this.userProductsCollection.doc(`${_userID}/products/${_docID}`).set(_productData);

        // this.productsCollection.add(_productData);
        // this.productCategoriesCollection.doc(_cat).set(_productData);
        // this.userProductsCollection.doc(`${_userID}/products/${_docID}`).set(_productData);

    }

    updateProduct(key: string, newProductData: string) {
        // this.products.update(key, { text: newText });
    }

    deleteProduct(productID: string) {
        // this.products.remove(key);
    }

    getProductByProductId(productID: string): Observable<any> {
        console.log(this.productsCollection.doc(productID).valueChanges());
        // return this.afs.collection('products', ref => ref.where('id', '==', productID)).valueChanges();
        // return this.productsCollection.doc(productID).valueChanges();
        return Observable.create((observer: any) => {
            this.afs.collection('products', ref => ref.where('id', '==', productID))
                .valueChanges()
                // .first()
                .subscribe(prod =>  {
                    observer.next(prod[0]);
                    console.log(prod[0]);
                });
        });
    }

    getProductsByUserID(userID: string): Observable<any> {
        // `${_userID}/products/${_docID}`
        // if (!userID) userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        return this.userProductsCollection.doc(userID).collection('products').valueChanges();
    }

    getProductsByUserName(name: string): Observable<any> {
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

    getProductsByCategory(category: string): Observable<any> {
        console.log(category);
        return this.productCategoriesCollection.doc(category).collection('products').valueChanges();
    }

    getProductsByUserTitle(title: string): Observable<any> {
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
        // var cat = "";
        // return Object.keys(PostCategory).find(key => PostCategory[key] === _category)
        return;
    }

//     private getCategoryString(category: any): string {
//         switch(category) {
//             case ProductCategory.Apparel:
//                 return "Idea";
//             case ProductCategory.Meetup:
//                 return "Meetup";
//             case ProductCategory.Social:
//                 return "Social";
//             case ProductCategory.Question:
//                 ProductCategory "Question";
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
