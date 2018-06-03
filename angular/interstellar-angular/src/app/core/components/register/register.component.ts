// TODO: Handle errors
// https://scotch.io/tutorials/angular-2-http-requests-with-observables
// https://stackoverflow.com/questions/40511948/how-to-throw-observable-error-manually-in-angular2/40512534

/** Angular */
import { Component } from '@angular/core';

/** Services */
import { StellarAccountService, isValidSecretKey } from 'app/stellar';
import { EventEmitterService } from 'app/core/_helpers/event-emitter.service';

/** UI */
import { MatDialog } from '@angular/material';
import { UserService } from 'app/core/services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    private _isValidSecretKey: boolean;

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
                    const k: string = sessionStorage.getItem('seed_key');
                    alert('You are about to see your private key. \n ' +
                          'Please write it down and do not show anyone');
                    alert(` ${k}`);
                    this._stellarService.authenticate(k).subscribe(
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
        // todo: CHECK IF ACCOUNT EXISTS
        const _pubkey = isValidSecretKey(secretKey) || '';
        if (!secretKey) {
            alert('Please enter a key');
            return;
        }
        if (!_pubkey) {
            alert('Please enter a valid secret key');
            return;
        }
        // const that = this;
        // console.log(_pubkey);
        this._userService.getCurrentUser(_pubkey).subscribe(
            account => {
                this._isValidSecretKey = true;
                console.log(account);
                // if (account !== 'no current user') {
                if (account) {
                    alert('you already have an account!');
                    // alert('go to the login page');
                    this.closeSignUpNav();
                    console.log('b');
                    return;
                } else {
                    // todo: get from horiozn
                    console.log('c');
                    this._stellarService.mergeAccountWithKey(secretKey)
                        // .catch(errMsg => Obser vable.throw(errMsg))
                        .subscribe(
                            res => {
                                    console.log(res);
                                    return this.handleAuthRegistration(JSON.stringify(res));
                                },
                                err => alert('there was an error conducting the merge: \n' + err));
                    }
                },
            err => console.log(err));
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
        // todo: decide local / cache / cookie storage ...
        const _localStore = false;
        // todo: get new component
                // localStorage.setItem('public_key', _pubKey);
                // localStorage.setItem('seed_key', _privKey);
                // localStorage.setItem('my_balances', res);
        sessionStorage.setItem('my_balances', res);
        this._userService.addUser(_user, _localStore)
            .then(() => this._eventEmiter.sendMessage(data));

        // let dialogRef: MatDialogRef<ConfirmDialogComponent>;
        // dialogRef = this.dialog.open(ConfirmDialogComponent);
        // dialogRef.componentInstance.title = 'Do you want to save your private key in the browser?';
        // dialogRef.componentInstance.content = 'Private Key';
        // dialogRef.afterClosed().subscribe((result: string) => {
        //     if (result) {
        //         _localStore = true;
        //         localStorage.setItem('public_key', _pubKey);
        //         localStorage.setItem('seed_key', _privKey);
        //         localStorage.setItem('my_balances', res);
        //     }
        //     console.log(result);
        //     console.log(_localStore);
        //     sessionStorage.setItem('my_balances', res);
        //     this._userService.addUser(_user, _localStore);
        //     this._eventEmiter.sendMessage(data);
        // });

    }
    // ────────────────────────────────────────────────────────────────────────────────

    closeSignUpNav() {
        const data = { message: 'closeSideNav' };
        this._eventEmiter.sendMessage(data);
    }

}
