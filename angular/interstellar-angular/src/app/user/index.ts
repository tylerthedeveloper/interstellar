import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/core/material.module';

import { SharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { UserRoutes as routes } from './user.routes';
import { ProfileComponent } from './components/profile/profile.component';
import { UserListComponent } from './components/user-list/user-list.component';
// import { ConfirmDialogComponent, DialogComponent, FileUploadDialogComponent } from 'app/shared/_components';
// import { DynamicFormQuestionComponent } from 'app/shared/forms/dynamic-form-question/dynamic-form-question.component';
// import { DynamicFormComponent } from 'app/shared/forms/dynamic-form/dynamic-form.component';

const UIPages = [ ProfileComponent, UserListComponent];
// const dialogComponents = [ ConfirmDialogComponent, ProductFormComponent, DialogComponent ];

@NgModule({
    imports : [
        MaterialModule,
//            CdkTableModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
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
