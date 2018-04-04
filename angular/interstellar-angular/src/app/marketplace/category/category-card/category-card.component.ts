import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductCategory } from 'app/marketplace/_market-models/product-category';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

    @Input() category: ProductCategory;
    @Output() notify: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }

    ngOnInit() {}

    selectCategory = (category: string) => {
        this.notify.emit(category);
    }

}
