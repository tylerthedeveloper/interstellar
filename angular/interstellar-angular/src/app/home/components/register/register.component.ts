// TODO: Handle errors


/** Angular */
import { Component } from '@angular/core';

/** Services */
import { StellarAccountService } from 'app/stellar';
import { EventEmitterService } from 'app/core/_helpers/event-emitter.service';

/** UI */
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from 'app/shared/_components';
import { UserService } from 'app/core/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    constructor(private _stellarService: StellarAccountService,
                private _userService: UserService,
                private _eventEmiter: EventEmitterService,
                private dialog: MatDialog) {
                    console.log('creating register page');
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @returns void
     */
    public createAccount(): void {
        this._stellarService.createAccount().subscribe(
                resp => {
                    console.log(resp);
                    const _ = sessionStorage.getItem('seed_key');
                    alert('You are about to see your private key. \n ' +
                          'Please write it down and do not show anyone');
                    alert('Here is your private key: \n' + _);
                    this._stellarService.authenticate(_).subscribe(
                        res => this.handleAuthRegistration(JSON.stringify(res)),
                        err => alert('there was an error logging you in: \n' + err)
                    );
                },
                err => alert('there was an error creating your account: \n' + err)
        );
    }

    /**
     * @param  {string} secretKey
     * @returns void
     */
    mergeAccountWithKey(secretKey: string): void {
        this._stellarService.mergeAccountWithKey(secretKey).subscribe(
            res => this.handleAuthRegistration(JSON.stringify(res)),
            err => alert('there was an error conducting the merge: \n' + err)
        );
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M E T H O D   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    /**
     * @param  {string} res
     * @returns void
     */
    handleAuthRegistration (res: string): void {
        const data = { message: 'login' };
        const _pubKey = sessionStorage.getItem('public_key');
        const _privKey = sessionStorage.getItem('seed_key');
        const _user = { publicKey : _pubKey };
        let _localStore = false;
        let dialogRef: MatDialogRef<ConfirmDialogComponent>;
        dialogRef = this.dialog.open(ConfirmDialogComponent);
        dialogRef.componentInstance.title = 'Do you want to save your private key in the browser?';
        dialogRef.componentInstance.content = 'Private Key';
        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                _localStore = true;
                localStorage.setItem('public_key', _pubKey);
                localStorage.setItem('seed_key', _privKey);
                localStorage.setItem('my_balances', res);
            }
            console.log(result);
            console.log(_localStore);
            sessionStorage.setItem('my_balances', res);
            this._userService.addUser(_user, _localStore);
            this._eventEmiter.sendMessage(data);
        });
    }
    // ────────────────────────────────────────────────────────────────────────────────

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

}

     // private change() {
    //     sessionStorage.setItem('seed_key', 'private');
    //     alert(sessionStorage.getItem('seed_key'));
    //     this._eventEmiter.sendMessage('logout');
    // }
