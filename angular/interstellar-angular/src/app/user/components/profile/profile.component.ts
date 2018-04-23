// FIXME: benefits of aux routing under mat tab

/** Angular */
import { Component, OnInit } from '@angular/core';

/** Stellar */
// import StellarSdk from 'stellar-sdk';
import { AssetBalance } from 'app/stellar';

/** Observable */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

/** Services */
import { ProductService } from 'app/core/services/product.service';

/** Models */
import { Product } from 'app/marketplace/_market-models/product';

/** UI */
import { MatDialog } from '@angular/material';

/** Utils */
import { Router, ActivatedRoute } from '@angular/router';
import { areValidProductTypes } from 'app/marketplace/products/product.utils';

/** Components */
import { DynamicFormComponent } from 'app/shared/forms/dynamic-form/dynamic-form.component';
import { DialogComponent, FileUploadDialogComponent, ConfirmDialogComponent } from 'app/shared/components';

/** Services */
import { OrderService } from 'app/core/services';
import { UserService } from 'app/core/services/user.service';

/** Models */
import { User } from 'app/user/user';
import { Order } from 'app/marketplace/_market-models/order';
import { productFormData } from 'app/marketplace/products/product.details';
import { userFormData } from 'app/user/user.details';
import { BaseComponent } from 'app/base.component';
import { TransactionRecord } from 'app/marketplace/_market-models/transaction';
import { shippingAddressQuestions } from 'app/marketplace/shipping/shipping.details';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
// SBF3AGT4ZUWWPE53NRZLNTBWGHT7KTNA4TS3VN43THHWFOAZVTV7RPFP
// SA5BD2TGFY47SHJOPYXWJMWZ5NI6F7QICMH43PWCJAFBSNOXBVBZAGMC
export class ProfileComponent extends BaseComponent implements OnInit {
    // fiW6kQXE0zBXTpjhVTjq
    // SBF3AGT4ZUWWPE53NRZLNTBWGHT7KTNA4TS3VN43THHWFOAZVTV7RPFP
    // GCL43TD6HTK3KV6JDMH4RVLJ6SI3WCPLF3MHFQZECQ2ZTGR63VRDXF62

    // 7KtTK9jXBT9HaU0bZ3uC
    // SA5BD2TGFY47SHJOPYXWJMWZ5NI6F7QICMH43PWCJAFBSNOXBVBZAGMC
    // GBLC44ZQ322NNZUOQAPSMB67PQP63QJYLKEUKGUGPCYRTU5KF4ZSITT4

    //     YsHuMOIGiVAQLs1Ty6Pr
    // SBFB3TIYY7BCMHDUPQ4AISU3CT5N4KS4M45JEZFLZILVIZGHF6S4X653

    /** Page Objects */
    private _userModel: User;
    private user: Observable<User>;
    private balances: AssetBalance[];
    private products: Observable<Product[]>;

    // todo: test
    private orders: Observable<Order[]>;
    private transactionSales: Observable<TransactionRecord[]>;

    /** Page Identifiers */
    private _userID: string;
    private _pagePersonID: string;
    private isMyProfile;

    /** Page Helpers */
    private edit = false;
    private hasAddress = false;

    constructor(private _userService: UserService,
                private _productService: ProductService,
                private _orderService: OrderService,
                private dialog: MatDialog,
                private _route: ActivatedRoute,
                public router: Router) {
                    super();
    }

