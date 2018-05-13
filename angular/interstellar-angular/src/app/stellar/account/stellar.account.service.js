"use strict";
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
// Import RxJs required methods
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
require("rxjs/add/observable/fromPromise");
var stellar_utils_1 = require("app/stellar/stellar.utils");
var http_1 = require("@angular/common/http");
var http_2 = require("@angular/http");
var StellarAccountService = /** @class */ (function () {
    // this.pubKey = "GDGBTSMUSTHKK2E7NBBNQ33Q2XBK4CCYJZZFHKSCDWIWXODQCQU4DJC2";
    function StellarAccountService(_http) {
        this._http = _http;
        StellarSdk.Network.useTestNetwork();
        this._server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    }
    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    StellarAccountService.prototype.createAccount = function () {
        var apiUrl = 'https://horizon-testnet.stellar.org/friendbot';
        var pair = StellarSdk.Keypair.random();
        sessionStorage.setItem('public_key', pair.publicKey()); // GATQTGZDN5GMJLNXQHWRCV4ZMBH4YFZXPACUUL756DIEP2NUGNUNBCHD
        sessionStorage.setItem('seed_key', pair.secret()); // SDYNRKS26KECW72663P6XD7N4SDKH5QERBIKYOTEH2TY25NLKW5QBBHL
        var params = new http_2.URLSearchParams();
        params.set('addr', pair.publicKey());
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        var options = new http_2.RequestOptions({
            params: params
        });
        // const options = {
        //   params: params
        // };
        return this._http.get(apiUrl, options)
            .map(function (response) { return response.json(); })["catch"](this.HandleError);
        // .subscribe(() => { return this.authenticate(pair.secret() }));
        /*
                  transaction = new TransactionBuilder(source)
          .addOperation(Operation.createAccount({
                  destination: destinationA,
                  startingBalance: "20"
              }) // <- funds and creates destinationA
              .addOperation(Operation.payment({
                  destination: destinationB,
                  amount: "100"
                  asset: Asset.native()
              }) // <- sends 100 XLM to destinationB
          .build();

          transaction.sign(sourceKeypair);

          */
    };
    /**
     * @param  {string} secretKey
     * @returns Observable
     */
    StellarAccountService.prototype.authenticate = function (secretKey) {
        var pubkey = stellar_utils_1.isValidSecretKey(secretKey);
        if (!pubkey) {
            return Observable_1.Observable["throw"]("That doesn't seem to be a valid stellar key" /* InvalidStellarKey */);
        }
        else {
            sessionStorage.setItem('public_key', pubkey);
            sessionStorage.setItem('seed_key', secretKey);
            var handleError = this.HandleError;
            return Observable_1.Observable.fromPromise(this._server.loadAccount(pubkey)["catch"](StellarSdk.NotFoundError, function (error) {
                throw new Error("The destination account does not exist!" /* StellarKeyNotFound */ + '\n' + error);
                // throw new Error('The destination account does not exist!: \n' + error);
            })
                .then(function (account) { return account; }))
                .map(function (r) { return r.balances; })["catch"](handleError);
            // .catch(e => Observable.throw(e));
        }
    };
    /**
     * @param  {string} secretKey
     */
    // check if key exists
    StellarAccountService.prototype.mergeAccountWithKey = function (secretKey) {
        var pubkey = stellar_utils_1.isValidSecretKey(secretKey);
        if (pubkey) {
            return this.authenticate(secretKey).map(function (balz) { return balz; }); // .catch(e => e)
            //     // console.log('a')
        }
        else {
            //     console.log('b')
            //     // alert('That doesn\'t seem to be a valid stellar key');
            //     // return Observable.throw('That doesn\'t seem to be a valid stellar key');
            // return Observable.throw('That doesn\'t seem to be a valid stellar key')
            return Observable_1.Observable.create(function (observer) { return observer.error("That doesn't seem to be a valid stellar key" /* InvalidStellarKey */); });
            // //     // return Observable.of(null)
        }
    };
    // ────────────────────────────────────────────────────────────────────────────────
    //
    // ────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────
    //
    StellarAccountService.prototype.checkAccountAlreadyExists = function (pubKey) {
        // const pubkey = isValidSecretKey(secretKey);
        // if (!pubkey) {
        //     return Observable.throw('That is not a valid secret key');
        // } else {
        //     sessionStorage.setItem('public_key', pubkey);
        //     sessionStorage.setItem('seed_key', secretKey);
        //     const handleError = this.HandleError;
        //     return Observable.fromPromise(this._server.loadAccount(pubkey)
        //         .catch(StellarSdk.NotFoundError, function (error) {
        //             throw new Error('The destination account does not exist!: \n' + error);
        //         })
        //         .then(account => account))
        //         .map((r: any) => <Array<AssetBalance>> r.balances)
        //         .catch(handleError);
        //         // .catch(e => Observable.throw(e));
        // }
    };
    StellarAccountService.prototype.HandleError = function (error) {
        // alert(error);
        return Observable_1.Observable["throw"](error || 'Server error');
    };
    StellarAccountService = __decorate([
        core_1.Injectable()
    ], StellarAccountService);
    return StellarAccountService;
}());
exports.StellarAccountService = StellarAccountService;
