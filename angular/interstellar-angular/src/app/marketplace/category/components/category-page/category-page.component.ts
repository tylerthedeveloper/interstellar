import { Component, OnInit } from '@angular/core';
// TODO: import { CommonModule, Location } from '@angular/common';
import {  Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from 'app/core/services/product.service';
import { AssetBalance } from 'app/stellar';
import { PartialProduct } from 'app/marketplace/_market-models/partial-product';
import { ProductCategoryEnum } from 'app/marketplace/_market-models/product-category';

@Component({
    selector: 'app-category-page',
    templateUrl: './category-page.component.html',
    styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {


    /** Page information */
    // TODO: GET CATEGORY NOT JUST PARAM STRING ... DOES THIS MATTER?
    private pageCategory: string;
    // TODO: decide on partial for pre-optimal-loading
    private categoriedProducts: Observable<PartialProduct[]>;

    constructor(private activatedRoute: ActivatedRoute,
        private _productService: ProductService,
        private location: Location,
        public router: Router) {
    }

    ngOnInit() {
        const params: any = this.activatedRoute.snapshot.params;
        this.pageCategory = params.category;
        this.categoriedProducts = this._productService.getProductsByCategory(params.category);
    }

    // TODO: Remove
    addProduct() {
        if (!(sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id')) &&
            (sessionStorage.getItem('public_key') || localStorage.getItem('public_key')) &&
            (sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key'))) {
                alert('You must be logged in order to post a new product');
                return;
        }
        const productData = {
            productName: 'super fast GPU',
            productShortDescription: 'short des',
            productLongDescription: 'looooooooooooong des',

            fixedUSDAmount: 10,
            quantity: 15,
            productCategory: ProductCategoryEnum.Electronics,
            productPrices: [
                new AssetBalance('5.00000', 'native', 'Lumens'),
                new AssetBalance('7.00000', 'tycoin', 'Tycoins')
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

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    /**
     * @returns void
     */
    allCategories(): void {
        this.location.back();
    }

    /**
     * @param  {string} product
     * @returns void
     */
    onSelectProduct(product: string): void {
        this.router.navigate(['/products', product['id']]);
    }
    // ────────────────────────────────────────────────────────────────────────────────
}
