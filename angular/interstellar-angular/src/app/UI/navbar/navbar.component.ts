import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AFService } from '../../../_services/af.service';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase/app';
import { MatSidenav } from '@angular/material';
import { EventEmitterService } from '../../event-emitter.service';
import { StellarAccountService } from 'app/stellar';

@Component({
  selector: 'nav-bar',
  styleUrls: ['./navbar.css'],
  templateUrl: './navbar.html',
  providers: [ ]
})

export class NavBarComponent implements OnInit {

    public currentPage: string;
    private loggedIn : boolean;
    private user: firebase.User;
    public sideNav2: any;

    @ViewChild('sidenav') public sideNav: MatSidenav;
    constructor(public router: Router,
                private _eventEmiter: EventEmitterService,
                private _stellarAccountService: StellarAccountService) {

                    this.loggedIn = (sessionStorage.getItem("seed_key")) ? true : false;
                    this.currentPage = "home";
            }
            
    ngOnInit(): void {
        document.getElementById(this.currentPage).style.textDecoration = "underline";
        this._eventEmiter.dataStr.subscribe((data: any) => {
                if (data.message === "logout") this.loggedIn = false;
                else if (data.message === "login") {
                    // this.loggedIn = true;
                    console.log(data);
                    this.handleLogin(data.data);
                }
                else return;
        });
    }
    
    //SCYQVVSG2G4LUOQX4LQ2EF4DKWOZ6E5YEKC6USNUWKN55337RNUYSCGI
    login = (secretKey: string) => {
        if (secretKey) {
            this._stellarAccountService.authenticate(secretKey).subscribe(
                res => this.handleLogin(res),
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
        this.changePage("home")
        this.loggedIn = false;
    }

    handleLogin = (payload: any) : void => {
        this.loggedIn = true;
        sessionStorage.setItem("my_balances", JSON.stringify(null));
        sessionStorage.setItem("my_balances", JSON.stringify(payload)); 
        this.loggedIn = true;
        this.changePage("profile")
    } 


    toggle = () : void => { //sideNav: any
        this.sideNav.toggle();
    }

    toggle2 = (sideNav: any) : void => { //sideNav: any
        sideNav.toggle();
    }

    //handle AuthGuard
    changePage(nextPage: string) {
        if (document.getElementById(this.currentPage))
            document.getElementById(this.currentPage).style.textDecoration = "none";
        this.currentPage = nextPage;
        document.getElementById(this.currentPage).style.textDecoration = "underline";
        if (this.sideNav.opened) this.sideNav.close();
        this.router.navigate(['/' + nextPage]);        
    }
}
