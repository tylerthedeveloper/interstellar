import { Component, OnInit } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { AccountBalance } from 'app/stellar/account/account-balance';
import { User } from 'app/user';
import { UserService } from 'app/user.service';
import { StellarAccountService } from 'app/stellar';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    //public wallet: any;
    private stellarServer: any;
    private balances: AccountBalance[];
    public user : Observable<User>;

    constructor(private _userService: UserService,
                private _stellarService: StellarAccountService) {}
                
    ngOnInit(): void {
        this._userService.getCurrentUser().first().subscribe(user => {
            // this.user = <User>JSON.parse(user);
            this.user = user;
            console.log(user);
            // console.log(this.user);
        });
        this.balances = new Array<AccountBalance>();
        let _balances = sessionStorage.getItem("my_balances");
        if (!_balances) _balances = localStorage.getItem("my_balances");
        this.balances = <AccountBalance[]>JSON.parse(_balances);
        // console.log(JSON.parse(sessionStorage.getItem("my_balances")));
        // <AccountBalance[]>JSON.parse(sessionStorage.getItem("my_balances")).forEach(element => {
        //     console.log(element);
        // });
    }

    // public getWalletAndMarketValue() {}
    // public getWalletValue(address: string) {}
    // public getMarketValue() {}
    // public createTransaction() {}

    sessionstorage = () => {
        alert(sessionStorage.getItem("public_key"));
        alert(sessionStorage.getItem("seed_key"));
    }
  }
  
