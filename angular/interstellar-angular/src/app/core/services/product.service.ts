//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 * TODO: STATE MANAGEMENT ... ALL SERVICES
 * TODO: TEST bATCH and TEST RETURN CONFIRMATION / TRUE
 *
 */
//


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

import { ProductCategory } from 'app/marketplace/_market-models/product-category';
import { Product } from 'app/marketplace/_market-models/product';
import { User } from 'app/user/user';
import { HttpService } from './http.service';


@Injectable()
export class ProductService {

    private _productRouteAPIUrl = 'api/products';

    /** AFS Collections */
    private productsCollection: AngularFirestoreCollection<Product>;
    private productCategoriesCollection: AngularFirestoreCollection<ProductCategory>;
    private userProductsCollection: AngularFirestoreCollection<User>;
    private myProductRef: firebase.firestore.CollectionReference;

    private _userID: string;

    constructor(private _httpService: HttpService,
                private afs: AngularFirestore) {
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

    /**
     * @returns Observable
     */
    getAllProducts() {
        // return this.productsCollection.valueChanges();
        return this._httpService.httpGetRequest(this._productRouteAPIUrl)
                .map(products => JSON.stringify(products))
                .map(products => <Array<Product>> JSON.parse(products)); // then(res => console.log(res));
    }

    /**
     * @returns string
     */
    getNewProductID(): string {
        const _newProductID = this.afs.createId();
        return _newProductID;
    }

    /**
     * @param  {string} productData
     * @returns Promise
     */
    addProduct(productData: string): Promise<string> {
        const _productData = JSON.parse(productData);
        // const _docID = _productData.id;
        // const _cat = _productData.productCategory;
        // const batch = this.afs.firestore.batch();
        // batch.set(this.productsCollection.doc(_docID).ref, _productData);
        // batch.set(this.userProductsCollection.doc(this._userID).collection('products').doc(_docID).ref, _productData);
        // batch.set(this.productCategoriesCollection.doc(_cat).collection('products').doc(_docID).ref, _productData);
        // return batch.commit().then(() => _docID);
        return this._httpService.httpPostRequest(this._productRouteAPIUrl, _productData)
                .toPromise()
                .then(res => {
                    console.log(res)
                    return res;
                })
                // .then(res => res);
                // .then(res => JSON.parse(res))
    //             .then(res => {
    //                 const prod = JSON.parse(res.then(prod => prod));
    //                 console.log(res);
    //     return res['id'];
    // });
    }

    /**
     * @param  {string} key
     * @param  {{}} newProductData
     * @returns Promise
     */
    updateProduct(key: string, newProductData: {}): Promise<void> {
        return this.productsCollection.doc(key).update(newProductData);
    }

    /**
     * @param  {Array<any>} pairArray
     * @returns Observable
     */
    updateProductQuantities(pairArray: Array<any>): Promise<any> {
        const batch = this.afs.firestore.batch();
        pairArray.map(pair => {
            const prodID = pair.productID;
            const sellerID = pair.sellerID;
            const newProdQuant = pair.newQuantity;
            const category = pair.category;
            const quantPairDict = {quantity: newProdQuant};
            console.log(newProdQuant);
            batch.update(this.productsCollection.doc(prodID).ref, quantPairDict);
            batch.update(this.userProductsCollection.doc(sellerID).collection('products').doc(prodID).ref, quantPairDict);
            batch.update(this.productCategoriesCollection.doc(category).collection('products').doc(prodID).ref, quantPairDict);
        });
        return batch.commit();
    }

    /**
     * @param  {string} productID
     * @param  {string} category
     * @returns Promise
     */
    deleteProduct(productID: string, category: string): Promise<void> {
        const batch = this.afs.firestore.batch();
        batch.delete(this.productsCollection.doc(productID).ref);
        batch.delete(this.userProductsCollection.doc(`${this._userID}/products/${productID}`).ref);
        batch.delete(this.productCategoriesCollection.doc(`${category}/products/${productID}`).ref);
        return batch.commit();
    }
    // ────────────────────────────────────────────────────────────────────────────────



    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    /**
     // TODO: TEST THESE and IMPLEMENT ALGOLIA!!!
     * @param  {string} productID
     * @returns Observable
     */
    getProductByProductId(productID: string): Observable<any> {
        return Observable.create((observer: any) => {
            this.afs.collection('products', ref => ref.where('id', '==', productID))
                .valueChanges()
                .subscribe(prod => {
                    observer.next(prod[0]);
                });
        });
    }

    getProductQuantity(productID: string) {
        return Observable.create((observer: any) => {
            // this.productsCollection
            this.afs.collection('products', ref => ref.where('id', '==', productID))
                .valueChanges()
                .subscribe(prod => {
                    // const _product = prod as Product;
                    console.log(prod);
                    observer.next(prod[0]);
                });
        });
    }

    /**
     * @param  {string} userID
     * @returns Observable
     */
    getProductsByUserID(userID: string): Observable<any> {
        return this.userProductsCollection.doc(userID).collection('products').valueChanges();
    }

    getProductsByUserName(name: string): Observable<any> {
        return;
    }

    /**
     * @param  {string} category
     * @returns Observable
     */
    getProductsByCategory(category: string): Observable<any> {
        return this.productCategoriesCollection.doc(category).collection('products').valueChanges();
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
