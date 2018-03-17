import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Asset, currencyAssetsMapper, getBalanceforAsset, isValidNewBalance, AccountBalance } from '../../../stellar';
import { ProductService } from 'app/core/services/product.service';

import { validateNewQuantity } from '../product.utils';
import { Product } from '../../_market-models/product';
import {  ProductCategoryEnum } from '../../_market-models/product-category';

import { updateBalance, calcTotalPurchaseAmount } from 'app/stellar/utils';
import { Order } from '../../_market-models/order';
import { CartService } from 'app/core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

    // private product: Observable<Product>;
    private product: Product;

    private myPubKeyId: string;
    private myUserId: string;
    private isMyProduct: boolean;
    private balances: AccountBalance[];

    private assetTypes: any = [];
    private selectedAssetType: Asset;
    private purchaseQuantity: number;

    // private totalPurchaseAmount: number;

    private _sellerShortData: {productSellerID: string, productSellerName: string, productSellerPublicKey: string};

    constructor(private _productService: ProductService,
                private _cartService: CartService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        // let prod = this.product.map(prod => <Product>prod);
        // check again user ID to show or not show add to cart
          this.assetTypes = Object.keys(currencyAssetsMapper).map((type: any) => {
            // console.log(<Array<Asset>> type);
            return <Array<Asset>> type;
          });
          const curBalances = sessionStorage.getItem('my_balances') || localStorage.getItem('my_balances');
          this.balances = <Array<AccountBalance>> JSON.parse(curBalances);
          this.myUserId = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
          this.myPubKeyId = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
          this._productService
                .getProductByProductId(this.route.snapshot.params['id'])
                .map(product => <Product>product)
                .subscribe((product: Product) => {
                    this.product = product;
                    this._sellerShortData = product.productSellerData;
                    this.isMyProduct = (product.productSellerData.productSellerID === this.myUserId);
                    // product.productPrices.forEach((price: ProductPrice) => {
                    //   console.log(price);
                    // });
            });
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

            productSellerData: {
                productSellerID: sessionStorage.getItem('user_doc_id'),
                productSellerName: sessionStorage.getItem('user_name'),
                productSellerPublicKey: sessionStorage.getItem('public_key')
            }
            // productSellerID: "OUvVE6WL3OToob6xRStV",
            // productSellerName: "tito money",
            // productSellerPublicKey: "GCEDZY5CHDSTH5GT67DEHORK23ZLJQAVQTHNG7XBK5JWX675JQ4SOMH7"
        };
        this._productService.addProduct(JSON.stringify(productData));
    }


    onBuyProduct (purchaseQuantity: number = 3) {

      // let curQuant = this.product.map(pro)
      // let prod = this.product.map(prod => <Product>prod).map(prod => prod.quantity)

        if (!this.selectedAssetType) {
          return alert('Please select purchase asset type');
        }

        // validate purchase credentials //
        const totalPurchaseAmount = calcTotalPurchaseAmount(this.selectedAssetType.amount, purchaseQuantity);
        // const order = this.createOrder(purchaseQuantity);
        if (this.validateTransaction(this.product.quantity, purchaseQuantity, totalPurchaseAmount)) {
            this.conductTransaction(this.product.id, purchaseQuantity, totalPurchaseAmount);
        }

    }

    addProductToCart() {
        if (!this.purchaseQuantity) {
            return alert('Please select a valid quantity');
        }
        if (!this.selectedAssetType) {
            return alert('Please select purchase asset type');
        }
        const order = this.createOrder(this.purchaseQuantity);
        this._cartService.addToCart(JSON.stringify(order));
    }

    // private validateSellerStatus(amount: number): boolean {
        // console.log(this.balances);
        // if (this.balances) { console.log( 'there are balances'); }
        // if (!(validateNewQuantity(this.product.quantity, amount) && this.balances)) { return false; }
        // const curBalance = getBalanceforAsset(this.balances, this.selectedAssetType);
        // return (isValidNewBalance2(this.selectedAssetType, curBalance, amount));
    // }

    private createOrder(purchaseQuantity: number, totalPurchaseAmount: number = 0): Order {
        totalPurchaseAmount = calcTotalPurchaseAmount(this.selectedAssetType.amount, purchaseQuantity);
        const asset = new Asset(this.selectedAssetType.asset_type, String(totalPurchaseAmount));
        const order = new Order(this.myPubKeyId, this._sellerShortData.productSellerID, this.product.id,
                                this.product.productName, purchaseQuantity, asset);
        return order;
    }

    private validateTransaction(prodQuantity: number, purchaseQuantity: number, totalPurchaseAmount: number): boolean {
      if (this.balances) { console.log(this.balances); }
      if (!this.balances) {
          alert('You dont seem to have any active balances, please check your account');
          return false;
      }
      // console.log(this.product.quantity + ' ' + amount)
      if (!(validateNewQuantity(this.product.quantity, purchaseQuantity))) {
          alert('That is an invalid purchase quantity');
          return false;
      }
      // console.log(this.selectedAssetType)
      const curBalance = getBalanceforAsset(this.balances, this.selectedAssetType.asset_type);
      // console.log(curBalance)
      if (!isValidNewBalance(this.selectedAssetType.asset_type, curBalance, totalPurchaseAmount)) {
          alert('You don\'t seem to have sufficient funds or \n ' +
                'the purchase amount goes below the minimum required holding threshold');
          return false;
      }
      return true;
  }

    private conductTransaction(prodID: string, purchaseQuantity: number, totalPurchaseAmount: number) {

        // need to update quantity

        //// 0----> change like below, handle in service
        //     updateProductQuantity(purchaseQuantity);
        this._productService.updateProduct(this.product.id, {quantity: this.product.quantity - purchaseQuantity});

        // create order for transaction //
        const order = this.createOrder(purchaseQuantity, totalPurchaseAmount);

        // update user balance for asset //
        updateBalance(this.balances, order.assetPurchaseDetails);

        // need to create order / transaction for both parties
        // const asset = new Asset(this.selectedAssetType.asset_type, String(totalPurchaseAmount));
        // const order = new Order(this.myPubKeyId, this._sellerShortData.productSellerID, prodID,
        //                         this.product.productName, purchaseQuantity, asset);

        // need to make payment - see above

    }
}


/*
  SBXVQZTXNZCHYPE3PF43IOFH6E3VOH47ZZKRW6MTZLZL5VIO5QZCP7KQ
  GCEDZY5CHDSTH5GT67DEHORK23ZLJQAVQTHNG7XBK5JWX675JQ4SOMH7
  10000.0000000 native
*/

