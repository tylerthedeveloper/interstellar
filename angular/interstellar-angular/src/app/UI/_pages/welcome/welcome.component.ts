import { Component } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent {

    private stellarServer: any;
    public wallet: any;

    public constructor() {
        // this.balances = new Array<AccountBalance>()
    }

    // public createAccount() {
    //     alert(this._stellarService.createAccount().subscribe(resp => resp.json()));
    // }

    // public authenticate(secretKey: string) {
    //     let pubkey = isValidSecretKey(secretKey);
    //     if (pubkey) {
    //       this.balances = [];
    //       this._stellarService.authenticate(secretKey).subscribe(
    //           res => { this.balances = res; },
    //           error => {}); ////errorMessage = <any>error;
    //     } else {
    //         alert("there is no account associated with that ID, please make a new one");
    //     }
    // }

    // //let pubkey = isValidSecretKey(secretKey);
    // public sendPayment(destination: string, assetType: string, amount: string, memo: string) {
    //     if (sessionStorage.getItem("seed_key")) {
    //         this._stellarService.sendPayment(destination, assetType, amount, memo).subscribe(
    //             res => {
    //                 console.log(res);
    //                 updateBalance(this.balances, assetType, amount);
    //             },
    //             err => {
    //                 console.log(err);              
    //             });
    //         } else {
    //             alert("Please login in order to send money");
    //         }
    // }

    // public getWalletAndMarketValue() {}

    // public getWalletValue(address: string) {}

    // public getMarketValue() {}

    // public createTransaction() {}

    sessionstorage = () => {
        alert(sessionStorage.getItem("public_key"));
        alert(sessionStorage.getItem("seed_key"));
    }
  }
  
