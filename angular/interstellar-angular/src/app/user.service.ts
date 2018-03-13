import { Injectable, OnInit } from '@angular/core';

//-- import { AngularFireDatabase, AngularFireObject , AngularFireList  } from 'angularfire2/database-deprecated';
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

    //firebaseRef : firebase.database.Reference;
    public currentUser: User;
    private usersCollection: AngularFirestoreCollection<User>;
    
    constructor(private afs: AngularFirestore) {
        this.usersCollection = afs.collection<User>('users');
    }

    getAllUsers = () : AngularFirestoreCollection<User> => {
        return this.usersCollection;
    }

    getCurrentUser = () : Observable<any> => {
        //
        //if (this.currentUser) return this.currentUser;
        //

        let _curUserDocID = sessionStorage.getItem("user_doc_id");
        if (!_curUserDocID) localStorage.getItem("user_doc_id");
        // console.log(_curUserDocID)
        //return this.usersCollection.doc(_curUserDocID).valueChanges().first();
        let _pKey = sessionStorage.getItem("public_key");        
        if (!_pKey) localStorage.getItem("public_key");
        return Observable.create((observer : any) => {
            this.afs.collection("users", ref => ref.where("publicKey", "==", _pKey))
                .valueChanges()
                .first()
                .subscribe(user =>  {
                    observer.next(user[0])
                    console.log(user[0])
                });
        });
    }
    
    getUsersByID = (userID: string) : Observable<User> => {
        return this.usersCollection.doc(userID).valueChanges().map(user => <User>user);
    }

    getUsersByQuery = (queryPayload: any) : Observable<any> => {
        let node = queryPayload.queryNode;        
        let attribute = queryPayload.queryAttribute;
        let operator = queryPayload.queryOperator;
        let value = queryPayload.queryValue;
        return this.afs.collection(node, ref => ref.where(attribute, operator, value)).valueChanges();
    }
  
    addUser = (user: any, localStore: boolean) : Observable<any> => {
        let _docID = this.afs.createId();
        console.log(_docID);
        console.log(localStore);
        if (localStore) {
            localStorage.setItem("user_doc_id", _docID);
            console.log("in local store");
        }
        sessionStorage.setItem("user_doc_id", _docID);
        // const _user: User = { 
        //                         id: _docID,
        //                         publicKey: 
        //                     };
        // console.log(sessionStorage.getItem("user_doc_id");        
        // console.log(localStorage.getItem("user_doc_id"));        
        user.id = _docID;
        return Observable.fromPromise(this.usersCollection.doc(_docID).set(user));
    }

    deleteUser = (user: User) :  Observable<any> => {
        return Observable.fromPromise(this.usersCollection.doc(user.id).delete());
    }

    updateProfile(user : User) : Observable<any> {
        return Observable.fromPromise(
                this.usersCollection
                    .doc(user.id)
                    .update({user : user}));
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
