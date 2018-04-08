import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProfileComponent, RegisterComponent, WelcomeComponent } from './_pages';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material.module';
import { DialogComponent } from './_components/dialog/dialog.component';
// import { SharedModule } from 'app/shared';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './forms/dynamic-form-question/dynamic-form-question.component';

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
                DialogComponent
            ],
    exports: [
            // MaterialDesignModule,
            ...UIPages,
            // ...dialogComponents
        ],
    entryComponents: [ DialogComponent, DynamicFormComponent, DynamicFormQuestionComponent ],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
