// import { Injectable, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import * as firebase from 'firebase/app';
// import { AFService } from './af.service';
// import { Subject } from 'rxjs/Subject';
// import { StateStore } from "../_stores/state.store";
// import { User } from '../_models/user';

// @Injectable()
// export class FollowerService implements OnInit {

//     _followers: FirebaseListObservable<any>;
//     _following: FirebaseListObservable<any>;
//     user: User;
//     firebaseRef : firebase.database.Reference;

//     constructor(private db: AngularFireDatabase, 
//                 public afService : AFService) {}

//     ngOnInit(): void {
//         let _user = this.afService.getAppUser();
//         this.user = (_user) ? _user : null;
//         let userID = _user.uid;
//         this._followers = this.db.list(`/follow/${userID}/followers`);
//         this._following = this.db.list(`/follow/${userID}/following`);
//             // this._followers = this.getFollowers(this.user.uid);
//             // this._following = this.getFollowing(this.user.uid);
//     }

//     getFollowers(userID : string): FirebaseListObservable<any> {
//         return this.db.list(`/follow/${userID}/followers`);
//         // return this._followers;
//     }
    
//     getFollowing(userID : string): FirebaseListObservable<any> {
//         return this.db.list(`/follow/${userID}/following`);
//         // return this._following;
//     }
    
//     // addFollower(followerID: string, followingID: string) {
//     //     var followKey = this.db.database.ref(`/follow/${followerID}`).push().key;
//     //     this.db.database.ref(`/follow/${followerID}/following/${followKey}`).update({followingID : followingID})
//     //     this.db.database.ref(`/follow/${followingID}/followers/${followKey}`).update({followerID : followerID})
//     // }

//     addFollower(follower: {}, followee: {}) {
//         var followKey = this.db.database.ref(`/follow/${follower["id"]}`).push().key;
//         this.db.database.ref(`/follow/${follower["id"]}/following/${followKey}`).update(followee);
//         this.db.database.ref(`/follow/${followee["id"]}/followers/${followKey}`).update(follower);
//     }

//     removeFollower(followerID: string, followingID: string) {
//         var query = firebase.database().ref(`follow/${followerID}/following`).orderByKey();
//         var followerKey = "";
//         query.once("value").then(snapshot => {
//             snapshot.forEach((childSnapshot : any) => {
//                 var curKey = childSnapshot.key;
//                 var childID = childSnapshot.val().id;
//                 console.log("not yet true");              
//                 console.log(childID + " " + followingID);
//                 if (followingID === childID) { 
//                     followerKey = curKey;
//                     console.log("true");
//                     firebase.database().ref(`follow/${followerID}/following/${curKey}`).remove();
//                     firebase.database().ref(`follow/${followingID}/followers/${curKey}`).remove();
//                     return true;
//                 }
//           });
//         });
//     }
// }