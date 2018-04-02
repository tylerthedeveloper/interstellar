import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'app/marketplace/_market-models/order';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  private _order: Order;
  constructor(private _orderService: OrderService,
              private route: ActivatedRoute) {}

  ngOnInit() {
      this._orderService.getOrderByID(this.route.snapshot.params['id'])
              .valueChanges()
              .subscribe(order => this._order = <Order> order);
  }

}
