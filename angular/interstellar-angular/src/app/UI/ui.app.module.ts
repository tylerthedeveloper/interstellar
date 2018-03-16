import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
// import { MaterialDesignModule } from './ng-md.module';

import { ProfileComponent, RegisterComponent, WelcomeComponent } from './_pages';
import { ConfirmDialogComponent } from './_components';
import { ReactiveFormsModule } from '@angular/forms';

const uiPages = [ ProfileComponent, WelcomeComponent, RegisterComponent, ConfirmDialogComponent ];

@NgModule({
    imports : [
    //    MaterialDesignModule,
//            CdkTableModule
        CommonModule, ReactiveFormsModule
    ],
    declarations:  [
                // UI Pages
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
