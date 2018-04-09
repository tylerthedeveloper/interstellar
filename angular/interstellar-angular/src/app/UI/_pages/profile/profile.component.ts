/** Angular */
import { Component, OnInit } from '@angular/core';

import { FormGroup } from '@angular/forms';
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

/** UI */
import { MatDialog } from '@angular/material';

/** Utils */
import { createFormGroup } from 'app/UI/utils';
import { DialogComponent } from '../../_components/dialog/dialog.component';
import { DynamicFormComponent } from '../../forms/dynamic-form/dynamic-form.component';
import { Router } from '@angular/router';
import { isValidProduct } from 'app/marketplace/products/product.utils';
import { productFormData } from 'app/marketplace/products/product.details';
import { ConfirmDialogComponent } from '../../_components/confirm-dialog/confirm.dialog.component';


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
                public router: Router) {}


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
                    this.profileFormMapper = {};

                    // TODO: NGFOR OF ATTRIBUTES FOR FORM ELEMENTS
                    // TODO: use abstract form
                    this.profileForm = createFormGroup(publicUserData, this._userModel);
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
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { component: DynamicFormComponent,
                    payload: {
                        questions: productFormData,
                        // objectMapper: product
                    }
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                const product = <Product> JSON.parse(JSON.stringify(result));
                // console.log(res);
                try {
                    product.quantity = Number(product.quantity);
                    product.fixedUSDAmount = Number(product.fixedUSDAmount);
                    if (!isValidProductTypes(product)) {
                        alert('invalid product error');
                        return;
                    }
                    const newProductID = this._productService.getNewProductID();
                    // console.log(id);
                    this.uploadThumbnailImage(newProductID).subscribe(
                        (imageUploadResult: string) => {
                            // console.log(imageUploadResult);
                            if (imageUploadResult) {
                                // console.log(product);
                                product.id = newProductID;
                                product.productThumbnailLink = newProductID;
                                // console.log(product);
                                this.handleNewProduct(product);
                            }
                        },
                        err => {
                            alert('errror: \n ' + err);
                        });
                } catch (e) {
                    alert('invalid product details:\n' + e);
                }
            }
        });
    }

    uploadThumbnailImage(productID: string = 'new-prod-id23') {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: { productID: productID }
        });
        return dialogRef.afterClosed();
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P A G E   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    handleNewProduct(product: any) {
        // console.log('product');
        // console.log(product);
         const _product = <Product> {
            productName: 'super fast GPU22222222',
            productShortDescription: 'shawrty',
            productLongDescription: 'looooooooooooong des',
            fixedUSDAmount: 10,
            quantity: 15,
            productCategory: 'Electronics',
            productPrices: [
                new AssetBalance('7.00000', 'tycoin', 'Tycoins')
            ],
            productThumbnailLink: 'https://images10.newegg.com/productimage/14-487-290-01.jpg',
            productSellerData: {
                productSellerID: sessionStorage.getItem('user_doc_id'),
                productSellerName: sessionStorage.getItem('user_name'),
                productSellerPublicKey: sessionStorage.getItem('public_key')
            }
        };

        // validate product
        if (!isValidProduct(product)) {
            alert('invalid product error');
            return;
        }

        // todo: TEST THESE ARENT EVER NULL!!!!!!
        product.productPrices = [
            new AssetBalance('7.00000', 'native', 'Lumens')
        ];
        product.productSellerData = {
            productSellerID: sessionStorage.getItem('user_doc_id'),
            productSellerName: sessionStorage.getItem('user_name'), // TODO: store user data in session storage!!!
            productSellerPublicKey: sessionStorage.getItem('public_key')
        };
        const p = JSON.stringify(product);
        this._productService.addProduct(p)
                    .catch(err => console.log(err))
                    .then(res => this.router.navigate(['/products', res]));
    }



    /**
     * @returns void
     */
    editProfile(): void {
        this.edit = !this.edit;
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

        /*

            createComponentRef(a: any, b: any) {
        // const factory = this.resolver.resolveComponentFactory(this.data.component);
        // this.componentRef = this.vcRef.createComponent(factory);
        // this.componentRef.instance.objectMapper = this.data.data;
        // this.componentRef.instance.questions = this.data.mapper;
    }

        // const dialogRef2 = new DynamicFormComponent();
                    // dialogRef2.questions2 = publicProductData;
                    // dialogRef2.objectMapper2 = product;
            // const dialogRef: MatDialogRef<DynamicFormComponent> = this.dialog.open(DynamicFormComponent, {
            //     // width: '250px',
            //     data: { mapper: publicProductData, data: product }
            //   });
                    // let cmpRef = this.viewContainerRef.createComponent(this.componentFactory, 0);

                    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicFormComponent);
                    const componentRef = this.viewContainerRef.createComponent(componentFactory);
                    // this.viewContainerRef.clear();
                    componentRef.instance.objectMapper2 = publicProductData;
                    // componentRef.instance.questions = product;

                    const dialogRef = this.dialog.open(DialogComponent, {
                        width: '250px',
                        data: { component: componentRef, mapper: publicProductData, data: product }
             });
        */
    //    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicFormComponent);
    //    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    //    componentRef.instance.objectMapper = product;
    //    componentRef.instance.questions = publicProductData;

    // let dialogRef: MatDialogRef<DialogComponent>;
        // this.dialog.invoke(DialogComponent, {
        // // let dialogRef2: MatDialogRef<DialogComponent>;
        //     width: '250px',
        //     data: { component: componentRef, mapper: publicProductData, data: product }
        // });
