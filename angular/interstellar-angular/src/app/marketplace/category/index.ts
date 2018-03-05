import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryFeedComponent } from './category-feed/category-feed.component';
import { CategoryPageComponent } from 'app/marketplace/category/category-page/category-page.component';
import { MaterialModule } from 'app/core/material.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryProductCardComponent } from './category-product-card/category-product-card.component';


@NgModule({
    imports: [
        CategoryRoutingModule, MaterialModule, CommonModule
    ],
    declarations: [ CategoryFeedComponent, CategoryPageComponent, CategoryCardComponent, CategoryProductCardComponent ],
    providers: [ ]
  })
export class CategoryModule { }