    ngOnInit(): void {

        // User Init //
        // switch too this.user$ ... auto destroy / unsubscribe
        // this.user = this._userService.getCurrentUser().first();
        // this.userModel = new User('', '', '', '', '', '', 0);
        const myUserID = this.myBaseUserID; // sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this._userID = myUserID;
        const pagePersonID = this._route.snapshot.params['id'];
        const path = this._route.snapshot.routeConfig.path;
        if (myUserID === pagePersonID && path !== ':id/me') {
            this.router.navigate(['/people', myUserID, 'me']);
            console.log('its me ');
        }

        this._pagePersonID = pagePersonID;
        this.isMyProfile = (pagePersonID === myUserID);
        // todo: listen for add address
        this._userService.getUserByID(pagePersonID)
            .subscribe(user => {
                this.user = user;
                console.log(user);
                if (this.isMyProfile) {
                    const userTyped = <User> user;
                    this._userModel = userTyped;
                    this.hasAddress = (userTyped.address) ? true : false;
                    if (!this.hasAddress) {
                        this.handleUpdateAddress();
                    }
                }
        });
        this.products = this._productService.getProductsByUserID(myUserID);
        this.orders = this._orderService.Orders;
        this.balances = new Array<AssetBalance>();
        // const _balances = sessionStorage.getItem('my_balances') || localStorage.getItem('my_balances');
        const _balances = this.myBaseBalances;
        if (_balances) { this.balances = <AssetBalance[]>JSON.parse(_balances); }

        this.transactionSales = this._orderService.TransactionSales;
        // this.transactionSales = this._orderService.Transactions.filter(t => t.orderType === OrderType.Sale);
        // .pipe(filter((transaction: TransactionRecord) => transaction.orderType === OrderType.Sale));
                        // ((transaction: TransactionRecord) => transaction.orderType === OrderType.Sale));
    }


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns Observable
     */
    // updateProfile(): Observable<any> {
    updateProfile() {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { component: DynamicFormComponent,
                    payload: {
                        questions: userFormData,
                        objectMapper: this._userModel
                    }
            }
        });
        dialogRef.afterClosed().subscribe((newProfileData: string) => {
            if (newProfileData) {
                this.edit = !this.edit;
                const payload = {
                    id: this._userID,
                    data: newProfileData
                };
                return this._userService.updateProfile(payload);
            }
        });
    }


    goToAddProductpage(): void {
        this.router.navigate(['../products/list-new-product']);
        // this.router.navigate(['../products/list-new-product'], { queryParams: { user: this._userID } });
    }



    /**
     * @returns void
     */
    // todo: confirm success
    addProduct(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { component: DynamicFormComponent,
                    payload: {
                        questions: productFormData,
                    }
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                const product = <Product> JSON.parse(JSON.stringify(result));
                try {
                    product.quantity = Number(product.quantity);
                    product.fixedUSDAmount = Number(product.fixedUSDAmount);
                    if (!areValidProductTypes(product)) {
                        alert('invalid product error');
                        return;
                    }
                    const newProductID = this._productService.getNewProductID();
                    this.uploadThumbnailImage(newProductID).subscribe(
                        (imageUploadResultURL: string) => {
                            if (imageUploadResultURL) {
                                product.id = newProductID;
                                product.productThumbnailLink = imageUploadResultURL;
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

    /**
     * @param  {string} productID
     * @returns Observable
     */
    uploadThumbnailImage(productID: string): Observable<any> {
        const dialogRef = this.dialog.open(FileUploadDialogComponent, {
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

    contactSeller(): void {
        this.router.navigate(['../chat'], { queryParams: { receiverID: this._pagePersonID } });
    }

    handleNewProduct(product: any) {
        /*
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
        */

        // todo: TEST THESE ARENT EVER NULL!!!!!!
        product.productListedAt = Date.now();
        product.productPrices = [
            new AssetBalance('7.00000', 'native', 'Lumens')
        ];
        product.productSellerData = {
            productSellerID: sessionStorage.getItem('user_doc_id'),
            productSellerName: sessionStorage.getItem('user_name') || '', // TODO: store user data in session storage!!!
            productSellerPublicKey: sessionStorage.getItem('public_key')
        };

        if (!(product.productPrices &&
              product.productSellerData.productSellerID &&
            //   product.productSellerData.productSellerName
              product.productSellerData.productSellerPublicKey && product.productThumbnailLink)) {
                alert('invalid product error');
                return;
        }

        const p = JSON.stringify(product);
        this._productService.addProduct(p)
                    .catch(err => console.log(err))
                    .then(res => this.router.navigate(['/products', res]));
    }

    handleUpdateAddress(): void {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                    title: 'Add Address',
                    content: 'It seems you have not added your address but need to' +
                             'in order to list an item. \n Would you like too now?'
            }
        });
        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                console.log(result);
                const dialogRefInner = this.dialog.open(DialogComponent, {
                    data: { component: DynamicFormComponent,
                            payload: {
                                // questions: new Array(userFormData[3])
                                questions: shippingAddressQuestions
                            }
                    }
                });
                dialogRefInner.afterClosed().subscribe((newAddressData: string) => {
                    if (newAddressData) {
                        console.log(newAddressData);
                        const payload = {
                            id: this._userModel.id,
                            data: newAddressData
                        };
                        return this._userService.updateProfile(payload);
                    }
                });
            }
        });
    }


    // /**
    //  * @returns void
    //  */
    // editProfile(): void {
    //     this.edit = !this.edit;
    // }
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
