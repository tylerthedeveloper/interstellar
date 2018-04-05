import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'app/marketplace/_market-models/order';
import { TransactionGroup } from 'app/marketplace/_market-models/transaction-group';

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

