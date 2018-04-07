/** Angular */
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';

/** Stellar */
// import StellarSdk from 'stellar-sdk';
import { AssetBalance } from 'app/stellar';

/** Observable */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

/** Services */
import { ProductService } from 'app/core/services/product.service';
import { UserService } from 'app/user.service';

/** Models */
import { Product } from 'app/marketplace/_market-models/product';
import { User, publicUserData } from 'app/user';
import { MatDialog, MatTab, MatTabGroup, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from 'app/UI/_components';
import { ProductFormComponent } from 'app/marketplace/products/components/product-form/product-form.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    // Here is your private key: SBF3AGT4ZUWWPE53NRZLNTBWGHT7KTNA4TS3VN43THHWFOAZVTV7RPFP
    // Here is your private key: SBF3AGT4ZUWWPE53NRZLNTBWGHT7KTNA4TS3VN43THHWFOAZVTV7RPFP
    // Here is your private key: SA5BD2TGFY47SHJOPYXWJMWZ5NI6F7QICMH43PWCJAFBSNOXBVBZAGMC
    // Here is your private key: SA5BD2TGFY47SHJOPYXWJMWZ5NI6F7QICMH43PWCJAFBSNOXBVBZAGMC

    private _userModel: User;
    private user: Observable<User>;
    private balances: AssetBalance[];
    private products: Observable<Product[]>;

    public edit = false;
    private profileForm: FormGroup;
    private profileFormMapper: any = {};

    constructor(private _userService: UserService,
                private _productService: ProductService,
                private dialog: MatDialog,
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
        console.log(_balances);
        if (_balances) { this.balances = <AssetBalance[]>JSON.parse(_balances); }
    }


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    updateProfile(): Observable<any> {
        const data = {
            id: this._userModel.id,
            data: this.profileForm.value
        };
        this.editProfile();
        return this._userService.updateProfile(data);
    }

    /**
     * @returns void
     */
    addProduct(): void {
        let dialogRef: MatDialogRef<ProductFormComponent>;
        dialogRef = this.dialog.open(ProductFormComponent);
        // dialogRef.componentInstance.title = 'Do you want to save your private key in the browser?';
        // dialogRef.componentInstance.content = 'Private Key';
        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                console.log('resultttttt');
              }
              console.log(result);
          });
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P A G E   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @returns FormGroup
     */
    createFormGroup(): FormGroup {
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

    /**
     * @returns void
     */
    editProfile(): void {
        this.edit = !this.edit;
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

