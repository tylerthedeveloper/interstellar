import { Injectable, OnInit } from '@angular/core';

//-- import { AngularFireDatabase, AngularFireObject , AngularFireList  } from 'angularfire2/database-deprecated';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { User } from './user';

// declare var GeoFire: any;

@Injectable()
export class UserService {

    firebaseRef : firebase.database.Reference;

    private usersCollection: AngularFirestoreCollection<User>;
    
    constructor(private afs: AngularFirestore) {
        this.usersCollection = afs.collection<User>('users');
    }

    getAllUsers = () : AngularFirestoreCollection<User> => {
        return this.usersCollection;
    }

    getCurrentUser = () : Observable<any> => {
        let _pKey = sessionStorage.getItem("public_key");
        return this.afs.collection("users", ref => ref.where("publicKey", "==", _pKey)).valueChanges();
    }
    
    getUsersByQuery = (queryPayload: any) : Observable<any> => {
        let node = queryPayload.queryNode;        
        let attribute = queryPayload.queryAttribute;
        let operator = queryPayload.queryOperator;
        let value = queryPayload.queryValue;
        return this.afs.collection(node, ref => ref.where(attribute, operator, value)).valueChanges();
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

    addUser = (user: User) : Observable<any> => {
        return Observable.fromPromise(this.usersCollection.add(user));
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
