import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/fromPromise';
import { User } from 'app/user/user';
import { HttpService } from './http.service';

@Injectable()
export class UserService {

    private _userRouteAPIUrl = 'api/users';
    public currentUser: User;
    private usersCollection: AngularFirestoreCollection<User>;

    constructor(private afs: AngularFirestore,
                private _httpService: HttpService) {
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
    getAllUsers() { // : AngularFirestoreCollection<User>
        return this.usersCollection;
        // return this._httpService.httpGetRequest(this._userRouteAPIUrl).toPromise();
    }

    getAllUsers2(): Promise<string> { // : AngularFirestoreCollection<User>
        return this._httpService.httpGetRequest(this._userRouteAPIUrl); // then(res => console.log(res));
    }

    /**
     * @returns Observable
     */
    getCurrentUser(_publicKey: string = ''): Observable<any> {
        let _keyLoginId = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        if (_keyLoginId) {
            console.log(_keyLoginId);
            return this.usersCollection.doc(_keyLoginId).valueChanges();
        } else if (_keyLoginId = sessionStorage.getItem('public_key') || localStorage.getItem('public_key') || _publicKey) {
            return Observable.create((observer: any) => {
                this.afs.collection('users', ref => ref.where('publicKey', '==', _publicKey || _keyLoginId))
                    .valueChanges()
                    .first()
                    .subscribe((user: Array<User>) => {
                        // console.log(user[0]);
                            if (user[0]) {
                                sessionStorage.setItem('user_doc_id', user[0].id);
                                // console.log('a');
                                return observer.next(user[0]);
                            } else {
                                // console.log('b');

                                // return observer.next('no current user');
                                // return observer.next(observer.error('nop user'));
                            }
                });
            });
        } else {
            // console.log('c');
            return Observable.create((observer: any) => observer.error('no current user'));
            // return Observable.create((observer: any) => observer.next());
        }
        // console.log('no user');
    }

    // getCurrentUser2(publicKey: string): Observable<any> {
    //         return Observable.create((observer: any) => {
    //             console.log(observer);
    //             this.afs.collection('users', ref => ref.where('publicKey', '==', publicKey || _keyLoginId))
    //                 .valueChanges()
    //                 .first()
    //                 .subscribe((user: Array<User>) => {
    //                     if (user[0]) {
    //                         sessionStorage.setItem('user_doc_id', user[0].id);
    //                         return observer.next(user[0]);
    //                         // console.log('a')
    //                     } else {
    //                         // console.log('b')
    //                         return observer.next(observer.error('nop user'));
    //                     }
    //                 });
    //         });
    //     }
    //     // console.log('no user');
    // }

    /**
     * @param  {any} user
     * @param  {boolean} localStore
     * @returns Observable
     */
    addUser(user: any, localStore: boolean) {
        const _docID = this.afs.createId();
        if (localStore) {
            localStorage.setItem('user_doc_id', _docID);
        }
        sessionStorage.setItem('user_doc_id', _docID);
        user.id = _docID;
        return this._httpService.httpPostRequest(this._userRouteAPIUrl, user);
        // return Observable.fromPromise(this.usersCollection.doc(_docID).set(user));
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
    updateProfile(userData: string): Observable<any> {
        // console.log(userData);
        const obj = JSON.parse(userData);
        // console.log(obj);
        const ID = obj.id;
        const data = obj.data;
        // console.log(ID);
        // console.log(obj.data);
        console.log(data);
        return Observable.fromPromise(
            this.usersCollection
                .doc(ID)
                .set(data, {merge: true}));
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
    getUserByID(userID: string): Promise<any> {
        const urlString = `${this._userRouteAPIUrl}/${userID}`;
        // return this.usersCollection.doc(userID).valueChanges(); // .map(user => <User>user);
        return this._httpService.httpGetRequest(urlString);
        // .then(res => {
        //     console.log(res)
        //     return res;
        // });
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
