/** Angular */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

/** firebase */
import * as firebase from 'firebase/app';
import { AngularFireStorageReference } from 'angularfire2/storage/ref';
import { AngularFireStorage } from 'angularfire2/storage/storage';
import { AngularFireUploadTask } from 'angularfire2/storage/task';

/** Shared */
import { DynamicFormComponent } from 'app/shared/forms/dynamic-form/dynamic-form.component';
import { DialogComponent } from 'app/shared/components';

/** stellar */
import { AssetBalance } from 'app/stellar';
import { stellarTermAssets2 } from 'app/stellar/stellar-term/asset.mappers';

/** product */
import { ProductService } from 'app/core/services';
import { productFormData } from '../../product.details';
import { Product, ShippingInformation } from 'app/marketplace/_market-models';
import { areValidProductTypes } from 'app/marketplace/products/product.utils';

/** Shipping */
import { shippingTypeQuestions } from 'app/marketplace/shipping/shipping.details';
import { shipTypes } from 'app/marketplace/shipping/ship-types';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {

    /** Form holders on front end */
    private productInfo: Product;
    private shippingInfo: Array<string>;

    /** Image / file */
    @ViewChild('fileInput') private fileInput;
    private imageUrl = '';
    private fileToUpload: File;

    /** Angular fire helpers */
    private ref: AngularFireStorageReference;
    private task: AngularFireUploadTask;

    constructor(private _productService: ProductService,
                private router: Router,
                private _route: ActivatedRoute,
                // private _formBuilder: FormBuilder,
                private afStorage: AngularFireStorage,
                private dialog: MatDialog) {}

    // https://stackblitz.com/edit/angular-tyfg2z?file=app%2Fapp.component.ts
    // https://stackoverflow.com/questions/46749251/angular-material-how-to-handle-multiple-checkboxes-with-formgroup
    ngOnInit() {
        // this.shipTypeOptions = shipTypes.map(method => ({key: method.type,  value: method.value}));
        // this.shipFormGroup = this._formBuilder.group({
        //     shipCost: [1, Validators.required],
        //     shipTypes: this._formBuilder.array([])
        // });
        // const formArray = this.shipFormGroup.get('shipTypes') as FormArray;
        // this.shipTypes.forEach(x => formArray.push(new FormControl(x)));
        // console.log(this._route.snapshot.queryParams['acceptedAssets']);

    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    /**
     * @returns void
     */
    addProductInfo(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { component: DynamicFormComponent,
                    payload: {
                        questions: productFormData,
                    }
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                const product = <Product> JSON.parse(result);
                try {
                    this.productInfo = product;
                    product.quantity = Number(product.quantity);
                    product.fixedUSDAmount = Number(product.fixedUSDAmount);
                    if (!areValidProductTypes(product)) {
                        alert('invalid product error');
                        return;
                    }
                } catch (e) {
                    alert('invalid product details:\n' + e);
                }
            }
        });
    }

