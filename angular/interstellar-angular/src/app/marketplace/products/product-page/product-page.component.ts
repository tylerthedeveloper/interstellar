import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { AssetBalance, currencyAssetsMapper, getBalanceforAsset, isValidNewBalance } from '../../../stellar';
import { ProductService } from 'app/core/services/product.service';

import { validateNewQuantity } from '../product.utils';
import { Product } from '../../_market-models/product';
import {  ProductCategoryEnum } from '../../_market-models/product-category';

import { updateBalance, calcTotalPurchaseAmount } from 'app/stellar/utils';
import { CartService } from 'app/core/services/cart.service';
import { CartItem } from '../../_market-models/cart-item';

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
    private balances: AssetBalance[];

    private assetTypes: any = [];

    // TODO: CHANGE THIS TO NULL
    private selectedAssetType: AssetBalance; //  = <Asset> { asset_type: 'native', amount: '5' };

    // TODO: CHANGE THIS TO 0
    private purchaseQuantity = 1;

    private _sellerShortData: {productSellerID: string, productSellerName: string, productSellerPublicKey: string};

    private isLoggedIn = false;
    private isInStock = true;

    constructor(private _productService: ProductService,
                private _cartService: CartService,
                private _router: Router,
                private route: ActivatedRoute)  {}

    ngOnInit() {
        this.myUserId = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.myPubKeyId = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
        const curBalances = sessionStorage.getItem('my_balances') || localStorage.getItem('my_balances');
        this.isLoggedIn = (this.myUserId != null && this.myPubKeyId != null);
        this.balances = <Array<AssetBalance>> JSON.parse(curBalances);
        this.assetTypes = Object.keys(currencyAssetsMapper).map((type: any) => <Array<AssetBalance>> type);

        this._productService
            .getProductByProductId(this.route.snapshot.params['id'])
            .map(product => <Product> product)
            .subscribe(product => {
                this.product = product;
                this._sellerShortData = (product) ? product.productSellerData : null ;
                this.isInStock = (product) ? (product.quantity > 0) : false;
                this.isMyProduct = (product) ? (product.productSellerData.productSellerID === this.myUserId) : false;
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
                { asset_type: 'native', balance: 5 },
                { asset_type: 'tycoin', balance: 7  },
            ],

            productSellerData: {
                productSellerID: sessionStorage.getItem('user_doc_id'),
                productSellerName: sessionStorage.getItem('user_name'),
                productSellerPublicKey: sessionStorage.getItem('public_key')
            }
        };
        this._productService.addProduct(JSON.stringify(productData));
    }

    //
    // ────────────────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P U B L I C   M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ────────────────────────────────────────────────────────────────────────────────────────
    //
    public onBuyProduct () {
        const purchaseQuantity = this.purchaseQuantity;
        if (this.onValidateProductAction()) {
            const totalPurchaseAmount = calcTotalPurchaseAmount(this.selectedAssetType.balance, purchaseQuantity);
            if (this.validateTransaction(purchaseQuantity, totalPurchaseAmount)) {
                this.goToCheckout(purchaseQuantity, totalPurchaseAmount);
            }
        }
    }

    public addProductAndGoToCart() {
        if (this.addProductToCart()) {
            this._router.navigate(['/cart']);
        } else {
            alert('couldnt be completed');
        }
    }

    public addProductToCart(): boolean {
        if (this.onValidateProductAction()) {
            const cartItem = this.createCartItem(this.purchaseQuantity);
            this._cartService.addToCart(JSON.stringify(cartItem));
            this.onCompleteProductAction();
            return true;
        }
        return false;
    }


    public editProduct() {
        // TODO: ....
        this._productService.updateProduct(this.product.id, this.product);
    }

    public deleteProduct() {
        // TODO: ....
        alert('are you sure you want to delete --> CHANGE TO MODAL ...');

        this._sellerShortData = null;
        this.isInStock = false;
        this.isMyProduct = false;
        this._router.navigate(['../profile']);
        this._productService.deleteProduct(this.product.id, this.product.productCategory);
    }

    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M E T H O D   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //
    private validateTransaction(purchaseQuantity: number, totalPurchaseAmount: number): boolean {
        if (this.balances) { console.log(this.balances); }
        if (!this.balances) {
            return this.errorAndAlert('You dont seem to have any active balances, please check your account');
        }
        if (!(validateNewQuantity(this.product.quantity, purchaseQuantity))) {
            return this.errorAndAlert('That is an invalid purchase quantity');
        }
        const curBalance = Number(getBalanceforAsset(this.balances, this.selectedAssetType.asset_type));
        if (!isValidNewBalance(this.selectedAssetType.asset_type, curBalance, totalPurchaseAmount)) {
            return this.errorAndAlert('You don\'t seem to have sufficient funds or \n ' +
                    'the purchase amount goes below the minimum required holding threshold');
        }
        return true;
    }

    private goToCheckout(purchaseQuantity: number, totalPurchaseAmount: number) {

        const cartItem = this.createCartItem(purchaseQuantity, totalPurchaseAmount);
        cartItem.isInCheckout = true;
        this._cartService.addToCart(JSON.stringify(cartItem));

        // TODO: need to update quantity
        // this._productService.updateProduct(this.product.id, {quantity: this.product.quantity - purchaseQuantity});

        // TODO: test from here or seller ......
        // update user balance for asset //
        updateBalance(this.balances, cartItem.assetPurchaseDetails);
        this._router.navigate(['/cart/checkout']);
        this.onCompleteProductAction();

    }

  // private validateSellerStatus(amount: number): boolean {
        // console.log(this.balances);
        // if (this.balances) { con sole.log( 'there are balances'); }
        // if (!(validateNewQuantity(this.product.quantity, amount) && this.balances)) { return false; }
        // const curBalance = getBalanceforAsset(this.balances, this.selectedAssetType);
        // return (isValidNewBalance2(this.selectedAssetType, curBalance, amount));
    // }

    private createCartItem(purchaseQuantity: number, totalPurchaseAmount: number = 0): CartItem {
        totalPurchaseAmount = calcTotalPurchaseAmount(this.selectedAssetType.balance, purchaseQuantity);
        const asset = new AssetBalance(String(totalPurchaseAmount), this.selectedAssetType.asset_type, this.selectedAssetType.coin_name);
        const cartItem: CartItem = <CartItem> {
                buyerUserID: this.myUserId,
                buyerPublicKey: this.myPubKeyId,

                sellerUserID: this._sellerShortData.productSellerID,
                sellerPublicKey: this._sellerShortData.productSellerPublicKey,

                productID: this.product.id,
                productName: this.product.productName,
                quantityPurchased: purchaseQuantity,
                fixedUSDAmount: this.product.fixedUSDAmount,
                productThumbnailLink: this.product.productThumbnailLink,
                assetPricePerItem: this.selectedAssetType.balance,
                assetPurchaseDetails: asset
        };
        return cartItem;
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: P A G E   H E L P E R S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //
    private onValidateProductAction(): boolean {
        if (!this.purchaseQuantity) {
            return this.errorAndAlert('Please select a valid quantity');
        }
        if (!this.selectedAssetType) {
            return this.errorAndAlert('Please select purchase asset type');
        }
        return true;
    }

    private onCompleteProductAction() {
        this.purchaseQuantity = 1;
        this.selectedAssetType = null;
    }

    private errorAndAlert(errorMessage: string): boolean {
        alert(errorMessage);
        return false;
    }
    // ────────────────────────────────────────────────────────────────────────────────

}


/*
  SBXVQZTXNZCHYPE3PF43IOFH6E3VOH47ZZKRW6MTZLZL5VIO5QZCP7KQ
  GCEDZY5CHDSTH5GT67DEHORK23ZLJQAVQTHNG7XBK5JWX675JQ4SOMH7
  10000.0000000 native
*/

