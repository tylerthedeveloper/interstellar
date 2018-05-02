/** Angular */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

/** Material / UI */
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent, DialogComponent } from 'app/shared/components';

/** shared */
import { BaseComponent } from 'app/base.component';
import { DynamicFormComponent } from 'app/shared/forms/dynamic-form/dynamic-form.component';

/** Cart */
import { CartService } from 'app/core/services/cart.service';
import { CartItem } from 'app/marketplace/_market-models/cart-item';

/** User */
import { User } from 'app/user/user';
import { UserService, ProductService } from 'app/core/services';
import { userFormData } from 'app/user/user.details';

/** Stellar */
import { AssetBalance, calcTotalsForMultipleAssets, getBalanceforAsset, isValidNewBalance } from 'app/stellar';
import { StellarTermService } from 'app/core/services/stellar-term.service';
import { stellarTermAssets } from 'app/stellar/stellar-term/asset.mappers';
import { Subscription } from 'rxjs/Subscription';
import { validateNewQuantity } from 'app/marketplace/products/product.utils';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {

    /** Page Items */
    private cartItemsSource: Observable<CartItem[]>;
    private cartItems: CartItem[];
    private cartItemIDs: string[] = [];
    private _checkedCartItemIDs: string[] = [];
    private assetTotals: AssetBalance[];
    // private currentAssetValues: AssetBalance[];
    private currentAssetValuesDict: {} = {};
    private user: Observable<User>;
    private idAssetPairs: { id: string, assetBalance: AssetBalance}[];
    /** Page helpers */
    private hasAddress = false;
    private tempAddress = '';
    private loading;

    /**
     * @param  {CartService} private_cartService
     * @param  {Router} private_router
     * @param  {UserService} private_userService
     * @param  {StellarTermService} private_stellarTermService
     * @param  {MatDialog} privatedialog
     */
    constructor(private _cartService: CartService,
                private _router: Router,
                private _productService: ProductService,
                private _userService: UserService,
                private _stellarTermService: StellarTermService,
                private dialog: MatDialog) {
                    super();
                }

    /**
     * @returns void
     */
    ngOnInit(): void {
        this.loading = false;
        this._userService.getUserByID(this.myBaseUserID).first().subscribe(user => {
            this.user = user;
            const userTyped = <User> user;
            this.hasAddress = (userTyped.address) ? true : false;
        });
        // todo: promise -> promise -> promise
        Promise.resolve(this.pullCurrentTickerValues(new Set(stellarTermAssets)))
            .then(() =>
            // return new Promise(() =>
                this.cartItemsSource = this._cartService.Cart.map(cartItems => {
                    // this.calcTotals(diffAssets);
                    // console.log(this.currentAssetValues)
                    // const diffAssets = new Set(cartItems.map((c: CartItem) => c.assetPurchaseDetails.asset_type));
                    // todo: decide which asset values ...
                    // todo: how to handle asset values if not in original list ...
                    // todo: how to handle recalculations ...
                    // todo: how to round
                    console.log(this.currentAssetValuesDict);
                    this.cartItemIDs = new Array<string>(); // cartItems.map((c: CartItem) => c.cartItemID);
                    const updatedCartItems = cartItems.map(item => {
                        this.cartItemIDs.push(item.cartItemID);
                        const curAssetValue = this.currentAssetValuesDict[item.assetPurchaseDetails.asset_type];
                        console.log(item);
                        console.log(item.fixedUSDAmount);
                        console.log(curAssetValue);
                        console.log(item.fixedUSDAmount / curAssetValue);
                        const newAssetValue = (item.fixedUSDAmount / curAssetValue).toFixed(7);
                        console.log(newAssetValue);
                        const newAssetBalance = new AssetBalance({
                            asset_type: item.assetPurchaseDetails.asset_type,
                            coin_name: item.assetPurchaseDetails.coin_name,
                            balance: String(newAssetValue)
                        });
                        const newCartItem = item;
                        newCartItem.assetPurchaseDetails = newAssetBalance;
                        return newCartItem;
                    });
                    // TODO: Map only one time
                    this.assetTotals = calcTotalsForMultipleAssets(updatedCartItems.map(CIT => CIT.assetPurchaseDetails));
                    this.idAssetPairs = updatedCartItems.map(CIT => ({id: CIT.cartItemID, assetBalance: CIT.assetPurchaseDetails}));
                    this.cartItems = updatedCartItems;
                    // this._cartService.batchUpdateTickerPrices(idAssetPairs); // .then(() => updatedCartItems);
                    return updatedCartItems;
            })).then(() => setTimeout(() => this.loading = true, 3000));

        // .then(() => this.loading = true);


        // Promise.resolve(this.pullCurrentTickerValues(new Set(stellarTermAssets)).then(() => {
        //     Promise.resolve(this.cartItemsSource = this._cartService.Cart.map(cartItems => {
        //         // TODO: Map only one time
        //         this.cartItemIDs = cartItems.map((c: CartItem) => c.cartItemID);
        //         // this.calcTotals(diffAssets);
        //         // console.log(this.currentAssetValues)
        //         // const diffAssets = new Set(cartItems.map((c: CartItem) => c.assetPurchaseDetails.asset_type));
        //         // todo: decide which asset values ...
        //         // todo: how to handle asset values if not in original list ...
        //         // todo: how to handle recalculations ...
        //         // todo: how to round
        //         console.log(this.currentAssetValuesDict)
        //         const updatedCartItems = cartItems.map(item => {
        //             const curAssetValue = this.currentAssetValuesDict[item.assetPurchaseDetails.asset_type];
        //             console.log(item);
        //             console.log(item.fixedUSDAmount);
        //             console.log(curAssetValue);
        //             console.log(item.fixedUSDAmount / curAssetValue);
        //             const newAssetValue = (item.fixedUSDAmount / curAssetValue).toFixed(7);
        //             console.log(newAssetValue);
        //             const newAssetBalance = new AssetBalance({
        //                 asset_type: item.assetPurchaseDetails.asset_type,
        //                 coin_name: item.assetPurchaseDetails.coin_name,
        //                 balance: String(newAssetValue)
        //             });
        //             const newCartItem = item;
        //             newCartItem.assetPurchaseDetails = newAssetBalance;
        //             return newCartItem;
        //         });
        //         this.assetTotals = calcTotalsForMultipleAssets(updatedCartItems.map(CIT => CIT.assetPurchaseDetails));
        //         this.cartItems = updatedCartItems;
        //         this.idAssetPairs = updatedCartItems.map(CIT => ({id: CIT.cartItemID, assetBalance: CIT.assetPurchaseDetails}));
        //         // this._cartService.batchUpdateTickerPrices(idAssetPairs); // .then(() => updatedCartItems);
        //         return updatedCartItems;
        //     })).then(() => setTimeout(() => this.loading = true, 1000));
        // })); // .then(() => setTimeout(() => this.loading = true, 1000));

    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

    // todo: Combine onCartBatchAction
    /**
     * @returns void
     */
    proceedToCheckout(): void {
        if (this._checkedCartItemIDs.length !== 0) {
            this.updateAddToCheckout(this._checkedCartItemIDs);
        } else {
            this.updateAddToCheckout(this.cartItemIDs);
        }
    }

    /**
     * @returns void
     */
    checkoutSelectedItems(): void {
        if (this._checkedCartItemIDs.length === 0) {
            alert('You don\'t have any items checked currently');
        } else {
            this.updateAddToCheckout(this._checkedCartItemIDs);
        }
    }

    /**
     * @returns void
     */
    removeSelectedItems(): void {
        if (this._checkedCartItemIDs.length === 0) {
            alert('You don\'t have any items checked currently');
        } else {
            this._cartService.batchRemoveCartItems(this._checkedCartItemIDs);
        }
    }

    /**
     * @returns void
     */
    emptyOutCart(): void {
        this._cartService.emptyCart();
    }
    // ────────────────────────────────────────────────────────────────────────────────


    //
    // ──────────────────────────────────────────────────────────────────── I ──────────
    //   :::::: H E L P E R   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────────
    //

    /**
     * @param  {Set<string>} assetTypes
     * @returns Promise
     */
    pullCurrentTickerValues(assetTypes: Set<string>): Promise<any> {
        return Promise.resolve(this._stellarTermService.getPriceForAssets(assetTypes)
            .subscribe((asset: any) => {
                const _assetType = (asset.asset_type === 'XLM') ? 'native' : asset.asset_type;
                this.currentAssetValuesDict[_assetType] = asset.balance;
                // console.log(asset);
                // this.loading = false;
                // setTimeout(() => this.loading = true, 2000);
            }));
    }

    /**
     * @param  {string} data
     * @returns void
     */
    onCartItemAction(data: string): void {
        const obj = JSON.parse(data);
        const _action = obj.action;
        const _cartItemID =  obj.payloadcartItemID;
        const _cartItemProductID =  obj.payloadCartItemProductID;
        let newCartItemData = '';
        if (obj.newData) {
            newCartItemData = obj.newData;
        }
        switch (_action) {
            case 'purchase':
                this.updateAddToCheckout(new Array<string>(_cartItemID));
                break;
            case 'edit':
                this._cartService.updateCartItem(_cartItemID, newCartItemData);
                break;
            case 'remove':
                this._cartService.removeCartItem(_cartItemID, _cartItemProductID);
                break;
            case 'checkItem':
                this._checkedCartItemIDs.push(_cartItemID);
                break;
            default:
                return;
        }
    }

    /**
     * @param  {string[]} cartItemIDs
     * @returns void
     */
    updateAddToCheckout(cartItemIDs: string[]): void {
        if (!this.hasAddress) {
            // this.handleMissingAddress(); // .add(s => console.log(s))
            const dialogRef = this.dialog.open(ConfirmDialogComponent, {
                data: {
                        title: 'Add Address',
                        content: 'It seems you have not added your address but ' +
                                 'need to inorder to checkout. \n' +
                                 'Would you like to save it or just enter it for this one time?',
                        noText: 'Just this time',
                        yesText: 'Save Address',
                }
            });
            dialogRef.afterClosed().subscribe((result: string) => {
                const dialogRefInner = this.dialog.open(DialogComponent, {
                    data: { component: DynamicFormComponent,
                            payload: {
                                questions: new Array(userFormData[3])
                            }
                    }
                });
                return dialogRefInner.afterClosed().map(res => res).subscribe((newAddressData: string) => {
                    if (newAddressData && newAddressData !== '') {
                        console.log(newAddressData);
                        const payload = {
                            id: this.myBaseUserID,
                            data: newAddressData
                        };
                        if (result) {
                            this._userService.updateProfile(JSON.stringify(payload));
                        }
                        this.tempAddress = newAddressData;
                        this.hasAddress = true;
                        if (this.hasAddress && this.tempAddress) {
                            if (this.validateTransaction(cartItemIDs)) {
                                const tickerUpdatePromise = new Promise(() => this._cartService.batchUpdateTickerPrices(this.idAssetPairs));
                                const addToCheckoutPromise = new Promise(() => this._cartService.addToCheckout(cartItemIDs));
                                // this._cartService.addToCheckout(cartItemIDs)
                                Promise.all([tickerUpdatePromise, addToCheckoutPromise])
                                    .then(values => console.log(values))
                                    .catch(err => console.log(err))
                                    .then(() => this._router.navigate(['/cart/checkout']));
                                console.log('after promise');
                            }
                        }
                    }
                });
            });
        }
        if (this.validateTransaction(cartItemIDs)) {
            // const tickerUpdatePromise = new Promise(() => this._cartService.batchUpdateTickerPrices(this.idAssetPairs));
            // const addToCheckoutPromise = new Promise(() => this._cartService.addToCheckout(cartItemIDs));
            // this._cartService.addToCheckout(cartItemIDs)
            // Promise.all([new Promise(() => this._cartService.batchUpdateTickerPrices(this.idAssetPairs)),
            //             new Promise(() => this._cartService.addToCheckout(cartItemIDs))])
            Promise.resolve(this._cartService.batchUpdateTickerPrices(this.idAssetPairs))
                .then(() => Promise.resolve(this._cartService.addToCheckout(cartItemIDs)))
                .then(values => console.log(values))
                .catch(err => console.log(err))
                .then(() => this._router.navigate(['/cart/checkout']));
            console.log('after promise');
        } else {
            console.log('unvalidated');
        }
    }

    /**
     * @param  {number} purchaseQuantity
     * @param  {number} totalPurchaseAmount
     * @returns boolean
     */
    // private validateTransaction(purchaseQuantity: number, totalPurchaseAmount: number): boolean {
    private validateTransaction(cartItemIDs: string[]): boolean {
        if (this.myBaseBalances) { console.log(this.myBaseBalances); }
        if (!this.myBaseBalances) {
            return this.errorAndAlert(ErrorMessage.InactiveBalances);
        }

        const filteredCartItems = this.cartItems.filter(item => cartItemIDs.some(CIT => item.cartItemID === CIT) === true);
        for (const currentCheckedOutItem of filteredCartItems)  {
            // .map(currentCheckedOutItem => {
                // console.log(currentCheckedOutItem);
// !!! todo GET FROM SERVER FOR CURRENT QUANTITY!!!!!
                const curQuant = this._productService.getProductQuantity(currentCheckedOutItem.productID);
                if (!(validateNewQuantity(currentCheckedOutItem.oldQuantity, currentCheckedOutItem.quantityPurchased))) {
                    return this.errorAndAlert(ErrorMessage.InvalidPurchaseQuantity);
                }
        }

// todo: TEST THESE BREAK WHEN FALSE -> IF NOT, TRAD LOOP
        const parsedBalObj = JSON.parse(this.myBaseBalances);
        const parsedBalances = (parsedBalObj.length) ? parsedBalObj as AssetBalance[] : new Array<AssetBalance>(parsedBalObj);
        // console.log(parsedBalances.length)
        // console.log(pbArray)
        this.assetTotals.map(assetTotal => {
            // console.log(this.myBaseBalances);
            // console.log(assetTotal);
            // todo: confirm not null, confirm balance
            const curBalance = Number(getBalanceforAsset(parsedBalances, assetTotal.asset_type));
            console.log(curBalance);
            // console.log(Number(assetTotal.balance));
            // console.log(isValidNewBalance(assetTotal.asset_type, curBalance, Number(assetTotal.balance)));
            if (!isValidNewBalance(assetTotal.asset_type, curBalance, Number(assetTotal.balance))) {
                return this.errorAndAlert(ErrorMessage.InsufficientFoundsOrThreshold);
            }
        });
        return true;
    }

    /**
     * @returns Subscription
     */
    handleMissingAddress(): Subscription  {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                    title: 'Add Address',
                    content: 'It seems you have not added your address but ' +
                             'need to inorder to checkout. \n' +
                             'Would you like to save it or just enter it for this one time?',
                    noText: 'Just this time',
                    yesText: 'Save Address',
            }
        });
        return dialogRef.afterClosed().subscribe((result: string) => {
            const dialogRefInner = this.dialog.open(DialogComponent, {
                data: { component: DynamicFormComponent,
                        payload: {
                            questions: new Array(userFormData[3])
                        }
                }
            });
            return dialogRefInner.afterClosed().map(res => res).subscribe((newAddressData: string) => {
                if (newAddressData && newAddressData !== '') {
                    console.log(newAddressData);
                    const payload = {
                        id: this.myBaseUserID,
                        data: newAddressData
                    };
                    if (result) {
                        this._userService.updateProfile(JSON.stringify(payload));
                    }
                    this.tempAddress = newAddressData;
                    this.hasAddress = true;
                    return newAddressData;
                }
            });
        });
    }

    /**
     * @returns void
     */
    navigateToAllProducts(): void {
        this._router.navigate(['/products']);
    }


     // recalculateTotals() {
    //     // this.assetTotals = this._cartService.getCartAssetTotals()
    //     // const currentAssets: Asset[] = this._cartService.getCartAssetTotals();
    //     // const updatedAssets = calcTotalsForMultipleAssets(currentAssets);
    //     this._cartService.getCartAssetTotals()
    //                      .subscribe(curAssets => this.assetTotals = Observable.of(calcTotalsForMultipleAssets(curAssets)));
    //     // this.assetTotals = updatedAssets;
    // }

    // ────────────────────────────────────────────────────────────────────────────────
  // TODO: NEEDS to be a DIALOG
    private errorAndAlert(errorMessage: string): boolean {
        alert(errorMessage);
        return false;
    }
}


const enum ErrorMessage {
    InactiveBalances = 'You dont seem to have any active balances, please check your account',
    InvalidPurchaseQuantity = 'That is an invalid purchase quantity',
    InsufficientFoundsOrThreshold =
        'You don\'t seem to have sufficient funds or\n the purchase amount goes below the minimum required holding threshold'
}

// import { filter } from 'rxjs/operators';
// For example on regular and observable piping + filtering
// this.cartItems = this.cartItems.filter(item => item.cartItemID !== cartItemID);
// this.cartItemsSource = this.cartItemsSource.map(items => {
//     let arr = Array<CartItem>();
//     arr = items.filter((item: CartItem) => item.cartItemID !== cartItemID )
//     return arr;
// });
