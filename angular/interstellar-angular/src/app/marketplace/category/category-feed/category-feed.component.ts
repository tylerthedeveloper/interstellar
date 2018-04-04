import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../_market-models/product-category';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


// TODO: Get from somewhere static...
import { categories } from 'app/marketplace/category/categories';



@Component({
  selector: 'app-category',
  templateUrl: './category-feed.component.html',
  styleUrls: ['./category-feed.component.css']
})
export class CategoryFeedComponent implements OnInit {

    private _categories: ProductCategory[];

    constructor(private router: Router) {
                this._categories = categories;
                // console.log("creating category feed")
    }

    ngOnInit() {}

    onSelectCategory = (category: string) => {
        this.router.navigate(['/categories/' + category]);
    }

}
