import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material.module';

import { HomeRoutes as routes } from './home.routes';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';


@NgModule({
    imports : [
        MaterialModule,
//            CdkTableModule,
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        // SharedModule
    ],
    declarations:  [
        WelcomeComponent
                // UI Pages
                // ...dialogComponents,
                // DynamicFormQuestionComponent,
                // DynamicFormComponent,
                // DialogComponent,
                // ConfirmDialogComponent,
                // FileUploadDialogComponent
            ],
    exports: [
        WelcomeComponent
            // MaterialDesignModule,
            // ...dialogComponents
        ],
    entryComponents: [
    ],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class HomeModule { }
