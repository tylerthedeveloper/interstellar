import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductPageComponent implements OnInit {

  constructor(private _productService: ProductService) { }

  ngOnInit() {
  }

  addProduct () {
    let _pubKey = sessionStorage.getItem("public_key") || 
                        localStorage.getItem("public_key");
    var productData = {  
          itemName: "hot dog",
          description: "cha already know",
          publicKey: _pubKey,
          price: 10,
          quantity: 10,
          productCategory: "food"
      };
    this._productService.addProduct(JSON.stringify(productData));
  } 
}
