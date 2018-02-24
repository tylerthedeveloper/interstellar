import { Component, Output, EventEmitter} from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';
import { StellarAccountService } from '../../stellar/account/stellar.account.service';
import { isValidSecretKey, updateBalance } from '../../stellar/utils';
import { EventEmitterService } from '../../_helpers/event-emitter.service';
import { UserService } from '../../user.service';
import { User } from '../../user';
//- import { EventEmitter } from 'events';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    private stellarServer: any;
    private wallet: any;

    // @Output() 
    // changeLoginStatus: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _stellarService: StellarAccountService,
                private _userService: UserService,
                private _eventEmiter: EventEmitterService) {
        
                    // if (sessionStorage.getItem("seed_key"))
                    //     alert("already logged in ... need to router redirect!")
    }

    private change() {
        sessionStorage.setItem("seed_key", "private");
        alert(sessionStorage.getItem("seed_key"));
        this._eventEmiter.sendMessage("logout");
    }

    // private change2() {
    //     sessionStorage.setItem("seed_key", "private");
    //     alert(sessionStorage.getItem("seed_key"));
    //     this._eventEmiter.sendMessage("login");
    // }

    public createAccount() {
        this._stellarService.createAccount().subscribe(
                resp => {
                    let _ = sessionStorage.getItem("seed_key");
                    this._stellarService.authenticate(_).subscribe(
                        resp => this.handleAuthRegistration(JSON.stringify(resp)),
                        err => alert("there was an error logging you in")
                    );
                },
                err => alert("there was an error creating your account")
        );
    }

    private mergeAccountWithKey = (secretKey: string) : void => {
        this._stellarService.mergeAccountWithKey(secretKey).subscribe(
            res => this.handleAuthRegistration(JSON.stringify(res)),
            err => alert("there was an error conducting the merge")
        );
    }


    private handleAuthRegistration = (res: string) : void => {
        let data = { message: "login" }
        // console.log(res);
        let _user = { publicKey : sessionStorage.getItem("public_key") };

        sessionStorage.setItem("my_balances", res);
        this._userService.addUser(_user);
        this._eventEmiter.sendMessage(data);
    }


    // private authenticate(secretKey: string) {
    //     let pubkey = isValidSecretKey(secretKey);
    //     if (pubkey) {
    //         // this.changeLoginStatus.emit("changeStatus");
    //         sessionStorage.setItem("my_balances", JSON.stringify(null));
    //         this._stellarService.authenticate(secretKey).subscribe(
    //             res => { sessionStorage.setItem("my_balances", JSON.stringify(res)); },
    //             error => {}); ////errorMessage = <any>error;
    //     } else {
    //         alert("there is no account associated with that ID, please make a new one");
    //     }
    // }

    private sessionstorage = () => {
        alert(sessionStorage.getItem("public_key"));
        alert(sessionStorage.getItem("seed_key"));
        alert(JSON.stringify(sessionStorage.getItem("my_balances")));
    }
  }
  
