import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ProductCardComponent } from'../../products/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductService } from 'app/core/services/product.service';
import { PartialProduct } from '../../_market-models/partial-product';

@Component({
  selector: 'category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

    
    private pageCategory: string;
    private categoriedProducts: Observable<PartialProduct[]>;

    constructor(private activatedRoute: ActivatedRoute,
                private _productService: ProductService,
                private location: Location,
                public router: Router) { 
        
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

    onSelectProduct = (product: string) => {
      console.log(product["id"])
      this.router.navigate(['/products', product["id"]]);

    }
  

}
