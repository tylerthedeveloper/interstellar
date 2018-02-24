import { Component, OnInit } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';
import { AccountBalance } from '../../stellar/account/account-balance';
import { isValidSecretKey, updateBalance } from '../../stellar/utils';
import { StellarAccountService } from '../../stellar/account/stellar.account.service';
import { User } from '../../user';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs/Observable';

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
                private _stellarService: StellarAccountService) {
                
                    // .map((o:any) => <User> o)
                }
                
    ngOnInit(): void {
        this._userService.getCurrentUser().subscribe(user => {
            // this._user = <User>JSON.parse(user);
            this.user = user;
            console.log(user);
            console.log(this.user);
        });
        this.balances = new Array<AccountBalance>();
        this.balances = <AccountBalance[]>JSON.parse(sessionStorage.getItem("my_balances"));
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
  
