//  TODO: NEEDS TO RETURN CONFIRMATION / TRUE --> for all helpers

/** Angular */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

/** Stellar */
import { AssetBalance, currencyAssetsMapper } from 'app/stellar';

/** Shared */
import { BaseComponent } from '../../../../base.component';

/** Services */
import { ProductService } from 'app/core/services/product.service';
import { CartService } from 'app/core/services/cart.service';

/** Models: Cart / Product  */
import { Product } from 'app/marketplace/_market-models/product';
import { CartItem } from 'app/marketplace/_market-models/cart-item';

@Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent extends BaseComponent implements OnInit {

    /** User Info */
    // See Basecomponent

    /** Page product information */
    private product: Product;
    private assetTypes: any = [];
    private balances: AssetBalance[];

    // private selectedAssetType: string;
    private selectedAssetType: AssetBalance;
    private purchaseQuantity = 1;
    private _sellerShortData: { productSellerID: string, productSellerName: string, productSellerPublicKey: string };

    /** Boolean Checks for Page */
    isMyProduct: boolean;
    isLoggedIn = false;
    isInStock = true;

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
        private location: Location) {
            super();
         }

    /**
     * @returns void
     */
    ngOnInit(): void {
        this.isLoggedIn = (this.myBaseUserID != null && this.myBasePublicKey != null);
        const curBalances = this.myBaseBalances || sessionStorage.getItem('my_balances') || localStorage.getItem('my_balances');
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
                    this.isMyProduct = (product.productSellerData.productSellerID === this.myBaseUserID);
                }
            });
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
                this.goToCheckout(purchaseQuantity);
        }
    }

    // TODO:: disabled, shadowed, or alert for not loggedin???
    /**
     * @returns void
     */
    public addProductAndGoToCart() {
        this.addToCartHelper().then((res) => {
            console.log(res);
            if (!res) { return; }
            this.onCompleteProductAction();
            this._router.navigate(['/cart']);
        });
    }

    allCategories() {
      this.location.back();
    }

    /**
     * @returns boolean
     */
    public addProductToCart(): Promise<boolean> {
        return this.addToCartHelper().then((res) => {
            // if (!res) { throw new Error('error: item already in cart1') }
            console.log(res);
            if (!res) { return false; }
            //  todo
            alert('success: this item has been added to your cart');
            this.onCompleteProductAction();
            // this.location.back();
            return true;
        })
        .catch(() => this.errorAndAlert('error: item already in cart2'));
    }

    private addToCartHelper(): Promise<boolean> {
        if (this.onValidateProductAction()) {
            const cartItem = this.createCartItem(this.purchaseQuantity);
            return this._cartService.addToCart(JSON.stringify(cartItem))
                .then(res => {
                    console.log(res);
                    return (res) ? this.onCompleteProductAction() : false;
                })
                .catch(e => {
                    // return false;
                    return this.errorAndAlert(`There was an error:\n ${e}`);
                });
        } else {
            return Promise.resolve(false);
        }
    }


    /**
     * @returns void
     */
    public editProduct(): void {
        this._productService.updateProduct(this.product.id, this.product);
    }

    /**
     // todo:
     * @returns void
     */
    public deleteProduct(): void {
        alert('are you sure you want to delete --> CHANGE TO MODAL ...');
        this._sellerShortData = null;
        this.isInStock = this.isMyProduct = false;
        this._router.navigate(['../profile']).then(() =>
            this._productService.deleteProduct(this.product.id, this.product.productCategory));
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
       */

    /**
     * @param  {number} purchaseQuantity
     * @param  {number} totalPurchaseAmount
     * @returns void
     */
    private goToCheckout(purchaseQuantity: number, totalPurchaseAmount: number = 0): void {
        const cartItem = this.createCartItem(purchaseQuantity, totalPurchaseAmount);
        cartItem.isInCheckout = true;
        this._cartService.addToCart(JSON.stringify(cartItem))
            .then(() => {
                this.onCompleteProductAction();
                this._router.navigate(['/cart/checkout']);
        });
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
        // totalPurchaseAmount = calcTotalPurchaseAmount(this.selectedAssetType.balance, purchaseQuantity);
        const asset = new AssetBalance({
            balance: String(totalPurchaseAmount),
            asset_type: this.selectedAssetType.asset_type,
            coin_name: this.selectedAssetType.coin_name
        });
        const cartItem: CartItem = <CartItem> {
            buyerUserID: this.myBaseUserID,
            buyerPublicKey: this.myBasePublicKey,

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
            productCategory: this.product.productCategory,
            // selectedAsset: this.selectedAssetType
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
            return this.errorAndAlert(ErrorMessage.MissingQuantity);
        }
        if (!this.selectedAssetType) {
            return this.errorAndAlert(ErrorMessage.MissingAsset);
        }
        return true;
    }

    private onCompleteProductAction(): boolean {
        this.purchaseQuantity = 1;
        this.selectedAssetType = null;
        return true;
    }

    // TODO: NEEDS to be a DIALOG
    private errorAndAlert(errorMessage: string): boolean {
        alert(errorMessage);
        return false;
    }
    // ────────────────────────────────────────────────────────────────────────────────

}

const enum ErrorMessage {
    MissingQuantity = 'Please select a valid quantity',
    MissingAsset = 'Please select purchase asset type',
    InsufficientFoundsOrThreshold =
        'You don\'t seem to have sufficient funds or\n the purchase amount goes below the minimum required holding threshold'
}

/*
  SBXVQZTXNZCHYPE3PF43IOFH6E3VOH47ZZKRW6MTZLZL5VIO5QZCP7KQ
  GCEDZY5CHDSTH5GT67DEHORK23ZLJQAVQTHNG7XBK5JWX675JQ4SOMH7
  10000.0000000 native
*/
