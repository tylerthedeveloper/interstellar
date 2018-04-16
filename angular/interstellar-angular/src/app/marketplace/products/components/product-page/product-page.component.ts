//  TODO: NEEDS TO RETURN CONFIRMATION / TRUE --> for all helpers

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { CommonModule, Location } from '@angular/common';
import { Location } from '@angular/common';

import { AssetBalance, currencyAssetsMapper, getBalanceforAsset, isValidNewBalance, updateBalance, calcTotalPurchaseAmount } from 'app/stellar';
import { ProductService } from 'app/core/services/product.service';

import { CartService } from 'app/core/services/cart.service';
import { Product } from 'app/marketplace/_market-models/product';
import { ProductCategoryEnum } from 'app/marketplace/_market-models/product-category';
import { validateNewQuantity } from 'app/marketplace/products/product.utils';
import { CartItem } from 'app/marketplace/_market-models/cart-item';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

    /** User Info */
    private myUserId: string;
    private myPubKey: string;
    private mySeedKey: string;

    /** Page product information */
    private product: Product;
    private assetTypes: any = [];

//  Set to default???
    private selectedAssetType: AssetBalance;
    private purchaseQuantity = 1;
    private _sellerShortData: { productSellerID: string, productSellerName: string, productSellerPublicKey: string };


    /** Boolean Checks for Page */
    private isMyProduct: boolean;
    private balances: AssetBalance[];
    private isLoggedIn = false;
    private isInStock = true;

    /**
     * @param  {ProductService} private_productService
     * @param  {CartService} private_cartService
     * @param  {Router} private_router
     * @param  {ActivatedRoute} private_route
     */
    constructor(private _productService: ProductService,
        private _route: ActivatedRoute,
        private _cartService: CartService,
        private _router: Router,
        private location: Location) { }

    ngOnInit() {
        this.myUserId = sessionStorage.getItem('user_doc_id') || localStorage.getItem('user_doc_id');
        this.myPubKey = sessionStorage.getItem('public_key') || localStorage.getItem('public_key');
        this.mySeedKey = sessionStorage.getItem('seed_key') || localStorage.getItem('seed_key');
        this.isLoggedIn = (this.myUserId != null && this.myPubKey != null);
        const curBalances = sessionStorage.getItem('my_balances') || localStorage.getItem('my_balances');
        this.balances = <Array<AssetBalance>>JSON.parse(curBalances);
        this.assetTypes = Object.keys(currencyAssetsMapper).map((type: any) => <Array<AssetBalance>>type);
        this._productService
            .getProductByProductId(this._route.snapshot.params['id'])
            .map(product => <Product>product)
            .subscribe(product => {
                this.product = product;
                if (product) {
                    this._sellerShortData = product.productSellerData;
                    this.isInStock = (product.quantity > 0);
                    this.isMyProduct = (product.productSellerData.productSellerID === this.myUserId);
                }
            });
    }

    /**
     * !!! TODO: Remove
     */
    addProduct2() {
        if (!(this.myPubKey && this.myUserId && this.isLoggedIn && this.mySeedKey)) {
            alert('You must be logged in order to post a new product');
            return;
        }
        const productData = {
            productName: 'super fast GPU',
            productShortDescription: 'short des',
            productLongDescription: 'looooooooooooong des',

            publicKey: this.myPubKey,
            price: 10,
            quantity: 15,
            productCategory: ProductCategoryEnum.Electronics,
            productPrices: [
                // new Asset ()
                { asset_type: 'native', balance: 5 },
                { asset_type: 'tycoin', balance: 7 },
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

    /**
     * @returns void
     */
    public onBuyProduct(): void {
        const purchaseQuantity = this.purchaseQuantity;
        if (this.onValidateProductAction()) {
            const totalPurchaseAmount = calcTotalPurchaseAmount(this.selectedAssetType.balance, purchaseQuantity);
            if (this.validateTransaction(purchaseQuantity, totalPurchaseAmount)) {
                this.goToCheckout(purchaseQuantity, totalPurchaseAmount);
            }
        }
    }

    // TODO:: disabled, shadowed, or alert for not loggedin???
    /**
     * @returns void
     */
    public addProductAndGoToCart(): void {
        if (this.addToCartHelper()) {
            this.onCompleteProductAction();
            this._router.navigate(['/cart']);
        } else {
            alert('couldnt be completed');
        }
    }

    /**
     * @returns boolean
     */
    public addProductToCart(): boolean {
        if (this.addToCartHelper()) {
            this.onCompleteProductAction();
            this.location.back();
            return true;
        }
        return false;
    }

    private addToCartHelper() {
        if (this.onValidateProductAction()) {
            const cartItem = this.createCartItem(this.purchaseQuantity);
            this._cartService.addToCart(JSON.stringify(cartItem));
            this.onCompleteProductAction();
            return true;
        }
    }


    /**
     * @returns void
     */
    public editProduct(): void {
        this._productService.updateProduct(this.product.id, this.product);
    }

    /**
     * @returns void
     */
    public deleteProduct(): void {
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

    /**
     * @param  {number} purchaseQuantity
     * @param  {number} totalPurchaseAmount
     * @returns boolean
     */
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

    /**
     * @param  {number} purchaseQuantity
     * @param  {number} totalPurchaseAmount
     * @returns void
     */
    private goToCheckout(purchaseQuantity: number, totalPurchaseAmount: number): void {
        const cartItem = this.createCartItem(purchaseQuantity, totalPurchaseAmount);
        cartItem.isInCheckout = true;
        this._cartService.addToCart(JSON.stringify(cartItem));

        updateBalance(this.balances, cartItem.assetPurchaseDetails);
        this.onCompleteProductAction();
        this._router.navigate(['/cart/checkout']);
    }

    // private validateSellerStatus(amount: number): boolean {
    // console.log(this.balances);
    // if (this.balances) { con sole.log( 'there are balances'); }
    // if (!(validateNewQuantity(this.product.quantity, amount) && this.balances)) { return false; }
    // const curBalance = getBalanceforAsset(this.balances, this.selectedAssetType);
    // return (isValidNewBalance2(this.selectedAssetType, curBalance, amount));
    // }

    /**
     * @param  {number} purchaseQuantity
     * @param  {number=0} totalPurchaseAmount
     * @returns CartItem
     */
    private createCartItem(purchaseQuantity: number, totalPurchaseAmount: number = 0): CartItem {
        totalPurchaseAmount = calcTotalPurchaseAmount(this.selectedAssetType.balance, purchaseQuantity);
        const asset = new AssetBalance(String(totalPurchaseAmount), this.selectedAssetType.asset_type, this.selectedAssetType.coin_name);
        const cartItem: CartItem = <CartItem>{
            buyerUserID: this.myUserId,
            buyerPublicKey: this.myPubKey,

            sellerUserID: this._sellerShortData.productSellerID,
            sellerPublicKey: this._sellerShortData.productSellerPublicKey,

            productID: this.product.id,
            productName: this.product.productName,
            oldQuantity: this.product.quantity,
            quantityPurchased: purchaseQuantity,
            fixedUSDAmount: this.product.fixedUSDAmount,
            productThumbnailLink: this.product.productThumbnailLink,
            productShortDescription: this.product.productShortDescription,
            assetPricePerItem: this.selectedAssetType.balance,
            assetPurchaseDetails: asset,
            productCategory: this.product.productCategory
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

    // TODO: NEEDS to be a DIALOG
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

