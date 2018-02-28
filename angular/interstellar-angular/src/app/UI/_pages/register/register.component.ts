import { Component, Output, EventEmitter} from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material'; 
import { StellarAccountService } from 'app/stellar';
import { UserService } from 'app/user.service';
import { ConfirmDialogComponent } from 'app/UI/_components/dialog/confirm.dialog.component';
import { EventEmitterService } from 'app/core';



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
                private _eventEmiter: EventEmitterService,
                public dialog: MatDialog) {

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
                    alert("You are about to see your private key. \n " +
                          "Please write it down and do not show anyone");
                    alert("Here is your private key: " + _);
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
        let _pubKey = sessionStorage.getItem("public_key");
        let _privKey = sessionStorage.getItem("seed_key");
        let _user = { publicKey : _pubKey };
        let _localStore = false;
        let dialogRef: MatDialogRef<ConfirmDialogComponent>;
          dialogRef = this.dialog.open(ConfirmDialogComponent);
          dialogRef.componentInstance.title = "Do you want to save your private key in the browser?";
          dialogRef.componentInstance.content = "Private Key";
          dialogRef.afterClosed().subscribe((result: string) => {
              if (result) {
                    _localStore = true;
                    localStorage.setItem("public_key", _pubKey);
                    localStorage.setItem("seed_key", _privKey);
                    localStorage.setItem("my_balances", res);
                }
                sessionStorage.setItem("my_balances", res);
                this._userService.addUser(_user, _localStore);
                this._eventEmiter.sendMessage(data);
            });
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
