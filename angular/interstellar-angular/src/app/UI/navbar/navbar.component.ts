import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AFService } from '../../../_services/af.service';
import { Observable } from 'rxjs/Observable';
import { RouterModule, Routes, Router, ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase/app';
import { MatSidenav } from '@angular/material';

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
    // constructor(public afService : AFService, ) {
    @ViewChild('sidenav') public sideNav: MatSidenav;
    constructor(private router: Router) {
        this.currentPage= "home";
        this.loggedIn = (sessionStorage.getItem("seed_key")) ? true : false;
    }
    
    ngOnInit(): void {
        document.getElementById(this.currentPage).style.textDecoration = "underline";
    }

  /*
      login ... 
      router to register  
  */
    login = () => {
        this.loggedIn = true;
    }

    logout = () : void => {
         this.loggedIn = false;
    }

    createNewAccount = () : void => {
        this.loggedIn = false;
    }

    mergeAccountWithKey = (secretKey: string) : void => {
        this.loggedIn = false;
    }

    toggle = (sideNav: any) : void => {
        sideNav.toggle();
    }

    changePage(nextPage: string) {
        document.getElementById(this.currentPage).style.textDecoration = "none";
        this.currentPage = nextPage;
        document.getElementById(this.currentPage).style.textDecoration = "underline";
        if (this.sideNav.opened)
            this.sideNav.close();
    }
}
