import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Routing */
import { RouterModule } from '@angular/router';
import { CategoryRoutes as routes } from './category.routes';

/**  UI and components */
import { MaterialModule } from 'app/core/material.module';
import { CategoryFeedComponent } from 'app/marketplace/category/components/category-feed/category-feed.component';
import { CategoryPageComponent } from 'app/marketplace/category/components/category-page/category-page.component';
import { CategoryCardComponent } from 'app/marketplace/category/components/category-card/category-card.component';
import { CategoryProductCardComponent } from 'app/marketplace/category/components/category-product-card/category-product-card.component';

/** Services */

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule.forChild(routes),

    ],
    declarations: [
        CategoryFeedComponent,
        CategoryPageComponent,
        CategoryCardComponent,
        CategoryProductCardComponent
    ],
    providers: [ ]
  })
export class CategoryModule { }
