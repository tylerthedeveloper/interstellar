import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Asset, currencyAssetsMapper, getBalanceforAsset, isValidNewBalance2, AccountBalance } from '../../../stellar';
import { ProductService } from 'app/core/services/product.service';

import { validateNewQuantity } from '../product.utils';
import { Product } from '../../_market-models/product';
import {  ProductCategoryEnum } from '../../_market-models/product-category';

import { User } from '../../../user';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

    // private product: Observable<Product>;
    private product: Product;
    private prodSellerId: string;
    private myPubKeyId: string;
    private isMyProduct: boolean;
    private assetTypes: any = [];
    private selectedAssetType: string;
    private balances: AccountBalance[];

    // private seller: Observable<User>;
    // private _seller: User;
    private _sellerShortData: {};


    constructor(private _productService: ProductService,
                private _userService: UserService,
                private route: ActivatedRoute) {

                //   this.postSearchOptions = Object.keys(SearchOptions).map(opt => {
                //     return { value: SearchOptions[opt], viewValue: opt };
                // });
    }

    ngOnInit() {
        // let prod = this.product.map(prod => <Product>prod);
        // check again user ID to show or not show add to cart
      // use session / local ...
                this._productService
                      .getProductByProductId(this.route.snapshot.params['id'])
                      .map(product => <Product>product)
                      .subscribe((product: Product) => {
                        // const _product = <Product>product;
                        // this._product = _product;
                          this.product = product;
                          this.prodSellerId = product.productSellerID;
                          this._sellerShortData = {
                            productSellerID: product.productSellerID,
                            productSellerName: product.productSellerName,
                            productSellerPublicKey: product.productSellerPublicKey
                          };

                        // console.log(_product.productSellerID);
                        // this._userService.getUsersByID(_product.productSellerID).subscribe(
                        //     (seller: User) => {
                        //           console.log(seller);
                        //           // this._seller = seller.map(user => <User>user);
                        //           this._seller = seller;
                        //           this._sellerShortData = {
                        //             productSellerID: seller.id,
                        //             productSellerName: seller.fullName,
                        //             productSellerPublicKey: seller.publicKey
                        //           };
                        //       });
                  });

                  this.assetTypes = Object.keys(currencyAssetsMapper).map((type: any) => <Array<Asset>> type);
                  const curBalances = sessionStorage.getItem('my_balances') || localStorage.getItem('my_balances');
                  this.balances = <Array<AccountBalance>> JSON.parse(curBalances);
                  this.myPubKeyId = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
                  this.isMyProduct = (this.prodSellerId === this.myPubKeyId);
    }

    addProduct () {
      const productData = {
            itemName: 'hot dog',
            shortDescription: 'short des',
            description: 'long des',
            publicKey: this.myPubKeyId,
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

            publicKey: this.myPubKeyId,
            price: 10,
            quantity: 15,
            productCategory: ProductCategoryEnum.Electronics,
            productPrices: [
                // new Asset ()
                { asset_type: 'native', amount: 5 },
                { asset_type: 'tycoin', amount: 7  },
            ],

            productSellerID: sessionStorage.getItem('user_doc_id'),
            productSellerName: sessionStorage.getItem('user_name'),
            productSellerPublicKey: sessionStorage.getItem('public_key')
            // productSellerID: this._seller.fullName,
            // productSellerName: this._seller.fullName,
            // productSellerPublicKey: this._seller.publicKey
            // productSellerID: "OUvVE6WL3OToob6xRStV",
            // productSellerName: "tito money",
            // productSellerPublicKey: "GCEDZY5CHDSTH5GT67DEHORK23ZLJQAVQTHNG7XBK5JWX675JQ4SOMH7"
        };
        this._productService.addProduct(JSON.stringify(productData));
    }


    onBuyProduct (amount: number) {

      // let curQuant = this.product.map(pro)
      // let prod = this.product.map(prod => <Product>prod).map(prod => prod.quantity)

        // validate quantity //
        if (this.validateTransaction(this.myPubKeyId, this.product.quantity, amount)) {
            this.conductTransaction(this.myPubKeyId, this.product.id, amount);
        }

    }

    addProductToCart() {
        // validate quantity
    }

    private validateTransaction(pubKey: string, prodQuantity: number, amount: number): boolean {
        console.log(this.balances);
        if (this.balances) { console.log( 'there are balances'); }
        if (!(validateNewQuantity(this.product.quantity, amount) && this.balances)) { return false; }
        const curBalance = getBalanceforAsset(this.balances, this.selectedAssetType);
        return (isValidNewBalance2(this.selectedAssetType, curBalance, amount));
    }

    private conductTransaction(pubKey: string, prodId: string, amount: number) {
        const assetAmount = this.product.productPrices.find(aType => aType.productAssetType === this.selectedAssetType);
        console.log(assetAmount);

        // need to update quantity
        // need to update user balance
        // need to make payment - see above
        // need to create order / transaction for both parties

    }
}


/*
  SBXVQZTXNZCHYPE3PF43IOFH6E3VOH47ZZKRW6MTZLZL5VIO5QZCP7KQ
  GCEDZY5CHDSTH5GT67DEHORK23ZLJQAVQTHNG7XBK5JWX675JQ4SOMH7
  10000.0000000 native
*/

