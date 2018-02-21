import { Component, OnInit } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';
import { AccountBalance } from '../../stellar/account/account-balance';
import { isValidSecretKey, updateBalance } from '../../stellar/utils';
import { StellarAccountService } from '../../stellar/account/stellar.account.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

    //public wallet: any;
    private stellarServer: any;
    private balances: AccountBalance[];

    constructor(private _stellarService: StellarAccountService) {
        this.balances = new Array<AccountBalance>()
    }

    ngOnInit(): void {
        this.balances = <AccountBalance[]>JSON.parse(sessionStorage.getItem("my_balances"));
        alert(JSON.stringify(this.balances));
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
  
