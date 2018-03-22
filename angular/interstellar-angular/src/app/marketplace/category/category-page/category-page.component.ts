import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ProductCardComponent } from '../../products/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductService } from 'app/core/services/product.service';
import { PartialProduct } from '../../_market-models/partial-product';
import { ProductCategoryEnum } from '../../_market-models/product-category';
import { Asset } from 'app/stellar';

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
    }

    ngOnInit() {
        const params: any = this.activatedRoute.snapshot.params;
        this.pageCategory = params.category;
        this._productService.getProductsByCategory(params.category).subscribe(products => this.categoriedProducts = products);
    }

    addProduct () {
        const _pubKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
        const productData = {
              itemName: 'hot dog',
              description: 'cha already know',
              publicKey: _pubKey,
              price: 10,
              quantity: 10,
              productCategory: 'food'
          };
        this._productService.addProduct(JSON.stringify(productData));
    }

    addProduct2 () {
      const productData = {
            productName: 'super fast GPU',
            productShortDescription: 'short des',
            productLongDescription: 'looooooooooooong des',

            fixedUSDAmount: 10,
            quantity: 15,
            productCategory: ProductCategoryEnum.Electronics,
            productPrices: [
                <Asset> { asset_type: 'native', amount: '5.00000' },
                <Asset> { asset_type: 'tycoin', amount: '7.00000'  },
            ],

            productThumbnailLink: 'https://images10.newegg.com/productimage/14-487-290-01.jpg',

            productSellerData: {
                productSellerID: sessionStorage.getItem('user_doc_id'),
                productSellerName: sessionStorage.getItem('user_name'),
                productSellerPublicKey: sessionStorage.getItem('public_key')
            }
        };
        this._productService.addProduct(JSON.stringify(productData));
    }

    allCategories() {
        this.location.back();
    }

    onSelectProduct = (product: string) => {
        this.router.navigate(['/products', product['id']]);
    }


}
