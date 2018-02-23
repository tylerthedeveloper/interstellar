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
    private _user : Observable<User>;

    constructor(private _userService: UserService,
                private _stellarService: StellarAccountService) {
                
                    this.balances = new Array<AccountBalance>()
                    this._userService.getCurrentUser()
                    // .map((o:any) => <User> o)
                        .map(o => o.json())
                        .subscribe(user => this._user = user);
    }

    ngOnInit(): void {
        console.log(JSON.parse(sessionStorage.getItem("my_balances")));
        <AccountBalance[]>JSON.parse(sessionStorage.getItem("my_balances")).forEach(element => {
            console.log(element);
        });
        this.balances = <AccountBalance[]>JSON.parse(sessionStorage.getItem("my_balances"));
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
  
