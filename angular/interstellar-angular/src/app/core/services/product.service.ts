//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 * TODO:
 * STATE MANAGEMENT ... ALL SERVICES
 */
//


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { ProductCategory } from 'app/marketplace/_market-models/product-category';
import { Product } from 'app/marketplace/_market-models/product';
import { User } from 'app/user/user';


@Injectable()
export class ProductService {

    /** AFS Collections */
    private productsCollection: AngularFirestoreCollection<Product>;
    private productCategoriesCollection: AngularFirestoreCollection<ProductCategory>;
    private userProductsCollection: AngularFirestoreCollection<User>;
    private myProductRef: firebase.firestore.CollectionReference;

    private _userID: string;

    constructor(private afs: AngularFirestore) {
        // TODO: READ BELOW
        // infinite scroll, etstablish socket!
        // sesh storage... service:
        // CREATE PARENT COMPONENT
        this._userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.productsCollection = afs.collection<Product>('products');
        this.productCategoriesCollection = afs.collection<ProductCategory>('products-categories');
        this.userProductsCollection = afs.collection<User>('users-products');
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    getAllProducts(): Observable<Product[]> {
        return this.productsCollection.valueChanges();
    }

        /**
     * @returns string
     */
    getNewProductID(): string {
        const _newProductID = this.afs.createId();
        return _newProductID;
    }

    // TODO: TEST bATCH
    // TODO: TEST RETURN CONFIRMATION / TRUE
    addProduct(productData: string) {
        const _productData = <Product>JSON.parse(productData);
        const _docID = _productData.id;
// const _docID = this.afs.createId();
        const _cat = _productData.productCategory;
// _productData.id = _docID;
        // console.log(_docID)
        // console.log(_cat)
        const batch = this.afs.firestore.batch();
        batch.set(this.productsCollection.doc(_docID).ref, _productData);
        batch.set(this.userProductsCollection.doc(`${this._userID}/products/${_docID}`).ref, _productData);
        batch.set(this.productCategoriesCollection.doc(`${_cat}/products/${_docID}`).ref, _productData);
        return batch.commit().then(() => _docID);
        // this.productsCollection.doc(_docID).set(_productData);
        // this.productCategoriesCollection.doc(`${_cat}/products/${_docID}`).set(_productData);
        // this.userProductsCollection.doc(`${this._userID}/products/${_docID}`).set(_productData);

    }

    // TODO: NEEDS TO RETURN CONFIRMATION / TRUE
    updateProduct(key: string, newProductData: {}) {
        return this.productsCollection.doc(key).update(newProductData);
    }

    // TODO: TEST bATCH
    // TODO: TEST RETURN CONFIRMATION / TRUE
    deleteProduct(productID: string, category: string) {
        const batch = this.afs.firestore.batch();
        batch.delete(this.productsCollection.doc(productID).ref);
        batch.delete(this.userProductsCollection.doc(`${this._userID}/products/${productID}`).ref);
        batch.delete(this.productCategoriesCollection.doc(`${category}/products/${productID}`).ref);
        return batch.commit();
        // this.productsCollection.doc(productID).delete();
        // this.productCategoriesCollection.doc(`${category}/products/${productID}`).delete();
        // this.userProductsCollection.doc(`${this._userID}/products/${productID}`).delete();
    }
    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    // TODO: TEST THESE!!!
    // TODO: IMPLEMENT ALGOLIA!!!
    getProductByProductId(productID: string): Observable<any> {
        // return this.afs.collection('products', ref => ref.where('id', '==', productID)).valueChanges();
        // return this.productsCollection.doc(productID).valueChanges();
        return Observable.create((observer: any) => {
            this.afs.collection('products', ref => ref.where('id', '==', productID))
                .valueChanges()
                .subscribe(prod => {
                    observer.next(prod[0]);
                    // console.log(prod[0]);
                });
        });
    }

    getProductsByUserID(userID: string): Observable<any> {
        // `${_userID}/products/${_docID}`
        // if (!userID) userID = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        return this.userProductsCollection.doc(userID).collection('products').valueChanges();
    }

    getProductsByUserName(name: string): Observable<any> {
        return;
    }

    getProductsByCategory(category: string): Observable<any> {
        console.log(category);
        return this.productCategoriesCollection.doc(category).collection('products').valueChanges();
    }

    getProductsByUserTitle(title: string): Observable<any> {
        return;
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

/*

    private getKeyByCategoryId(_category: string) {
        // var cat = "";
        // return Object.keys(PostCategory).find(key => PostCategory[key] === _category)
        return;
    }

    private getCategoryString(category: any): string {
        switch(category) {
            case ProductCategory.Apparel:
                return "Idea";
            case ProductCategory.Meetup:
                return "Meetup";
            case ProductCategory.Social:
                return "Social";
            case ProductCategory.Question:
                ProductCategory "Question";
            case Category.Other:
                return "Other";
        }
        return "";
    }
}

// Apparel,
// Electronics,
// Food,
// Houseware,
// Software,

// Other
*/
