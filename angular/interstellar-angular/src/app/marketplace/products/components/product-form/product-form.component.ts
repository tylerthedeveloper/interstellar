import { Component, OnInit, Input } from '@angular/core';
import { Product, publicProductData } from '../../../_market-models/product';
import { FormGroup } from '@angular/forms';
import { createFormGroup } from 'app/UI/utils';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;

  private productForm: FormGroup;


  // test reflectio
  constructor() {}

  ngOnInit() {
      this.productForm = createFormGroup(publicProductData, this.product);
  }

}
