import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, URLSearchParams} from '@angular/http';

// --> import {IStellarKeyPair} from './stellar-key-pair';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// --> import {AccountBalance} from '../../account/account-balance/account-balance.model';
import {forEach} from '@angular/router/src/utils/collection';

declare var StellarSdk: any;

@Injectable()
export class StellarService {

  public server: any;

  constructor(private _http: Http) {
    this.server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    StellarSdk.Network.useTestNetwork();
  }
}
