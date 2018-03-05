import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../_market-models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() product : Product;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {}

    selectProduct = (product: string) => {
        this.notify.emit(product);
    }

}
