import { Component, OnInit } from '@angular/core';
import { Product } from '../../../_market-models';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../../../core/services';

@Component({
  selector: 'app-products-home-page',
  templateUrl: './products-home-page.component.html',
  styleUrls: ['./products-home-page.component.css']
})
export class ProductsHomePageComponent implements OnInit {


    private _productList: Observable<Product[]>;

    constructor(private _productService: ProductService) {}

    ngOnInit() {
      this._productList = this._productService.getAllProducts();
              // .map(products => {
              //     console.log('products')
              //     // const _products = new Array(products);
              //     return _products;
              //     // return _users['0'].filter((user: User) => user.id !== myUserID);
              // });
    }

}
