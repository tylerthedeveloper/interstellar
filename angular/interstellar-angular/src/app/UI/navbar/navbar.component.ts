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


    @ViewChild('sidenav') public sideNav: MatSidenav;
    constructor(public router: Router,
                private _eventEmiter: EventEmitterService,
                private _stellarAccountService: StellarAccountService) {

                this.currentPage = "home";
                this.loggedIn = (sessionStorage.getItem("seed_key")) ? true : false;
    }
    
    ngOnInit(): void {
        document.getElementById(this.currentPage).style.textDecoration = "underline";
        this._eventEmiter.dataStr.subscribe(data => {
            //     this.loggedIn = !this.loggedIn;
            if (data === "logout") this.loggedIn = false;
            else this.loggedIn = true;
        });
    }

    // setDataStr() {
    //     this._eventEmiter.dataStr.subscribe(data => console.log(data))
    // }
    
    //SCYQVVSG2G4LUOQX4LQ2EF4DKWOZ6E5YEKC6USNUWKN55337RNUYSCGI
    login = (secretKey: string) => {
        if (secretKey) {
            this._stellarAccountService.authenticate(secretKey).subscribe(
                res => { 
                    this.loggedIn = true;
                    this.changePage("profile")
                },
                err => alert("There was an error: \n" + err));
        } else {
            alert("Please enter a key")
        }
    }

    signUp = () : void => {
        this.changePage("register");
    }

    logout = () : void => {
        this.loggedIn = false;
        sessionStorage.clear();
        this.changePage("home")
    }

    // createNewAccount = () : void => {
    //     this.loggedIn = false;
    // }

    // mergeAccountWithKey = (secretKey: string) : void => {
    //     this.loggedIn = false;
    // }

    toggle = () : void => { //sideNav: any
        this.sideNav.toggle();
    }

    //handle AuthGuard
    changePage(nextPage: string) {
        document.getElementById(this.currentPage).style.textDecoration = "none";
        this.currentPage = nextPage;
        document.getElementById(this.currentPage).style.textDecoration = "underline";
        if (this.sideNav.opened) this.sideNav.close();
        this.router.navigate(['/' + nextPage]);        
    }
}
