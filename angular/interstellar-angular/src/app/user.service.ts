import { Injectable, OnInit } from '@angular/core';

// import { User, Follower } from '../_models/index';
// import { FollowerService } from '../_services/follower.service';
// import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { User } from './user';

declare var GeoFire: any;

@Injectable()
export class UserService {

    firebaseRef : firebase.database.Reference;

    // constructor(public database: AngularFireDatabase) {
    constructor() {
                    // this.firebaseRef = firebase.database().ref('locations');
                }


    //                  //
    //    Other Users   //
    //                  //
    getAllUsers() : FirebaseListObservable<any> {
        return this.database.list('/users');
    }

    getUserByFbID(uid : string) : Observable<any> {
        return this.database.object(`/users/${uid}`).take(1);
    }

    getUserByName(name : string) : Observable<any> {
        if (name === "") return this.getAllUsers();
        return this.database.list('/users', {
            query: {
                orderByChild: 'name',
                equalTo: name
            }
        }).take(1);
    }

    getUserByPubKey(pubKey: string) : Observable<any> {
        if (name === "") return this.getAllUsers();
        return this.database.list('/users', {
            query: {
                orderByChild: 'public_key',
                equalTo: pubKey
            }
        }).take(1);
    }


    //                    //
    //    User Profile    //
    //                    //
    updateProfile(user : User) : Observable<any> {
        return Observable.fromPromise(this.database.object(`/users/${user.uid}`).update(user));
    }
    
}
