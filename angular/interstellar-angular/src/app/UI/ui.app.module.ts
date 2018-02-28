import { NgModule, NO_ERRORS_SCHEMA }  from '@angular/core';

// import { MaterialDesignModule } from './ng-md.module';
import { CommonModule } from "@angular/common";

import { ProfileComponent, RegisterComponent, WelcomeComponent } from './_pages';
import { ConfirmDialogComponent } from './_components';

const uiPages = [ ProfileComponent, WelcomeComponent, RegisterComponent, ConfirmDialogComponent ];

@NgModule({
    imports : [
    //    MaterialDesignModule,
//            CdkTableModule
        CommonModule
    ],
    declarations:  [ 
                //UI Pages
                ...uiPages
            ],
    exports: [ 
            // MaterialDesignModule, 
            ...uiPages
        ],
    entryComponents: [ ConfirmDialogComponent ], // DialogComponent, 
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
