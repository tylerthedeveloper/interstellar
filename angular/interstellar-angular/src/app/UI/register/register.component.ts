import { Component } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';
import { StellarService } from '../../stellar/stellar.service';
import { AccountBalance } from '../../stellar/account/account-balance';
import { isValidSecretKey, updateBalance } from '../../stellar/utils';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    private stellarServer: any;
    private wallet: any;

    private constructor(private _stellarService: StellarService) {
        if (sessionStorage.getItem("seed_key"))
            alert("already logged in ... need to router redirect!")
    }

    private createAccount() {
        alert(this._stellarService.createAccount().subscribe(resp => resp.json()));
    }

    private mergeAccountWithKey(secretKey: string) {
        alert(this._stellarService.createAccount().subscribe(resp => resp.json()));
    }

    private authenticate(secretKey: string) {
        let pubkey = isValidSecretKey(secretKey);
        if (pubkey) {
            sessionStorage.setItem("my_balances", JSON.stringify(null));
            this._stellarService.authenticate(secretKey).subscribe(
                res => { sessionStorage.setItem("my_balances", JSON.stringify(res)); },
                error => {}); ////errorMessage = <any>error;
        } else {
            alert("there is no account associated with that ID, please make a new one");
        }
    }


    private sessionstorage = () => {
        alert(sessionStorage.getItem("public_key"));
        alert(sessionStorage.getItem("seed_key"));
        alert(JSON.stringify(sessionStorage.getItem("my_balances")));
    }
  }
  
