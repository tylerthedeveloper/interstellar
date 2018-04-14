// https://codecraft.tv/courses/angular/built-in-directives/ngfor/
// https://stackoverflow.com/questions/44272911/angular2-nested-ngfor

import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'app/marketplace/_market-models/order';
import { TransactionGroup } from '../../../_market-models/transaction';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

    private _order: Order;
    private transactionGroups: Array<TransactionGroup>;

    constructor(private _orderService: OrderService,
                private route: ActivatedRoute) {}

    ngOnInit() {
        this._orderService.getOrderByID(this.route.snapshot.params['id'])
                          .subscribe((order: Order) => {
                              this._order = order;
                              this.transactionGroups = order.transactionsGroups;
                          });
      }
      // this._order = this._orderService.getOrderByID(this.route.snapshot.params['id']).map(order => {
      //     this.transactionGroups = order.transactionsGroups;
      //     return order;
      // })
}

