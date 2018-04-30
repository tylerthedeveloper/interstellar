import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';
import { AssetBalance, calcTotalsForMultipleAssets } from 'app/stellar';
import { CartService } from 'app/core/services/cart.service';
import { CartItem } from 'app/marketplace/_market-models/cart-item';
import { ConfirmDialogComponent, DialogComponent } from 'app/shared/components';
import { DynamicFormComponent } from 'app/shared/forms/dynamic-form/dynamic-form.component';
import { userFormData } from 'app/user/user.details';
import { MatDialog } from '@angular/material';
import { BaseComponent } from 'app/base.component';
import { User } from 'app/user/user';
import { UserService } from 'app/core/services';
import { StellarTermService } from 'app/core/services/stellar-term.service';
import { stellarTermAssets } from 'app/stellar/stellar-term/asset.mappers';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent extends BaseComponent implements OnInit {

    private cartItemsSource: Observable<CartItem[]>;
    private cartItemIDs: string[] = [];
    private _checkedCartItemIDs: string[] = [];
    private assetTotals: AssetBalance[];

    private user: Observable<User>;
    private hasAddress = false;

    private tempAddress = '';
    private loading;

    private currentAssetValues: AssetBalance[];
    private currentAssetValuesDict: {} = {};

    constructor(private _cartService: CartService,
                private _router: Router,
                private _userService: UserService,
                private _stellarTermService: StellarTermService,
                private dialog: MatDialog) {
                    super();
                }

    ngOnInit() {
        this.loading = false;
        this._userService.getUserByID(this.myBaseUserID).first().subscribe(user => {
            this.user = user;
            const userTyped = <User> user;
            this.hasAddress = (userTyped.address) ? true : false;
        });
        this.calcTotals(new Set(stellarTermAssets)).then(() => {
            this.cartItemsSource = this._cartService.Cart.map(cartItems => {
                // TODO: Map only one time
                this.cartItemIDs = cartItems.map((c: CartItem) => c.cartItemID);
                // this.calcTotals(diffAssets);
                // console.log(this.currentAssetValues)
                // const diffAssets = new Set(cartItems.map((c: CartItem) => c.assetPurchaseDetails.asset_type));
                // todo: decide which asset values ...
                // todo: how to handle asset values if not in original list ...
                // todo: how to handle recalculations ...
                // todo: how to round

                const updatedCartItems = cartItems.map(item => {
                    const curAssetValue = this.currentAssetValuesDict[item.assetPurchaseDetails.asset_type];
                    const newAssetValue = item.fixedUSDAmount / curAssetValue;
                    const newAssetBalance = new AssetBalance({
                        asset_type: item.assetPurchaseDetails.asset_type,
                        coin_name: item.assetPurchaseDetails.coin_name,
                        balance: String(newAssetValue)
                    });
                    const newCartItem = item;
                    newCartItem.assetPurchaseDetails = newAssetBalance;
                    return newCartItem;
                });
                this.assetTotals = calcTotalsForMultipleAssets(updatedCartItems.map(CIT => CIT.assetPurchaseDetails));
                setTimeout(() => this.loading = true, 2000);
                return updatedCartItems;
            });
        });

    }

    //
    // ──────────────────────────────────────────────────────────────── I ──────────
    //   :::::: M A I N   M E T H O D S : :  :   :    :     :        :          :
    // ──────────────────────────────────────────────────────────────────────────
    //

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

    calcTotals(assetTypes: Set<string>) {
        return Promise.resolve(this._stellarTermService.getPriceForAssets(assetTypes)
            .subscribe((asset: any) => {
                this.currentAssetValuesDict[asset.asset_type] = asset.balance;
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

        console.log(obj);

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
                // console.log(_cartItemID);
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
                // console.log(result);
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
                            this._cartService.addToCheckout(cartItemIDs)
                                .catch(err => console.log(err))
                                .then(() => this._router.navigate(['/cart/checkout']));
                        }
                    }
                });
            });
        }
        // console.log(this.hasAddress)
        // console.log(this.tempAddress)
        // if (this.hasAddress && this.tempAddress) {
        if (this.hasAddress) {
            this._cartService.addToCheckout(cartItemIDs)
                .catch(err => console.log(err))
                .then(() => this._router.navigate(['/cart/checkout']));
        }
    }

    handleMissingAddress()  {
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

}


// import { filter } from 'rxjs/operators';
// For example on regular and observable piping + filtering
// this.cartItems = this.cartItems.filter(item => item.cartItemID !== cartItemID);
// this.cartItemsSource = this.cartItemsSource.map(items => {
//     let arr = Array<CartItem>();
//     arr = items.filter((item: CartItem) => item.cartItemID !== cartItemID )
//     return arr;
// });
