import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { MatSidenav } from '@angular/material';
import { StellarAccountService } from 'app/stellar';
import { EventEmitterService } from 'app/core/_helpers/event-emitter.service';


@Injectable()
export class AuthService  {

    private _isLoggedIn: boolean;
    private user: firebase.User;

    constructor(private _eventEmiter: EventEmitterService,
                private _stellarAccountService: StellarAccountService) {

                    this._isLoggedIn = (sessionStorage.getItem('seed_key') ||
                                     localStorage.getItem('seed_key'))
                                     ? true : false;
    }

    //     this._eventEmiter.dataStr.subscribe((data: any) => {
    //             // if (data.message === 'category') {
    //             //     this.selectCategory(data.category);
    //             // } else
    //             if (data.message === 'logout') {
    //                 this.loggedIn = false;
    //             } else if (data.message === 'login') {
    //                 console.log(data);
    //                 this.handleLogin();
    //             } else if (data.message === 'unauthenticated') {
    //                 alert('You must be logged in to view your profile');
    //             } else {
    //                 alert('There was an unknown error');
    //             }
    //     });
    // }

    isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    // SCTV5MXK6GSZQFKHSU52IQI7V332QOA6GICBWHOC2IHGMA5WU3OMEPUD
    // SCYQVVSG2G4LUOQX4LQ2EF4DKWOZ6E5YEKC6USNUWKN55337RNUYSCGI
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
