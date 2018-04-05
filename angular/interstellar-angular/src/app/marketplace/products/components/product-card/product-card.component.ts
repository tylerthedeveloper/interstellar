import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'app/marketplace/_market-models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

    @Input() product: Product;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {}

    /**
     * @param  {string} product
     * @returns void
     */
    selectProduct = (product: string): void => {
        this.notify.emit(product);
    }

}
