import { Component, OnInit, ViewChild } from '@angular/core';
import { productFormData } from '../../product.details';
import { DynamicFormComponent } from 'app/shared/forms/dynamic-form/dynamic-form.component';
import { DialogComponent, FileUploadDialogComponent } from 'app/shared/components';
import { Product } from 'app/marketplace/_market-models';
import { areValidProductTypes } from 'app/marketplace/products/product.utils';
import { ProductService } from 'app/core/services';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AssetBalance } from 'app/stellar';
import { shippingTypeQuestions } from 'app/marketplace/shipping/shipping.details';
import { shipTypes } from 'app/marketplace/shipping/ship-types';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AngularFireStorageReference } from 'angularfire2/storage/ref';
import { AngularFireStorage } from 'angularfire2/storage/storage';
import { AngularFireUploadTask } from 'angularfire2/storage/task';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {
    productInfo: Product;
    shippingInfo: {shipCost: number, shipTypes: Array<string>};
    productImage: any;
    shipTypeOptions: any;
    private imageUrl = '';

    @ViewChild('fileInput') fileInput;

    // ref: AngularFireStorageReference;
    // task: AngularFireUploadTask;


    shipFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    thirdFormGroup: FormGroup;

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

    public title: string;
    public content: string;
    private fileToUpload: File;
    shipTypes: any;
    constructor(private _productService: ProductService,
                public router: Router,
                private _formBuilder: FormBuilder,
                private afStorage: AngularFireStorage,
                private dialog: MatDialog) {}

    // https://stackblitz.com/edit/angular-tyfg2z?file=app%2Fapp.component.ts
    // https://stackoverflow.com/questions/46749251/angular-material-how-to-handle-multiple-checkboxes-with-formgroup
    ngOnInit() {
        this.shipTypeOptions = shipTypes.map(method => ({key: method.type,  value: method.value}));
        this.shipFormGroup = this._formBuilder.group({
            shipCost: [1, Validators.required],
            shipTypes: this._formBuilder.array([])
        });
        // const formArray = this.shipFormGroup.get('shipTypes') as FormArray;
        // this.shipTypes.forEach(x => formArray.push(new FormControl(x)));
    }
    /**
     * @returns void
     */
    // todo: confirm success
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
                const product = <Product> JSON.parse(JSON.stringify(result));
                try {
                    product.quantity = Number(product.quantity);
                    product.fixedUSDAmount = Number(product.fixedUSDAmount);
                    if (!areValidProductTypes(product)) {
                        alert('invalid product error');
                        return;
                    }
                    // const newProductID = this._productService.getNewProductID();
                    this.productInfo = product;
                } catch (e) {
                    alert('invalid product details:\n' + e);
                }
            }
        });
    }

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


    addShippingInfo(): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: { component: DynamicFormComponent,
                    payload: {
                        questions: shippingTypeQuestions,
                    }
            }
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result) {
                // const product = <Product> JSON.parse(JSON.stringify(result));
                console.log(result);
                // try {
                //     product.quantity = Number(product.quantity);
                //     product.fixedUSDAmount = Number(product.fixedUSDAmount);
                //     if (!areValidProductTypes(product)) {
                //         alert('invalid product error');
                //         return;
                //     }
                //     // const newProductID = this._productService.getNewProductID();
                //     product.id = this._productService.getNewProductID();
                //     this.productInfo = product;
                // } catch (e) {
                //     alert('invalid product details:\n' + e);
                // }
            }
        });
    }
    /**
     * @param  {string} productID
     * @returns Observable
     */
    addProductImage(productID: string) {
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
        // return dialogRef.afterClosed();
    }

    handleNewProduct(product: any) {

      // todo: TEST THESE ARENT EVER NULL!!!!!!
      product.productListedAt = Date.now();
      product.productPrices = [
          new AssetBalance({ balance: '7.00000', asset_type: 'native', coin_name: 'Lumens'})
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


    onChange(event) {
        const _shipTypes = <FormArray>this.shipFormGroup.get('shipTypes') as FormArray;

        if (event.checked) {
            _shipTypes.push(new FormControl(event.source.value));
        } else {
          const i = _shipTypes.controls.findIndex(x => x.value === event.source.value);
          _shipTypes.removeAt(i);
        }
    }

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

    submitNewProduct() {
        if (!this.productInfo) {
            return alert('please enter product info');
        } else if (!this.shippingInfo) {
            return alert('please enter shipping info');
        } else if (!(this.fileToUpload && this.fileInput && this.imageUrl)) {
            return alert('please add an image');
        }
        const _product = this.productInfo;

        // todo product shipping info
        // _product.shipingInfp = this.shippingInfo
        // this._productService.addProduct(_product).then
    }
}
