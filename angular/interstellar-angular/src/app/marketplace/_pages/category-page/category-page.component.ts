import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from '../../_market-models/product';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

    
    private pageCategory: string;
    private categoriedProducts: Observable<Product[]>;

    constructor(private activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private location: Location) { 
        
                  console.log("cat pag  comp")
    }

    ngOnInit() {
        let params: any = this.activatedRoute.snapshot.params;
      // console.log(params);
        this.pageCategory = params.category;
        this._productService.getProductsByCategory(params.category).subscribe(
          products => {
            console.log(products)
            this.categoriedProducts = products;
          }
        )

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

    allCategories() {
        this.location.back(); 
    }
  

}
