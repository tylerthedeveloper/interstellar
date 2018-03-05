import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PartialProduct } from 'app/marketplace/_market-models/partial-product';

@Component({
  selector: 'category-product-card',
  templateUrl: './category-product-card.component.html',
  styleUrls: ['./category-product-card.component.css']
})
export class CategoryProductCardComponent implements OnInit {

    @Input() product : PartialProduct;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {
    }

    selectProduct = (product: string) => {
      this.notify.emit(product);
    }

}
