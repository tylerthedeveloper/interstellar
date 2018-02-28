import { NgModule } from '@angular/core';
import { ProductService } from './product.service';
import { CommonModule } from '@angular/common';

import { CategoryFeedComponent } from '.';

import { CategoryPageComponent, ProductPageComponent } from './_pages';

import {  MarketRoutingModule } from './market-routing.module'; //routedComponents,
import { MaterialModule } from '../core/material.module';


@NgModule({
    imports: [
        MarketRoutingModule, MaterialModule, CommonModule
    ],
    declarations: [CategoryFeedComponent, CategoryPageComponent, ProductPageComponent],
    providers: [ProductService]
  })
export class MarketModule { }