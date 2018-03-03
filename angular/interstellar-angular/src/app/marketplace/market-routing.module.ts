import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFeedComponent } from '.';
import { CategoryPageComponent } from './_pages';

const routes: Routes = [
  {
    path: '',
    // component: CategoryFeedComponent,
    children: [
      { path: '', component: CategoryFeedComponent },
      { path: ':category', component: CategoryPageComponent },
    ]
  },
  // { path: ':category', component: CategoryPageComponent },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MarketRoutingModule { }

// export const routedComponents = [VehiclesComponent, VehicleListComponent, VehicleComponent];