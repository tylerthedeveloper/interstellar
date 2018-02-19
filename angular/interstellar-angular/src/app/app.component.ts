import { Component } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';
import { StellarService } from './stellar/stellar.service';
import { isValidSecretKey, isValidNewBalance, updateBalance, StellarLumensMinimum } from './stellar/utils';
import { AccountBalance } from './stellar/account/account-balance';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

    private stellarServer: any;
    public wallet: any;
    title = 'app';
    pubKey = "";
    // privKey = "";
    private balances: AccountBalance[];

    public constructor(private _stellarService: StellarService) {
        this.balances = new Array<AccountBalance>()
    }

    public createAccount() {
        alert(this._stellarService.createAccount().subscribe(resp => resp.json()));
    }

    public authenticate(secretKey: string) {
        let pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
          this.balances = [];
          this.pubKey = pubkey;
          this._stellarService.authenticate(secretKey).subscribe(
              res => { this.balances = res; },
              error => {}); ////errorMessage = <any>error;
        } else {
            alert("there is no account associated with that ID, please make a new one");
        }
    }

    //let pubkey = isValidSecretKey(secretKey);
    public sendPayment(destination: string, assetType: string, amount: string, memo: string) {
        if (this.pubKey) {
            this._stellarService.sendPayment(destination, assetType, amount, memo).subscribe(
                res => {
                    console.log(res);
                    updateBalance(this.balances, assetType, amount);
                },
                err => {
                    console.log(err);              
                });
            } else {
                alert("Please login in order to send money");
            }
    }

    public getWalletAndMarketValue() {}

    public getWalletValue(address: string) {}

    public getMarketValue() {}

    public createTransaction() {}

  }
  
  
  //   private updateBalance = (balanceArray: Array<AccountBalance>, assetType: string, amount: string): void => {
  //       //balanceArray = this.balances || balanceArray;   
  //       let index = balanceArray.findIndex(bal => bal.asset_type === assetType);
  //       let newbal = parseInt(balanceArray[index].balance) - parseInt(amount);
  //       balanceArray[index].balance = String(newbal);
  // }

