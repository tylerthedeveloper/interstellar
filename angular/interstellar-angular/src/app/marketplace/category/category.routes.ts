import { Routes } from '@angular/router';
import { CategoryPageComponent } from 'app/marketplace/category/components/category-page/category-page.component';
import { CategoryFeedComponent } from 'app/marketplace/category/components/category-feed/category-feed.component';

export const CategoryRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CategoryFeedComponent },
      { path: ':category', component: CategoryPageComponent },
    ]
  },
];
