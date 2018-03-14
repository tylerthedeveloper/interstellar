import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerPageComponent } from '../_pages/seller-page/seller-page.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductRoutingModule } from './product-routing.module';
import { MaterialModule } from '../../core/material.module';
import { ProductsHomePageComponent } from './products-home-page/products-home-page.component';
import { ProductService } from 'app/core/services/product.service';
import { ProductPageComponent } from './product-page/product-page.component';

@NgModule({
    imports: [
        ProductRoutingModule, MaterialModule, CommonModule, FormsModule, ReactiveFormsModule
    ],
    declarations: [ ProductCardComponent, SellerPageComponent, ProductsHomePageComponent, ProductPageComponent],
    exports: [ ProductCardComponent, SellerPageComponent, ProductsHomePageComponent, ProductPageComponent ],
    providers: [ ProductService  ]
  })
export class ProductModule {}
