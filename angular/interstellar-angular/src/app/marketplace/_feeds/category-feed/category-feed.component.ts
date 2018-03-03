import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../_market-models/product';
import { CommonModule } from '@angular/common';
import { EventEmitterService } from 'app/core';

export const categories : ProductCategory[] = [
  new ProductCategory("food", "good eats", "http://a57.foxnews.com/images.foxnews.com/content/fox-news/food-drink/2018/02/06/fast-food-restaurants-may-be-healthier-than-five-star-restaurants/_jcr_content/par/featured_image/media-0.img.jpg/931/524/1517968966228.jpg?ve=1&tl=1"),
  new ProductCategory("electronics", "get all your tech faves", "https://www.santabarbaraloan.com/wp-content/uploads/2017/04/electronicswebuy.jpg"),
  new ProductCategory("sports", "stay athletic and active", "http://urbanmediatoday.com/wp-content/uploads/2016/08/sports.jpg"),
]

@Component({
  selector: 'app-category',
  templateUrl: './category-feed.component.html',
  styleUrls: ['./category-feed.component.css']
})
export class CategoryFeedComponent implements OnInit {

    private _categories: ProductCategory[];

    constructor(private _eventMitter: EventEmitterService) { 
        this._categories = categories;
        console.log("creating category feed")        
    }

    ngOnInit() {}

    onSelectCategory = (category: string) => {
        // console.log(category);
        this._eventMitter.selectCategory(category);
    }

}