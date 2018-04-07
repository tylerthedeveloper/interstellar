//
// can make time sensitive / expiration ...
// https://medium.com/@ryanchenkie_40935/angular-authentication-using-route-guards-bf7a4ca13ae3
//

import { Injectable } from '@angular/core';
// -> import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate } from '@angular/router';
import { EventEmitterService } from './event-emitter.service';
import { isValidSecretKey } from '../../stellar/utils';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private _eventEmitter: EventEmitterService) {
        console.log('creating auth guard');
    }

    /**
     * @returns boolean
     */
    canActivate(): boolean {
        if (!this.isAuthenticated()) {
            this._eventEmitter.sendMessage({message: 'unauthenticated'});
            return false;
        }
        return true;
    }

    /**
     * @returns boolean
     */
    private isAuthenticated = (): boolean => {
        // const token = localStorage.getItem('token');
        // return !this.jwtHelper.isTokenExpired(token);

        /// MAYEB CHECK IF PUBLIC KEY IS IN DB AND IS REAL ....???
        let _key = sessionStorage.getItem('seed_key');
        if (!_key) { _key = localStorage.getItem('seed_key'); }
        return  (_key !== null && isValidSecretKey(_key) != null);
        ////////////////////////////////////////////////////
    }
}