/*
    saveShippingInfo(form: FormGroup) {
        const _shipCost = form.get('shipCost').value as number;
        const _shipTypes = form.get('shipTypes').value as Array<string>;
        console.log(_shipTypes);
        const shipObject = {
          shipCost: _shipCost,
          shipTypes: _shipTypes
        };
        this.shippingInfo = shipObject;
    }
*/
    /**
     * @returns void
     */
    addShippingInfo(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { component: DynamicFormComponent,
                    payload: {
                        questions: shippingTypeQuestions,
                    }
            }
        });

        dialogRef.afterClosed().subscribe((shippingInforesult: string) => {
            if (shippingInforesult) {
                const formObject = <any> JSON.parse(shippingInforesult);
                this.shippingInfo = (formObject.shipTypes as Array<string>)
                    .reduce(( accumulator: Array<any>, curShipBool: string, index: number) => {
                        if (curShipBool) {
                            accumulator.push(shipTypes[index].type);
                        }
                        return accumulator;
                }, []);
                this.productInfo.shippingInfo = new ShippingInformation(this.shippingInfo);
            }
        });
    }

    /*
    addProductImage() {
        const dialogRef = this.dialog.open(FileUploadDialogComponent);
          //     (imageUploadResultURL: string) => {
          //         if (imageUploadResultURL) {
          //             product.productThumbnailLink = imageUploadResultURL;
          //             this.handleNewProduct(product);
          //         }
          //     },
          //     err => {
          //         alert('errror: \n ' + err);
          //     });
        dialogRef.afterClosed().subscribe((result: any) => {
            console.log(result);
        });
    }
    */

    /**
     * @returns void
     */
    submitNewProduct(): void {
        if (!this.productInfo) {
            return alert('please enter product info');
        } else if (!this.shippingInfo) {
            return alert('please enter shipping info');
        } else if (!(this.fileToUpload && this.fileInput && this.imageUrl)) {
            return alert('please add an image');
        }

        if (this.handleNewProduct()) {
            this._productService.addProduct(JSON.stringify(this.productInfo))
                        .catch(err => console.log(err))
                        .then((res: any) => JSON.parse(res))
                        .then((res: any) => this.router.navigate(['/products/product', res.id]));

        }
    }
    // ────────────────────────────────────────────────────────────────────────────────

    //
    // ────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────
    //

    // onChange(event) {
    //     const _shipTypes = <FormArray>this.shipFormGroup.get('shipTypes') as FormArray;

    //     if (event.checked) {
    //         _shipTypes.push(new FormControl(event.source.value));
    //     } else {
    //       const i = _shipTypes.controls.findIndex(x => x.value === event.source.value);
    //       _shipTypes.removeAt(i);
    //     }
    // }

    /**
     * @returns void
     */
    renderFile(): void {
        const files = this.fileInput.nativeElement.files;
        if (files && files[0]) {
            const reader = new FileReader();
            const fileToUpload = files[0];
            reader.readAsDataURL(fileToUpload);
            reader.onloadend = () => {
                this.imageUrl = reader.result;
                this.fileToUpload = fileToUpload;
            };
        }
    }

    /**
     * @returns void
     */
    uploadFile(): void {
        console.log(this.imageUrl);
        console.log(this.fileToUpload);
        const _id = this._productService.getNewProductID();
        this.productInfo.id = _id;
        this.ref = this.afStorage.ref('productThumbnails');
        this.task = this.ref.child(_id)
            .put(this.fileToUpload)
            .then((res: firebase.storage.UploadTaskSnapshot) => {
                // console.log(res);
                // if (res.state === 'success') {
                    // this.dialogRef.close(res.downloadURL);
                    console.log(res.downloadURL);
                    this.productInfo.productThumbnailLink = res.downloadURL;
                // }
            })
            .catch(err => console.log('errr" \n' + err));
    }

    /**
     * @returns boolean
     */
    handleNewProduct(): boolean {
        // todo: TEST THESE ARENT EVER NULL!!!!!!
        const product = this.productInfo;
        product.productListedAt = Date.now();
        const acceptedAssets = this._route.snapshot.queryParams['acceptedAssets'];
        console.log(acceptedAssets);
        product.productAssetOptions = acceptedAssets;
        let assetBalances: Array<AssetBalance> = new Array();
        if (typeof acceptedAssets === 'string') {
            const asset = stellarTermAssets2.find(STA => STA.asset_type === acceptedAssets);
            const assetObj = {
                asset_type: asset.asset_type,
                coin_name: asset.coin_name,
                balance: '0.0000'
            };
            assetBalances.push(new AssetBalance(assetObj));
        } else {
            assetBalances = acceptedAssets.map(asset_type => {
                const asset = stellarTermAssets2.find(STA => STA.asset_type === asset_type);
                // console.log(asset)
                // console.log(asset_type)
                // stellarTermAssets2.map(STA => {
                //     console.log(STA)
                //     console.log(STA.asset_type)
                //     console.log(STA.asset_type === asset_type)
                // })
                const assetObj = {
                    asset_type: asset.asset_type,
                    coin_name: asset.coin_name,
                    balance: '0.0000'
                };
                return new AssetBalance(assetObj);
            });
        }
        product.productPrices = assetBalances;
        console.log(assetBalances);
        // product.productPrices = [
        //     new AssetBalance({ balance: '7.00000', asset_type: 'native', coin_name: 'Lumens'})
        // ];
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
                return false;
      }
      return true;
    }
    // ────────────────────────────────────────────────────────────────────────────────



}
