import { Routes } from '@angular/router';
import { ProductPageComponent } from 'app/marketplace/products/components/product-page/product-page.component';
import { ProductsHomePageComponent } from 'app/marketplace/products/components/products-home-page/products-home-page.component';
import { AddProductPageComponent } from './components/add-product-page/add-product-page.component';

export const ProductRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ProductsHomePageComponent },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'list-new-product', component: AddProductPageComponent },
    ]
  },
];
