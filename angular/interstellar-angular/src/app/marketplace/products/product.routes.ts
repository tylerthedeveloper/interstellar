import { Routes } from '@angular/router';
import { ProductPageComponent } from 'app/marketplace/products/components/product-page/product-page.component';
import { ProductsHomePageComponent } from 'app/marketplace/products/components/products-home-page/products-home-page.component';

export const ProductRoutes: Routes = [
  {
    path: '',
    // component: CategoryFeedComponent,
    children: [
      { path: '', component: ProductsHomePageComponent },
      { path: ':id', component: ProductPageComponent },
    ]
  },
  // { path: ':category', component: CategoryPageComponent },
];
