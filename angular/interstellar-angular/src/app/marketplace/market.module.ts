import { NgModule } from '@angular/core';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';

import { CategoryFeedComponent } from '.';

import { CategoryPageComponent, ProductPageComponent } from './_pages';

import {  MarketRoutingModule } from './market-routing.module'; //routedComponents,
import { MaterialModule } from '../core/material.module';
import { CategoryCardComponent } from './_templates/category-card/category-card.component';
import { SellerPageComponent } from './_pages/seller-page/seller-page.component';
import { ProductCardComponent } from './_templates/product-card/product-card.component';


@NgModule({
    imports: [
        MarketRoutingModule, MaterialModule, CommonModule
    ],
    declarations: [
                    CategoryFeedComponent, CategoryPageComponent, ProductPageComponent, 
                    CategoryCardComponent, SellerPageComponent, ProductCardComponent],
    providers: [ProductService]
  })
export class MarketModule { }