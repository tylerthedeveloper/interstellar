import { NgModule, NO_ERRORS_SCHEMA }  from '@angular/core';
import { CommonModule } from '@angular/common';
//->import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from './ng-md.module';
import { RouterModule, Router } from '@angular/router';

import { NavBarComponent, ProfileComponent, RegisterComponent, WelcomeComponent } from './index';
import { ConfirmDialogComponent } from 'app/UI/components/dialog/confirm.dialog.component';
import { ProductComponent } from 'app/UI/product/product.component';
import { ProductfeedComponent } from './productfeed/productfeed.component';

@NgModule({
    imports : [
        CommonModule,
       MaterialDesignModule,
        RouterModule, 
        FormsModule, 
//            CdkTableModule
    ],
    declarations:  [ 
                //UI Pages
                NavBarComponent, 
                ProfileComponent, 
                WelcomeComponent,
                RegisterComponent,
                ConfirmDialogComponent,
                ProductComponent,
                ProductfeedComponent
            ],
    exports: [ 
            RouterModule, 
            FormsModule,
            CommonModule,
            MaterialDesignModule, 

            NavBarComponent, 
            ProfileComponent,
            WelcomeComponent,
            RegisterComponent,
            ConfirmDialogComponent,
            ProductComponent,
            ProductfeedComponent
        ],
    entryComponents: [ ConfirmDialogComponent ], // DialogComponent, 
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
