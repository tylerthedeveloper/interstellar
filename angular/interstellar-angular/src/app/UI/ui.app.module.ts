import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
// import { MaterialDesignModule } from './ng-md.module';

import { ProfileComponent, RegisterComponent, WelcomeComponent } from './_pages';
import { ConfirmDialogComponent } from './_components';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractFormComponent } from 'app/UI/_components/abstract-form/abstract-form.component';

const uiPages = [ ProfileComponent, WelcomeComponent, RegisterComponent, ConfirmDialogComponent ];

@NgModule({
    imports : [
    //    MaterialDesignModule,
//            CdkTableModule
        CommonModule, ReactiveFormsModule
    ],
    declarations:  [
                // UI Pages
                ...uiPages,
                AbstractFormComponent
            ],
    exports: [
            // MaterialDesignModule,
            ...uiPages,
            AbstractFormComponent
        ],
    entryComponents: [ ConfirmDialogComponent ], // DialogComponent,
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
