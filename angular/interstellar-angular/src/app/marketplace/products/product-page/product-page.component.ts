import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../_market-models/product';
import { ProductService } from 'app/core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

    public product: Observable<Product>;

    constructor(private _productService: ProductService,
                private route: ActivatedRoute) { 

                  this._productService
                    .getProductByProductId(this.route.snapshot.params["id"])
                    .subscribe(product => this.product = product)
    }

    ngOnInit() {
    }

    addProduct () {
      let _pubKey = sessionStorage.getItem("public_key") || 
                          localStorage.getItem("public_key");
      var productData = {  
            itemName: "hot dog",
            shortDescription: "short des",
            description: "long des",
            publicKey: _pubKey,
            price: 10,
            quantity: 10,
            productCategory: "food"
        };
      this._productService.addProduct(JSON.stringify(productData));
    } 
}
