import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../_market-models/cart-item';

@Component({
  selector: 'cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.css']
})
export class CartItemCardComponent implements OnInit {

    @Input() cartItem: CartItem;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {
    }

    purchaseItem (cartItemID: string) {
        const data = {
            action: 'purchase',
            payload: cartItemID
        };
        this.notify.emit(JSON.stringify(data));
    }

    editItem (cartItem: CartItem, newData: {})  {
        const data = {
          action: 'edit',
          payload: cartItem,
          newData: newData
      };
      this.notify.emit(JSON.stringify(data));
    }

    removeItem (cartItemID: string)  {
        const data = {
          action: 'remove',
          payload: cartItemID
        };
        this.notify.emit(JSON.stringify(data));
    }

    test(cartItemID: string)  {
        const data = {
            action: 'checkItem',
            payload: cartItemID
          };
          this.notify.emit(JSON.stringify(data));
    }
}
