import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../../_market-models/order';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    // @Input() private cartItems: Order[];
    constructor(private _cartService: CartService) {
            console.log("checlkou")
     }

    ngOnInit() {
        // this._cartService.getCurrentCart().subscribe(items => this.cartItems = items);
    }

}
