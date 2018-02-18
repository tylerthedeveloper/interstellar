import { Component } from '@angular/core';
import request from 'request';
import { StellarService, isValidSecretKey } from './stellar.service';
import StellarSdk from 'stellar-sdk';

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
          this._stellarService.authenticate(secretKey).subscribe(res => {
                  this.balances = res;
                },
                error => {
                  //errorMessage = <any>error;
                });
        } else {
            alert("there is no account associated with that ID, please make a new one");
        }
    }

    // CHECK IF APPROPRIATE BALANCE
    // CHECK IF ENOUGH TO LIVE
    public sendPayment(destination: string, assetType: string, amount: string, memo: string) {
      //let pubkey = isValidSecretKey(secretKey);
        if (this.pubKey) {
          this._stellarService.sendPayment(destination, assetType, amount, memo).subscribe(res => {
              console.log(res);
              this.updateBalance(assetType, amount);
            },
            error => {
              //errorMessage = <any>error;
            });
          } else {
              alert("Please login in order to send money");
          }
    }

    private updateBalance(assetType: string, amount: string): void {
        let index = this.balances.findIndex(bal => bal.asset_type === assetType);
        let newbal = parseInt(this.balances[index].balance) - parseInt(amount);
        this.balances[index].balance = String(newbal);
    }

    public getWalletAndMarketValue() {}

    public getWalletValue(address: string) {}

    public getMarketValue() {}

    public createTransaction() {}

}



//
// create server
//
//console.log("hi");


// server.accounts()
//   .accountId(pair.publicKey())
//   .call()
//   .then(function (accountResult) {
//     console.log(accountResult);
//   })
//   .catch(function (err) {
//     console.error(err);
//   })

//   makeAccount () {
//       //var StellarSdk = require('stellar-sdk')
//       var pair = StellarSdk.Keypair.random();

//       this.pubKey = pair.publicKey();
//       this.privKey = pair.secret();
//       alert(pair.secret()); // SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
//       alert(pair.publicKey()); // GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB

      
//       var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      
//       request.get({
//           url: 'https://horizon-testnet.stellar.org/friendbot',
//           qs: { addr: pair.publicKey() },
//           json: true
//           }, function(error, response, body) {
//             if (error || response.statusCode !== 200) {
//               console.error('ERROR!', error || body);
//             }
//           else {
//             console.log('SUCCESS! You have a new account :)\n', body);
//             console.log();
//             server.loadAccount(pair.publicKey()).then(function(account) {
//                 console.log('Balances for account: ' + pair.publicKey());
//                 console.log('Balances for account: ' + pair.secret());
//                 account.balances.forEach(function(balance) {
//                   console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
//                 });
//               });
//           }
//       });
    
//   }


// }




//
// create server
//
//console.log("hi");


// server.accounts()
//   .accountId(pair.publicKey())
//   .call()
//   .then(function (accountResult) {
//     console.log(accountResult);
//   })
//   .catch(function (err) {
//     console.error(err);
//   })

export class AccountBalance {
  asset_type: string;
  balance: string;
}