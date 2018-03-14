import { Component, OnInit } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

import { StellarAccountService } from 'app/stellar';
import { AccountBalance } from 'app/stellar/account/account-balance';

import { User } from 'app/user';
import { UserService } from 'app/user.service';
import { ProductService } from 'app/core/services/product.service';
import { Product } from 'app/marketplace/_market-models/product';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    // Here is your private key: SBF3AGT4ZUWWPE53NRZLNTBWGHT7KTNA4TS3VN43THHWFOAZVTV7RPFP
    // Here is your private key: SA5BD2TGFY47SHJOPYXWJMWZ5NI6F7QICMH43PWCJAFBSNOXBVBZAGMC
    // public wallet: any;
    private stellarServer: any;

    public user: Observable<User>;
    private balances: AccountBalance[];
    private products: Observable<Product[]>;

    constructor(private _userService: UserService,
                private _stellarService: StellarAccountService,
                private _productService: ProductService) {}

    ngOnInit(): void {

        // User Init //
        // switch too this.user$ ... auto destroy / unsubscribe
        // this.user = this._userService.getCurrentUser().first();

        this._userService.getCurrentUser().first()
            .subscribe(user => {
                this.user = user;
                console.log(user);
                const userID = user.id;
                this._productService.getProductsByUserID(userID)
                                    .subscribe(products => this.products = products);
        });

        // User balances //
        this.balances = new Array<AccountBalance>();
        let _balances = sessionStorage.getItem("my_balances");
        if (!_balances) _balances = localStorage.getItem("my_balances");
        if (_balances) this.balances = <AccountBalance[]>JSON.parse(_balances);
        // console.log(JSON.parse(sessionStorage.getItem("my_balances")));
        // <AccountBalance[]>JSON.parse(sessionStorage.getItem("my_balances")).forEach(element => {
        //     console.log(element);
        // });

    }

    // public getWalletAndMarketValue() {}
    // public getWalletValue(address: string) {}
    // public getMarketValue() {}
    // public createTransaction() {}

    sessionstorage = () => {
        alert(sessionStorage.getItem('public_key'));
        alert(sessionStorage.getItem('seed_key'));
    }
  }

