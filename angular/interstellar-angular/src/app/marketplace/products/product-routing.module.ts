import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsHomePageComponent } from './products-home-page/products-home-page.component';

const routes: Routes = [
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProductRoutingModule { }

// export const routedComponents = [VehiclesComponent, VehicleListComponent, VehicleComponent];
