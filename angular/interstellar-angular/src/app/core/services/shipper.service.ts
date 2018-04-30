//
// ──────────────────────────────────────────────── I ──────────
//   :::::: T O D O : :  :   :    :     :        :          :
// ─────────────────────────────────────────────────────────
/**
 *  1 - NEED TO TEST MERGE
 *  2 - NEED TO SWITCH TO REAL NETWORK
 *  3 - NEED TO TEST ON REAL NETWORK
 * *** NEED TO USE COOKIE CACHING - LOCAL DOESNT WORK
 */
//


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/fromPromise';

import { easyPostConfig } from '../../../../_ups';
import * as EasyPost from '@easypost/api';
// @easypost/api/easypost.6-lts
// import * as EasyPost from '@easypost/api/easypost';
// import * as EasyPost from '@easypost/api/src/easypost'; // ERROR:
import * as easyBabelPoly from 'babel-polyfill';
const easyPostApi = new EasyPost(easyPostConfig.apiKey);

// import * as Shippo from 'shippo';
// declare const shippo: any;
// import * as shippo from 'shippo';
// const shippo = <any> require('Shippo')(shippoConfig.apiKey);
// const shippo = require('shippo')('shippo_test_4af1ec7e55757674dba03e0165cbe99519509fdc');




// const enum ErrorMessage {
//     InvalidStellarKey = 'That doesn\'t seem to be a valid stellar key',
//     StellarKeyNotFound = 'The destination account does not exist!'
// }

@Injectable()
export class ShipperService {

    // private shippoKey = easyPostConfig.apiKey;

    constructor(private _http: HttpClient) {
    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    // : Observable<Response>
    createAddress() {
        // const apiUrl = 'https://horizon-testnet.stellar.org/friendbot';
        // const pair = StellarSdk.Keypair.random();
        // sessionStorage.setItem('public_key', pair.publicKey()); // GATQTGZDN5GMJLNXQHWRCV4ZMBH4YFZXPACUUL756DIEP2NUGNUNBCHD
        // sessionStorage.setItem('seed_key', pair.secret()); // SDYNRKS26KECW72663P6XD7N4SDKH5QERBIKYOTEH2TY25NLKW5QBBHL
        // const params = new URLSearchParams();
        // params.set('addr', pair.publicKey());

        console.log('creatomg address');
        const toAddress = new easyPostApi.Address({
            name: 'Dr. Steve Brule',
            street1: '179 N Harbor Dr',
            city: 'Redondo Beach',
            state: 'CA',
            zip: '90277',
            country: 'US',
            phone: '310-808-5243'
          });
        //   toAddress.save().then(addr => {
        //     console.log(addr.id);
        //   });

        // const shipFrom = {
        //     'ship_from': {
        //         'contact_name': 'Elmira Zulauf',
        //         'company_name': 'Kemmer-Gerhold',
        //         'street1': '662 Flatley Manors',
        //         'country':  'HKG',
        //         'type':  'business'
        //     }
        // };
        // const shipTo = {
        //     'ship_to': {
        //         'contact_name': 'Dr. Moises Corwin',
        //         'phone': '1-140-225-6410',
        //         'email': 'Giovanna42@yahoo.com',
        //         'street1': '28292 Daugherty Orchard',
        //         'city': 'Beverly Hills',
        //         'postal_code': '90209',
        //         'state': 'CA',
        //         'country': 'USA',
        //         'type': 'residential'
        //       },
        // };
        // const easyPostApi = EasyPost(easyPostConfig.apiKey);

        // const urlEndpoint = 'https://sandbox-api.postmen.com/v3/labels';
        const headers = new HttpHeaders( {
            // .set("X-CustomHeader", "custom header value");
            'Authorization': 'TEST_API_KEY:5D5QcoWdnCldMb0J7FreLw',
            // 'Authorization': 'TEST_API_KEY:5D5QcoWdnCldMb0J7FreLw',
            'Accept': 'application/json',
            'content-type': 'application/json',
            'Content-type': 'application/json; charset=utf-8',
            // 'postmen-api-key': '3d381e8b-2e34-4a67-bbe3-605c11d72a3e'
            'TEST_API_KEY': '5D5QcoWdnCldMb0J7FreLw',
            'api-key': '5D5QcoWdnCldMb0J7FreLw',
            'api_key': '5D5QcoWdnCldMb0J7FreLw',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'content-type',
            // 'Access-Control-Request-Method': 'POST'
        });
        headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        headers.set('Access-Control-Allow-Origin', 'http://localhost:4200/');

        // const body = {
        //     'url':  urlEndpoint,
        //     'headers': headers,
        //     'async': false,
        //     'shipper_accounts': [
        //         {'id': '00000000-0000-0000-0000-000000000000'},
        //     ],
        //     'is_document': false,
        //     'ship_to': shipTo,
        //     'ship_from': shipFrom,
        // };

        // shipper_account_id


        // const urlEndpoint = 'https://api.easypost.com/v2/addresses';
        const urlEndpoint = 'https://api.easypost.com/v2/addresses ';
        const options = {
            'headers': headers,
            'body': toAddress,
            // 'body': fromAddress
            // tracking_code: "EZ4000000004",
            // carrier: "UPS"
        }
        const reqOptions = {
            headers : headers
        }
        this._http.post(urlEndpoint, toAddress, reqOptions).subscribe(a => console.log(a));
        // shippo.setApiKey()
    }

    validateAddress(address: any) {

    }

    createLabel(address: any) {

    }


    HandleError(error: Response) {
        // alert(error);
        return Observable.throw(error || 'Server error');
    }
    // ────────────────────────────────────────────────────────────────────────────────
}
