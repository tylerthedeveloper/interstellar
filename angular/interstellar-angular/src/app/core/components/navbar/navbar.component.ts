import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSidenav } from '@angular/material';

import { StellarAccountService } from 'app/stellar';
import { EventEmitterService } from 'app/core/_helpers/event-emitter.service';
import { Router } from '@angular/router';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'nav-bar',
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
                    // console.log(router.routerState)
                }

    ngOnInit(): void {

        // let curPage = window.location.pathname.substr(1);
        // this.currentPage = curPage;

        document.getElementById(this.currentPage).style.textDecoration = 'underline';
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

    login = (secretKey: string) => {
        if (secretKey) {
            this._stellarAccountService.authenticate(secretKey).subscribe(
                res => this.handleLogin(JSON.stringify(res)),
                err => alert('There was an error: \n' + err));
        } else {
            alert('Please enter a key');
        }
    }


    logout = (): void => {
        sessionStorage.clear();
        localStorage.clear();
        this.changePage('home');
        this.loggedIn = false;
    }

    handleLogin = (payload: string = ''): void => {
        this.loggedIn = true;
        if (payload) {
            console.log(payload);
            sessionStorage.setItem('my_balances', payload);
        }
        /*
        this._userService
                .getCurrentUser()
                .first()
                .subscribe(user => {
                    this.user = user;
                    console.log(user);
                    const userID = user.id;
                    */
        this.changePage('profile');
    }

    // handle AuthGuard
    changePage(nextPage: string) {
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
}
