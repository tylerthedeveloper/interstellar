import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material.module';

import { SharedModule } from 'app/shared';

const UIPages = [ ProfileComponent ];
// const dialogComponents = [ ConfirmDialogComponent, ProductFormComponent, DialogComponent ];

@NgModule({
    imports : [
        MaterialModule,
//            CdkTableModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        // SharedModule
    ],
    declarations:  [
                // UI Pages
                ...UIPages,
                // ...dialogComponents,
                // DynamicFormQuestionComponent,
                // DynamicFormComponent,
                // DialogComponent,
                // ConfirmDialogComponent,
                // FileUploadDialogComponent
            ],
    exports: [
            // MaterialDesignModule,
            ...UIPages,
            // ...dialogComponents
        ],
    entryComponents: [
                        //     ConfirmDialogComponent, DialogComponent, DynamicFormComponent,
                        // DynamicFormQuestionComponent, FileUploadDialogComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UserModule { }
