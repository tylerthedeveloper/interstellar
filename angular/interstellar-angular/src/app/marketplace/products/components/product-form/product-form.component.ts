import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../_market-models/product';
import { FormGroup } from '@angular/forms';
import { createFormGroup } from 'app/UI/utils';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;

  private productForm: FormGroup;

  constructor() { Object.getOwnPropertyDescriptor(Product).forEach(a => console.log(a)) 
  console.log(Product.getClass()) }

  ngOnInit() {
      this.productForm = createFormGroup(Product, this.product);
  }

}
