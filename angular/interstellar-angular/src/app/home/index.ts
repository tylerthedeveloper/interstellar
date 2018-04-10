import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material.module';

import { HomeRoutes as routes } from './home.routes';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

// import { SharedModule } from 'app/shared';


@NgModule({
    imports : [
        MaterialModule,
//            CdkTableModule,
        CommonModule,
        RouterModule.forChild(routes),
        // SharedModule,
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
                        //     ConfirmDialogComponent, DialogComponent, DynamicFormComponent,
                        // DynamicFormQuestionComponent, FileUploadDialogComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class HomeModule { }
