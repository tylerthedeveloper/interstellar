import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/** Routing */
import { ProductRoutes as routes } from './product.routes';
import { RouterModule } from '@angular/router';

/** Services */
import { ProductService } from 'app/core/services/product.service';

/**  UI and components */
import { MaterialModule } from '../../core/material.module';
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
