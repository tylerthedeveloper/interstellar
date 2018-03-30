import { Component } from '@angular/core';

//selector: 'my-app',

//   templateUrl: './app.component.html',
@Component({
  selector: 'app-root',
  templateUrl: './spa.mainpage.html',   
})

export class AppComponent {

    title = 'app';
    // private stellarServer: any;
    // public wallet: any;
    // private balances: AccountBalance[];

    // public constructor(private _stellarService: StellarService) {
    //     this.balances = new Array<AccountBalance>()
    // }

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

    // sessionstorage = () => {
    //     alert(sessionStorage.getItem("public_key"));
    //     alert(sessionStorage.getItem("seed_key"));
    // }
  }
  
  
  //   private updateBalance = (balanceArray: Array<AccountBalance>, assetType: string, amount: string): void => {
  //       //balanceArray = this.balances || balanceArray;   
  //       let index = balanceArray.findIndex(bal => bal.asset_type === assetType);
  //       let newbal = parseInt(balanceArray[index].balance) - parseInt(amount);
  //       balanceArray[index].balance = String(newbal);
  // }

