import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { StellarAccountService } from 'app/stellar';
import { EventEmitterService } from 'app/core/_helpers/event-emitter.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  styleUrls: ['./navbar.css'],
  templateUrl: './navbar.html',
  providers: [ ]
})

export class NavBarComponent implements OnInit {

    public currentPage: string;
    private loggedIn: boolean;

    @ViewChild('sidenav') public sideNav: MatSidenav;
    constructor(public router: Router,
                private _stellarAccountService: StellarAccountService,
                private _eventEmiter: EventEmitterService) {

                    this.loggedIn = (sessionStorage.getItem('seed_key') ||
                                     localStorage.getItem('seed_key'))
                                     ? true : false;
                    this.currentPage = (this.currentPage) ? this.currentPage : 'home';
                }

    ngOnInit(): void {
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
        this.changePage('profile');
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

        if (nextPage === 'profile' && !this.loggedIn) { return; }
        if (document.getElementById(this.currentPage)) {
            document.getElementById(this.currentPage).style.textDecoration = 'none';
        }
        this.currentPage = nextPage;
        document.getElementById(this.currentPage).style.textDecoration = 'underline';
        if (this.sideNav.opened) { this.sideNav.close(); }
        this.router.navigate(['/' + nextPage]);
    }
    // ────────────────────────────────────────────────────────────────────────────────
}
