/** Angular */
import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ComponentFactory, ViewChild, Type } from '@angular/core';

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
import { publicProductData } from '../../../marketplace/_forms/product.form';
import { DialogComponent } from '../../_components/dialog/dialog.component';
import { DynamicFormComponent } from '../../forms/dynamic-form/dynamic-form.component';


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
                private viewContainerRef: ViewContainerRef,
                private componentFactoryResolver: ComponentFactoryResolver) {}

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


    createComponentRef(a: any, b: any) {
        // const factory = this.resolver.resolveComponentFactory(this.data.component);
        // this.componentRef = this.vcRef.createComponent(factory);
        // this.componentRef.instance.objectMapper = this.data.data;
        // this.componentRef.instance.questions = this.data.mapper;  
    }

    /**
     * @returns void
     */
    addProduct(): void {
        const product = <Product> {
            productName: 'super fast GPU22222222',
            productShortDescription: '',
            productLongDescription: 'looooooooooooong des',
            fixedUSDAmount: 10,
            quantity: 15,
            productCategory: 'Electronics',
            productPrices: [
            ],
            productThumbnailLink: 'https://images10.newegg.com/productimage/14-487-290-01.jpg',
            productSellerData: {
                productSellerID: sessionStorage.getItem('user_doc_id'),
                productSellerName: sessionStorage.getItem('user_name'),
                productSellerPublicKey: sessionStorage.getItem('public_key')
            }
        };

        /*
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

       let dialogRef = this.dialog.open(DialogComponent, {
            // width: '250px',
            data: { component: DynamicFormComponent, 
                    payload: { 
                        questions: publicProductData, 
                        objectMapper: product 
                    }
            }
        });
        // let dialogRef: MatDialogRef<DialogComponent>;
        // this.dialog.invoke(DialogComponent, {
        // // let dialogRef2: MatDialogRef<DialogComponent>;
        //     width: '250px',
        //     data: { component: componentRef, mapper: publicProductData, data: product }
        // });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                console.log('resultttttt');
            }
            console.log(result);
            });
    }

    // loadComponent(viewContainerRef: ViewContainerRef, postItem: Product) {
    //     const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicFormComponent);
    //     const componentRef = this.viewContainerRef.createComponent(componentFactory);
    //     viewContainerRef.clear();
    // }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P A G E   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //



    /**
     * @returns void
     */
    editProfile(): void {
        this.edit = !this.edit;
    }
    // ────────────────────────────────────────────────────────────────────────────────
}

