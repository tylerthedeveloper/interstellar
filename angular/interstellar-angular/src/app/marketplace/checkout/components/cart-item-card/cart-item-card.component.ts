import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'app/marketplace/_market-models/cart-item';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {

    @Input() cartItem: CartItem;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {
    }

    /**
     * @param  {string} cartItemID
     */
    purchaseItem (cartItemID: string, cartItemProductID: string): void {
        const data = {
            action: 'purchase',
            payloadcartItemID: cartItemID,
            payloadCartItemProductID: cartItemProductID
        };
        this.notify.emit(JSON.stringify(data));
    }

    /**
     * @param  {CartItem} cartItem
     * @param  {{}} newData
     * @returns void
     */
    editItem (cartItem: CartItem, newData: {}): void  {
        const data = {
          action: 'edit',
          payload: cartItem,
          newData: newData
      };
      this.notify.emit(JSON.stringify(data));
    }

    /**
     * @param  {string} cartItemID
     * @returns void
     */
    removeItem (cartItemID: string, cartItemProductID: string): void  {
        const data = {
          action: 'remove',
          payloadcartItemID: cartItemID,
          payloadCartItemProductID: cartItemProductID
        };
        this.notify.emit(JSON.stringify(data));
    }

    /**
     * @param  {string} cartItemID
     * @returns void
     */
    checkItem(cartItemID: string): void  {
        const data = {
            action: 'checkItem',
            payloadcartItemID: cartItemID
        };
        this.notify.emit(JSON.stringify(data));
    }
}
