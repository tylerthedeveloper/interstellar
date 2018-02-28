import { NgModule } from '@angular/core';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';

import { CategoryFeedComponent } from '.';

import { CategoryPageComponent, ProductPageComponent } from './_pages';

import {  MarketRoutingModule } from './market-routing.module'; //routedComponents,
import { MaterialModule } from '../core/material.module';
import { CategoryCardComponent } from './_templates/category-card/category-card.component';


@NgModule({
    imports: [
        MarketRoutingModule, MaterialModule, CommonModule
    ],
    declarations: [CategoryFeedComponent, CategoryPageComponent, ProductPageComponent, CategoryCardComponent],
    providers: [ProductService]
  })
export class MarketModule { }