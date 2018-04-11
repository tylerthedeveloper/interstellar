import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { StellarAccountService } from 'app/stellar';
import { EventEmitterService } from 'app/core/_helpers/event-emitter.service';
import { Router } from '@angular/router';
import { UserService } from 'app/core/services';


@Component({
  selector: 'app-nav-bar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html',
  providers: [ ]
})

    // Here is your private key: SBF3AGT4ZUWWPE53NRZLNTBWGHT7KTNA4TS3VN43THHWFOAZVTV7RPFP
    // Here is your private key: SA5BD2TGFY47SHJOPYXWJMWZ5NI6F7QICMH43PWCJAFBSNOXBVBZAGMC

export class NavBarComponent implements OnInit {

    private _userID;
    private _secretKey;
    public currentPage: string;
    private loggedIn: boolean;

    @ViewChild('sidenav') public sideNav: MatSidenav;
    constructor(public router: Router,
                private _userService: UserService,
                private _stellarAccountService: StellarAccountService,
                private _eventEmiter: EventEmitterService) {}

    ngOnInit(): void {
        this._secretKey = (sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key'));
        // TODO: test subcription and entry
        this._userID = (sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id'));
        // todo: test this works with speed on callback
        this.loggedIn = (this._secretKey && this._userID) ? true : false;
        console.log(this._secretKey);
        console.log(this._userID);
        console.log(this.loggedIn);
        // console.log(sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key'))
        this.currentPage = (this.currentPage === '') ? this.currentPage : 'home';
        document.getElementById(this.currentPage || 'home').style.textDecoration = 'underline';
        this._eventEmiter.dataStr.subscribe((data: any) => {
                if (data.message === 'logout') {
                    this.loggedIn = false;
                } else if (data.message === 'login') {
                    console.log(data);
                    this.handleLogin();
                } else if (data.message === 'unauthenticated') {
                    alert('You must be logged in to view your profile');
                } else {
                    alert('There was an unknown error');
                }
        });
    }

    //
    // ──────────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: A U T H E N T I C A T I O N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * @param  {string} secretKey
     */
    login = (secretKey: string) => {
        if (secretKey) {
            this._stellarAccountService.authenticate(secretKey).subscribe(
                res => this.handleLogin(JSON.stringify(res)),
                err => alert('There was an error: \n' + err));
        } else {
            alert('Please enter a key');
        }
    }

    /**
     * @returns void
     */
    logout = (): void => {
        sessionStorage.clear();
        localStorage.clear();
        this.changePage('home');
        this.loggedIn = false;
    }

    /**
     * @param  {string=''} payload
     * @returns void
     */
    handleLogin = (payload: string = ''): void => {
        this.loggedIn = true;
        if (payload) {
            console.log(payload);
            sessionStorage.setItem('my_balances', payload);
        }
        this._userService.getCurrentUser().subscribe(currentUser => {
            // console.log(currentUser);
            this._userID = currentUser.id;
            this.changePage('profile');
        });
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ──────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: N A V   P A G E   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────────
    //

    /**
     * @param  {string} nextPage
     * @returns void
     */
    changePage(nextPage: string): void {
        // console.log(this.router.url)
        // console.log(this.router.routerState)

        if (nextPage === 'profile' && !this.loggedIn) {
            return;
        } else if (nextPage === 'profile' && this.loggedIn) {
            nextPage = `people/${this._userID}/me`;
        }
        console.log(nextPage);
        if (document.getElementById(this.currentPage)) {
            document.getElementById(this.currentPage).style.textDecoration = 'none';
        }
        this.currentPage = nextPage;
        // TODO....
        // this.loggedIn = true;
        // console.log(this.currentPage)
        if (document.getElementById(this.currentPage)) {
            document.getElementById(this.currentPage).style.textDecoration = 'underline';
        }
        if (this.sideNav.opened) { this.sideNav.close(); }
        this.router.navigate(['/' + nextPage]);
    }
    // ────────────────────────────────────────────────────────────────────────────────
}
