import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFeedComponent } from './category-feed/category-feed.component';
import { CategoryPageComponent } from './category-page/category-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CategoryFeedComponent },
      { path: ':category', component: CategoryPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CategoryRoutingModule { }
