//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 *  1 - NEED TO ABSTRACT OUT OF NAV COMPONENT - TOO MUCH GOING ON THERE
 */
//

import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { StellarAccountService } from 'app/stellar';


@Injectable()
export class AuthService  {

    private _isLoggedIn: boolean;

    constructor(private _stellarAccountService: StellarAccountService) {

                    this._isLoggedIn = (sessionStorage.getItem('seed_key') ||
                                     localStorage.getItem('seed_key'))
                                     ? true : false;
    }

    isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    login = (secretKey: string) => {
        return this._stellarAccountService
                        .authenticate(secretKey)
                        .subscribe(
                            res => this.handleLogin(JSON.stringify(res)),
                            // err => alert('There was an error: \n' + err));
                            err => JSON.stringify(err));
    }


    // logout = (): void => {
    //     sessionStorage.clear();
    //     localStorage.clear();
    //     this.changePage('home');
    //     this.loggedIn = false;
    // }

    handleLogin = (payload: string = '') => {
        this._isLoggedIn = true;
        if (payload) {
            console.log(payload);
            sessionStorage.setItem('my_balances', payload);
        }
        return 'success';
        /*
        this._userService
                .getCurrentUser()
                .first()
                .subscribe(user => {
                    this.user = user;
                    console.log(user);
                    const userID = user.id;
                    */
    }

}
