import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../_market-models/product';
import { FormGroup } from '@angular/forms';
import { MyFormElement, publicProductData } from 'app/marketplace/_forms/product.form';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;

  private formQuestions: MyFormElement<any>[] = [];
  private productForm: FormGroup;

  constructor() {}

  ngOnInit() {
      if (!this.product) {
        this.product = <Product>{
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
      }
      // this.productForm = createFormGroup(this.product); // this.product
      // this.formQuestions = Object.keys(this.productForm.controls).map(element => {
      //   console.log(element)
      //   console.log(this.productForm.get(element))
      //   return <any>this.productForm.get(element)
      // });
      this.formQuestions = publicProductData;
  }

}
