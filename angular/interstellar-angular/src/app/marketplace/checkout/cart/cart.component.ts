import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Order } from '../../_market-models/order';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    private cartProducts: Observable<Order[]>;
    constructor() { }

    ngOnInit() {
    }

}
