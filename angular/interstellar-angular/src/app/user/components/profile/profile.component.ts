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
// import { ShipperService } from 'app/core/services/shipper.service';
import { Asset } from 'app/stellar/assets/asset';
import { stellarTermAssets2 } from 'app/stellar/stellar-term/asset.mappers';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
    // private user: Observable<User>;
    user: Subject<User> = new BehaviorSubject<User>(null);

    // uzr = new Subject<User>();
    // uzr$ = this.uzr.asObservable();

    balances: AssetBalance[];
    products: Observable<Product[]>;

    /** Page Identifiers */
    private _myUserID: string;
    private _pagePersonID: string;
    private isMyProfile;

    // todo: test
    /** User entities */
    orders: Observable<Order[]>;
    transactionSales: Observable<TransactionRecord[]>;
    private _acceptedAssets: Asset[];

    /** Page Helpers */
    // private edit = false;
    private hasAddress = false;

    // todo: NULL CHECK ON ORDER SERVICE
    constructor(private _userService: UserService,
                private _productService: ProductService,
                private _orderService: OrderService,
                private dialog: MatDialog,
                private _route: ActivatedRoute,
                // private _shipperService: ShipperService,
                public router: Router) {
                    super();
    }

    ngOnInit(): void {
        // User Init //
        // switch too this.user$ ... auto destroy / unsubscribe
        // this.userModel = new User('', '', '', '', '', '', 0);
        const myUserID = this.myBaseUserID; // sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this._myUserID = myUserID;
        const pagePersonID = this._route.snapshot.params['id'];
        console.log(pagePersonID)
        // FIXME: HANDLE NULL .... NOT LOGGED IN 
        const path = this._route.snapshot.routeConfig.path;
        this._pagePersonID = pagePersonID;
        this.isMyProfile = (pagePersonID === myUserID);
        // console.log(this._pagePersonID + ' ' + myUserID)
        if (myUserID === pagePersonID && path !== ':id/me') {
            this.router.navigate(['/people', myUserID, 'me']);
            // console.log('its me ');
        }

        // todo: listen for add address
        this._userService.getUserByID(pagePersonID)
            // .then((res: string) => JSON.stringify(res))
            // .then((res: string) => JSON.parse(res))
            .subscribe(user => {
                // const c = <User> JSON.parse(JSON.stringify(user));
                // this.user = Observable.of(user);
                // user = <User> JSON.parse(JSON.stringify(c));
                // const userTyped = <User> JSON.parse(user);
                const userTyped = this._userModel = user;
                // this._userModel = userTyped;
                this._acceptedAssets = (userTyped.acceptedAssets) ? userTyped.acceptedAssets : new Array(stellarTermAssets2[0]);
                // console.log(this._acceptedAssets)
                if (this.isMyProfile) {
                    this.hasAddress = (userTyped.address) ? true : false;
                    this.orders = this._orderService.Orders;
                    if (!this.hasAddress) {
                        this.handleUpdateAddress();
                    }
                }
                this.user = user;
        });
        this.products = this._productService.getProductsByUserID(pagePersonID);
        this.balances = new Array<AssetBalance>();
        const _balances = this.myBaseBalances;
        if (_balances) { this.balances = <AssetBalance[]>JSON.parse(_balances); }
        this.transactionSales = this._orderService.getTransactionSalesByUserID(this._pagePersonID);
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
        // this._shipperService.createAddress();
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { component: DynamicFormComponent,
                    payload: {
                        questions: userFormData,
                        objectMapper: this._userModel
                    }
            }
        });
        // todo MARK DEFAULT ON VALUE
        dialogRef.afterClosed().subscribe((newProfileData: string) => {
            if (newProfileData) {
                const formObject = <any> JSON.parse(newProfileData);
                const acceptedAssetsTempArray = new Array<Asset>();
                acceptedAssetsTempArray.push(stellarTermAssets2[0]);
                (formObject.acceptedAssets as Array<string>)
                    // .map((asset, i) => (asset) ? console.log(stellarTermAssets[i]) : null)
                    .map((asset, i) => {
                        // console.log(asset + ' ' + i)
                        return (asset) ? acceptedAssetsTempArray.push(stellarTermAssets2[i + 1]) : null;
                    });
                    // .map((asset, i) => (asset) ? acceptedAssetsTempArray.push(stellarTermAssets[i]) : null);
                    // .map((asset, i) => (asset) ? acceptedAssetsTempArray.push(stellarAssetsMapper2[i].asset_type) : null);
                formObject.acceptedAssets = acceptedAssetsTempArray;
                formObject.fbID = this._myUserID;
                this._acceptedAssets = acceptedAssetsTempArray;
                // console.log(formObject.acceptedAssets);
                // Object.keys(this.user).map(key => {
                //     if (!formObject[key]) {
                //         console.log(key);
                //     }
                // });
                // this.edit = !this.edit;
                const payload = {
                    id: this._myUserID,
                    data: formObject
                };
                this._userService.updateProfile(JSON.stringify(payload))
                    .map(res => JSON.parse(res))
                    .subscribe(user => this.user = user);
                // this._userService.getCurrentUser().subscribe(user => this.uzr$ = user);
            }
        });
    }

    // todo: BEG USER NOT TOO
    deleteMe() {
        this._userService.deleteUser(this._pagePersonID).then(() => this.router.navigate(['home']));
    }

    goToAddProductpage(): void {
        const acceptedAssetKeys = this._acceptedAssets.map(asset => asset.asset_type);
        const acceptedAssetQueryParams = { queryParams: { acceptedAssets: acceptedAssetKeys } };
        this.router.navigate(['../products/list-new-product'], acceptedAssetQueryParams);
        // this.router.navigate(['../products/list-new-product'], { queryParams: { user: this._userID } });
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P A G E   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns void
     */
    contactSeller(): void {
        this.router.navigate(['../chat'], { queryParams: { receiverID: this._pagePersonID } });
    }

    /**
     * @param  {string} product
     * @returns void
     */
    selectProduct = (productID: string): void => {
        // console.log(productID)
        this.router.navigate(['../products/product', productID]);
    }

    /**
     * @returns Subscription
     */
    handleUpdateAddress(): Subscription {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                    title: 'Add Address',
                    content: 'It seems you have not added your address but need to' +
                             'in order to list an item. \n Would you like too now?'
            }
        });
        return dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                const dialogRefInner = this.dialog.open(DialogComponent, {
                    data: { component: DynamicFormComponent,
                            payload: {
                                questions: shippingAddressQuestions
                            }
                    }
                });
                return dialogRefInner.afterClosed().subscribe((newAddressData: string) => {
                    if (newAddressData) {
                        console.log(newAddressData);
                        const addObj = JSON.parse(newAddressData);
                        const addr: any = {};
                        addr.address = addObj;
                        console.log(addr);
                        const payload = JSON.stringify({
                            id: this._userModel.id,
                            data: addr // {address: addr.address}
                        });
                        return this._userService.updateProfile(payload);
                    }
                });
            }
        });
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
