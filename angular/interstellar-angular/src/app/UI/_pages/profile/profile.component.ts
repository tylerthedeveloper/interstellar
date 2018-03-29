import { Component, OnInit } from '@angular/core';
import request from 'request';

import StellarSdk from 'stellar-sdk';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';


import { ProductService } from 'app/core/services/product.service';
import { Product } from 'app/marketplace/_market-models/product';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { User, publicUserData } from 'app/user';
import { AssetBalance, StellarAccountService } from 'app/stellar';
import { UserService } from 'app/user.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    // Here is your private key: SBF3AGT4ZUWWPE53NRZLNTBWGHT7KTNA4TS3VN43THHWFOAZVTV7RPFP
    // Here is your private key: SA5BD2TGFY47SHJOPYXWJMWZ5NI6F7QICMH43PWCJAFBSNOXBVBZAGMC
    // public wallet: any;
    // private stellarServer: any;

    private _userModel: User;
    private user: Observable<User>;
    // private user: User;
    private balances: AssetBalance[];
    private products: Observable<Product[]>;

    public edit = false;
    private profileForm: FormGroup;
    private profileFormMapper: any = {};

    constructor(private _userService: UserService,
                private _stellarService: StellarAccountService,
                private _productService: ProductService,
                private formBuilder: FormBuilder) {}

    ngOnInit(): void {

        // User Init //
        // switch too this.user$ ... auto destroy / unsubscribe
        // this.user = this._userService.getCurrentUser().first();
        // this.userModel = new User('', '', '', '', '', '', 0);

        this._userService
                .getCurrentUser()
                .first()
                // .map(user => <User> user)
                .subscribe(user => {
                    this.user = user;
                    this._userModel = <User> user;
                    this.profileForm = this.createFormGroup();
                    this._productService
                            .getProductsByUserID(user.id)
                            .subscribe(products => this.products = products);
        });

        // User balances //
        this.balances = new Array<AssetBalance>();
        const _balances = sessionStorage.getItem('my_balances') || localStorage.getItem('my_balances');
        if (_balances) { this.balances = <AssetBalance[]>JSON.parse(_balances); }
    }

    // public getWalletAndMarketValue() {}
    // public getWalletValue(address: string) {}
    // public getMarketValue() {}
    // public createTransaction() {}
    createFormGroup() {
        const group = this.formBuilder.group({});
        this.profileFormMapper = {};
        publicUserData.forEach(attr => {
            group.addControl(attr, new FormControl(this._userModel[attr] || ''));
            // this.profileFormMapper[attr] = this._userModel[attr] || '';
        });
        // console.log(this.profileFormMapper);
        return group;


        // const group = {};
        // group[attr] = new FormControl(this._userModel[attr] || '');
            // this.profileForm = this.formBuilder.group(Object.keys(user).map(key => {
                    //     console.log(key);
                    //     return new FormControl(key || '');
                    // }));
                    // const group: any = {};
                    // publicUserData.forEach(question => {
                    //         console.log(question);
                    //             group[question] = new FormControl(user[question] || '');
                    // });
                    // this.profileForm = new FormGroup(group);
    }

    updateProfile(f: FormGroup) {
        const data = {
            id: this._userModel.id,
            data: this.profileForm.value
        };
        this._userService.updateProfile(data);
        this.editProfile();
    }

    editProfile(): void {
        this.edit = !this.edit;
    }

    sessionstorage = () => {
        // console.log(this.userModel);
        // alert(sessionStorage.getItem('public_key'));
        // alert(sessionStorage.getItem('seed_key'));
    }
  }

