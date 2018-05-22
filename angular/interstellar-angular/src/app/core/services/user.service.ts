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
     * @returns Promise
     */
    getAllUsers() { // : Promise<string> {
        // return this.usersCollection;
        return this._httpService.httpGetRequest(this._userRouteAPIUrl); // then(res => console.log(res));
    }

    /**
     * @returns Observable
     */
    // todo: TEST INVALID USER
    getCurrentUser(_publicKey: string = ''): Observable<any> {
        let _keyLoginId = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        if (_keyLoginId) {
            return this.getUserByID(_keyLoginId);
        } else if (_keyLoginId = sessionStorage.getItem('public_key') || localStorage.getItem('public_key') || _publicKey) {
            const urlString = `${this._userRouteAPIUrl}/pkeys/${_keyLoginId}`;
            return Observable.fromPromise(this._httpService.httpGetRequestWithArgs(urlString)
                .then((res: any) => JSON.parse(res))
                .then((res: object) => {
                    // return observer.next('no current user');
                    // return observer.next(observer.error('nop user'));
                    const id = res['id'];
                    sessionStorage.setItem('user_doc_id', id);
                    return res;
                }
            ));
        } else {
            console.log('no user');
            return Observable.create((observer: any) => observer.error('no current user'));
        }
    }

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
    deleteUser(userID: string) { // : Observable<any>
        const urlString = `${this._userRouteAPIUrl}/${userID}`;
        return this._httpService.httpDeleteRequest(urlString); // then(res => console.log(res));
    }

    /**
     * @param  {{}} userData
     * @returns Observable
     */
    updateProfile(userData: string): Observable<any> {
        const obj = JSON.parse(userData);
        const userID = obj.id;
        const data = obj.data;
        const urlString = `${this._userRouteAPIUrl}/${userID}`;
        // console.log(data);
        return Observable.fromPromise(this._httpService.httpPostRequest(urlString, data).toPromise().then(res => res));
        // .toPromise(); // .then(res => console.log(res)); // .then(res => res));
        // return Observable.fromPromise(this._httpService.httpPostRequest(urlString, data)); // .then(res => res));
        // return Observable.fromPromise(
        //     this.usersCollection
        //         .doc(ID)
        //         .set(data, {merge: true}));
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
    getUserByID(userID: string): Observable<any> { // : Promise<any> {
        const urlString = `${this._userRouteAPIUrl}/${userID}`;
        // return this.usersCollection.doc(userID).valueChanges(); // .map(user => <User>user);
        return this._httpService.httpGetRequest(urlString); // .first().map(user => <User> JSON.parse(user));
        // return Observable.create(observer =>
        //     this._httpService.httpGetRequest(urlString).first().map(user => observer.next(<User> JSON.parse(user))));
    }

    // todo
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
