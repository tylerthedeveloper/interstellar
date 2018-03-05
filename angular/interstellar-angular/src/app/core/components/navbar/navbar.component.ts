import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { MatSidenav } from '@angular/material';
import { StellarAccountService } from 'app/stellar';
import { EventEmitterService } from 'app/core/_helpers/event-emitter.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'nav-bar',
  styleUrls: ['./navbar.css'],
  templateUrl: './navbar.html',
  providers: [ ]
})

export class NavBarComponent implements OnInit {

    
    public currentPage: string;;
    private loggedIn : boolean;
    private user: firebase.User;
    public sideNav2: any;

    @ViewChild('sidenav') public sideNav: MatSidenav;
    constructor(public router: Router,
                private _eventEmiter: EventEmitterService,
                private _stellarAccountService: StellarAccountService) {

                    if (sessionStorage.getItem("seed_key")) this.loggedIn = true;
                    else if (localStorage.getItem("seed_key")) this.loggedIn = true;
                    else this.loggedIn = false;
                    this.currentPage = (this.currentPage) ? this.currentPage : "home";
                    console.log(router.routerState)
                }            
                
    ngOnInit(): void {

        //let curPage = window.location.pathname.substr(1);
        // this.currentPage = curPage;        
        
        document.getElementById(this.currentPage).style.textDecoration = "underline";
        this._eventEmiter.dataStr.subscribe((data: any) => {
                if (data.message === "category") this.selectCategory(data.category);                
                else if (data.message === "logout") this.loggedIn = false;
                else if (data.message === "login") {
                    console.log(data);
                    this.handleLogin();
                }
                else if (data.message === "unauthenticated")
                    alert("You must be logged in to view your profile")
                else alert("There was an unknown error");
        });
    }

    //SCTV5MXK6GSZQFKHSU52IQI7V332QOA6GICBWHOC2IHGMA5WU3OMEPUD
    //SCYQVVSG2G4LUOQX4LQ2EF4DKWOZ6E5YEKC6USNUWKN55337RNUYSCGI
    login = (secretKey: string) => {
        if (secretKey) {
            this._stellarAccountService.authenticate(secretKey).subscribe(
                res => this.handleLogin(JSON.stringify(res)),
                err => alert("There was an error: \n" + err));
        } else {
            alert("Please enter a key")
        }
    }

    signUp = () : void => {
        this.changePage("register");
    }

    logout = () : void => {
        sessionStorage.clear();
        localStorage.clear();
        this.changePage("home")
        this.loggedIn = false;
    }

    handleLogin = (payload: string = "") : void => {
        this.loggedIn = true;
        if (payload) { 
            console.log(payload);
            sessionStorage.setItem("my_balances", payload);
        }
        this.changePage("profile");
    } 

    toggle = () : void => { //sideNav: any
        this.sideNav.toggle();
    }

    toggle2 = (sideNav: any) : void => { //sideNav: any
        sideNav.toggle();
    }

    selectCategory(category: string): any {
        this.router.navigate(['/categories', category]);
    }

    //handle AuthGuard
    changePage(nextPage: string) {
        // console.log(this.activatedRoute.snapshot)
        // console.log(this.router.url)

        if (nextPage === "profile" && !this.loggedIn) return;
        if (document.getElementById(this.currentPage))
            document.getElementById(this.currentPage).style.textDecoration = "none";
        this.currentPage = nextPage;
        document.getElementById(this.currentPage).style.textDecoration = "underline";
        if (this.sideNav.opened) this.sideNav.close();
        this.router.navigate(['/' + nextPage]);
    }
}
