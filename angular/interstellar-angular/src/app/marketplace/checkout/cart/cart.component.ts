import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';
import { Router } from '@angular/router';
import { CartItem } from '../../_market-models/cart-item';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    private subscription: ISubscription;
    private cartItemsSource: CartItem[];
    // private cartItemsSource: Observable<CartItem[]>;

    constructor(private _cartService: CartService,
                private _router: Router) { }

    ngOnInit() {
        // this.cartItemsSource = this._cartService.getCurrentCart().map(c => c);
        this.subscription = this._cartService.getCurrentCart().subscribe(c => this.cartItemsSource = c);
    }

    onCartItemAction(data: string) {
        const obj = JSON.parse(data);
        const action = obj.action, cartItem = obj.payload;
        let newCartItemData = '';
        if (obj.newData) {
            newCartItemData = obj.newData;
        }

        // console.log(action)
        // console.log(payload)
        switch (action) {
            case 'purchase':
                console.log('pur');
                break;
            case 'edit':
                console.log('ed');
                this._cartService.updateCartItem(cartItem, newCartItemData);
                break;
            case 'remove':
                console.log('rem');
                console.log(cartItem);
                this._cartService.removeCartItem(cartItem.cartItemID);
                this.cartItemsSource = this.cartItemsSource.filter(item => item.cartItemID !== cartItem.cartItemID)
                // this._cartService.getCurrentCart().subscribe(c => this.cartItemsSource)
                break;
            default:
                return;
        }
    }

    proceedToCheckout() {
        this._router.navigate(['/cart/checkout']);
    }

    navigateToAllProducts() {
        this._router.navigate(['/products']);
    }

    emptyOutCart() {
        this.cartItemsSource.forEach(item => this._cartService.removeCartItem(item.cartItemID))
        this.subscription.unsubscribe();
        console.log(this.cartItemsSource)
        console.log(this.cartItemsSource.length)
        this.cartItemsSource = [];
        console.log(this.cartItemsSource)
        console.log(this.cartItemsSource.length)

    }


}
