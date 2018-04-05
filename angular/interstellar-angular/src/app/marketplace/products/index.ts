import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Routes */
import { ProductRoutes as routes } from './product.routes';

/**  UI and components */
import { MaterialModule } from '../../core/material.module';
import { ProductService } from 'app/core/services/product.service';
import { RouterModule } from '@angular/router';
import { ProductCardComponent } from 'app/marketplace/products/components/product-card/product-card.component';
import { SellerPageComponent } from 'app/marketplace/_pages/seller-page/seller-page.component';
import { ProductsHomePageComponent } from 'app/marketplace/products/components/products-home-page/products-home-page.component';
import { ProductPageComponent } from 'app/marketplace/products/components/product-page/product-page.component';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ProductCardComponent,
        SellerPageComponent,
        ProductsHomePageComponent,
        ProductPageComponent
    ],
    exports: [
        ProductCardComponent,
        SellerPageComponent,
        ProductsHomePageComponent,
        ProductPageComponent
    ],
    providers: [ ProductService  ]
  })
export class ProductModule {}
