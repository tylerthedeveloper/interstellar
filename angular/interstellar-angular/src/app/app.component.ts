import { Component } from '@angular/core';
import request from 'request';
import { StellarService } from './stellar.service';
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
    privKey = "";
    accountBal = 0;

    public constructor(private _stellarService: StellarService) {}

    public createAccount() {
      this._stellarService.createAccount();
    }

    public checkBalance() {
        this._stellarService.checkBalance();
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