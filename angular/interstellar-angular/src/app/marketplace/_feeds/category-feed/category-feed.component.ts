import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../_market-models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category-feed.component.html',
  styleUrls: ['./category-feed.component.css']
})
export class CategoryFeedComponent implements OnInit {

  private _categories: ProductCategory[];


  constructor() { 

      this._categories = categories;

  }

  ngOnInit() {}



}


export const categories : ProductCategory[] = [
    new ProductCategory("food", "link1"),
    new ProductCategory("electronics", "link2"),
    new ProductCategory("sports", "link3"),
]