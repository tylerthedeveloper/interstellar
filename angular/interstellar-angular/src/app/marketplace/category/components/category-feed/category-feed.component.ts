import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { categories } from 'app/marketplace/category/categories';
import { ProductCategory } from 'app/marketplace/_market-models/product-category';

@Component({
  selector: 'app-category',
  templateUrl: './category-feed.component.html',
  styleUrls: ['./category-feed.component.css']
})
export class CategoryFeedComponent implements OnInit {

    private _categories: ProductCategory[];

    constructor(private router: Router) {
                this._categories = categories;
                // console.log(_categories2)
                // console.log("creating category feed")
    }

    ngOnInit() {}

    /**
     * @param  {string} category
     */
    onSelectCategory = (category: string) => {
        this.router.navigate(['/categories/' + category]);
    }

}
