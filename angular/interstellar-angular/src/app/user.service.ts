import { Injectable, OnInit } from '@angular/core';

// -- import { AngularFireDatabase, AngularFireObject , AngularFireList  } from 'angularfire2/database-deprecated';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { User } from './user';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/fromPromise';
// declare var GeoFire: any;

@Injectable()
export class UserService {

    // firebaseRef : firebase.database.Reference;
    public currentUser: User;
    private usersCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore) {
        this.usersCollection = afs.collection<User>('users');
    }

    getAllUsers = (): AngularFirestoreCollection<User> => {
        return this.usersCollection;
    }

    getCurrentUser = (): Observable<any> => {
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
                    .subscribe((user: Array<User>) =>  {
                        observer.next(user[0]);
                        sessionStorage.setItem('user_doc_id', user[0].id);
                        console.log(user[0]);
                    });
            });
        }
    }

    getUserByID = (userID: string): Observable<User> => {
        return this.usersCollection.doc(userID).valueChanges().map(user => <User>user);
    }

    getUsersByQuery = (queryPayload: any): Observable<any> => {
        const node = queryPayload.queryNode;
        const attribute = queryPayload.queryAttribute;
        const operator = queryPayload.queryOperator;
        const value = queryPayload.queryValue;
        return this.afs.collection(node, ref => ref.where(attribute, operator, value)).valueChanges();
    }

    addUser = (user: any, localStore: boolean): Observable<any> => {
        const _docID = this.afs.createId();
        console.log(_docID);
        console.log(localStore);
        if (localStore) {
            localStorage.setItem('user_doc_id', _docID);
            console.log('in local store');
        }
        sessionStorage.setItem('user_doc_id', _docID);
        // const _user: User = {
        //                         id: _docID,
        //                         publicKey:
        //                     };
        // console.log(sessionStorage.getItem("user_doc_id");
        // console.log(localStorage.getItem("user_doc_id"));
        user.id = _docID;
        return Observable.fromPromise(this.usersCollection.doc(_docID).set(user));
    }

    deleteUser = (user: User):  Observable<any> => {
        return Observable.fromPromise(this.usersCollection.doc(user.id).delete());
    }

    updateProfile(userData: {}): Observable<any> {
        console.log(userData);
        console.log(userData['id']);
        console.log(userData['data']);
        return Observable.fromPromise(
                this.usersCollection
                    .doc(userData['id'])
                    .update(userData['data']));
    }

}

  // getUserByFbID(uid : string) {}}

    // getUserByName(userName : string) : Observable<any> {
    //     if (userName === "") return;
    //     return this.afs.collection('users', ref => ref.where('username', '==', username)).valueChanges();
    // }

    // getUserByPubKey(pubKey: string) : Observable<any> {
    //     if (name === "") return this.getAllUsers();
    //     return this.database.list('/users', {
    //         query: {
    //             orderByChild: 'public_key',
    //             equalTo: pubKey
    //         }
    //     }).take(1);
    // }
