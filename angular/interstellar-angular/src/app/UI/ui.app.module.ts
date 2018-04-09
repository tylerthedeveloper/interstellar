import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProfileComponent, RegisterComponent, WelcomeComponent } from './_pages';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material.module';
import { DialogComponent } from './_components/dialog/dialog.component';
// import { SharedModule } from 'app/shared';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './forms/dynamic-form-question/dynamic-form-question.component';
import { ConfirmDialogComponent } from './_components';
import { FileUploadDialogComponent } from 'app/UI/_components/file-upload-dialog/file-upload.dialog.component';

const UIPages = [ ProfileComponent, WelcomeComponent, RegisterComponent ];
// const dialogComponents = [ ConfirmDialogComponent, ProductFormComponent, DialogComponent ];

@NgModule({
    imports : [
        MaterialModule,
//            CdkTableModule,
        CommonModule,
        ReactiveFormsModule,
        // SharedModule
    ],
    declarations:  [
                // UI Pages
                ...UIPages,
                // ...dialogComponents,
                DynamicFormQuestionComponent,
                DynamicFormComponent,
                DialogComponent,
                ConfirmDialogComponent,
                FileUploadDialogComponent
            ],
    exports: [
            // MaterialDesignModule,
            ...UIPages,
            // ...dialogComponents
        ],
    entryComponents: [ ConfirmDialogComponent, DialogComponent, DynamicFormComponent,
                        DynamicFormQuestionComponent, FileUploadDialogComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
