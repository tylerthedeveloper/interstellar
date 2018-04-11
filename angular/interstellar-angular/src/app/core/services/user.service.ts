import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/fromPromise';
import { User } from 'app/user/user';

@Injectable()
export class UserService {

    public currentUser: User;
    private usersCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore) {
        this.usersCollection = afs.collection<User>('users');
    }

    //
    // ────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   C R U D   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * @returns AngularFirestoreCollection
     */
    getAllUsers(): AngularFirestoreCollection<User> {
        return this.usersCollection;
    }

    /**
     * @returns Observable
     */
    getCurrentUser(): Observable<any> {
        //
        // if (this.currentUser) return this.currentUser;
        //
        let _keyLoginId = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        if (_keyLoginId) {
            console.log(_keyLoginId);
            return this.usersCollection.doc(_keyLoginId).valueChanges();
        } else if (_keyLoginId = sessionStorage.getItem('public_key') || localStorage.getItem('public_key')) {
            return Observable.create((observer: any) => {
                this.afs.collection('users', ref => ref.where('publicKey', '==', _keyLoginId))
                    .valueChanges()
                    .first()
                    .subscribe((user: Array<User>) => {
                        sessionStorage.setItem('user_doc_id', user[0].id);
                        observer.next(user[0]);
                    });
            });
        }
        console.log("no user")
    }

    /**
     * @param  {any} user
     * @param  {boolean} localStore
     * @returns Observable
     */
    addUser(user: any, localStore: boolean): Observable<any> {
        const _docID = this.afs.createId();
        if (localStore) {
            localStorage.setItem('user_doc_id', _docID);
        }
        sessionStorage.setItem('user_doc_id', _docID);
        user.id = _docID;
        return Observable.fromPromise(this.usersCollection.doc(_docID).set(user));
    }
    
    /**
     * @param  {User} user
     * @returns Observable
     */
    deleteUser(user: User): Observable<any> {
        return Observable.fromPromise(this.usersCollection.doc(user.id).delete());
    }

    /**
     * @param  {{}} userData
     * @returns Observable
     */
    updateProfile(userData: {}): Observable<any> {
        console.log(userData);
        console.log(userData['id']);
        console.log(userData['data']);
        return Observable.fromPromise(
            this.usersCollection
                .doc(userData['id'])
                .update(userData['data']));
    }

    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: Q U E R Y   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────
    //
    
    /**
     * @param  {string} userID
     * @returns Observable
     */
    getUserByID(userID: string): Observable<User> {
        return this.usersCollection.doc(userID).valueChanges().map(user => <User>user);
    }

    /**
     * @param  {any} queryPayload
     * @returns Observable
     */
    getUsersByQuery(queryPayload: any): Observable<any> {
        const node = queryPayload.queryNode;
        const attribute = queryPayload.queryAttribute;
        const operator = queryPayload.queryOperator;
        const value = queryPayload.queryValue;
        return this.afs.collection(node, ref => ref.where(attribute, operator, value)).valueChanges();
    }
    // ────────────────────────────────────────────────────────────────────────────────

}