/** Angular */
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/core/material.module';

import { SharedModule } from 'app/shared';
import { RouterModule } from '@angular/router';
import { UserRoutes as routes } from './user.routes';
import { ProfileComponent, UserCardComponent, UserListComponent } from './components/user.components';

const UIPages = [ ProfileComponent, UserCardComponent, UserListComponent ];

@NgModule({
    imports : [
        MaterialModule,
//            CdkTableModule,
        SharedModule,
        // CommonModule,
        // ReactiveFormsModule,
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
