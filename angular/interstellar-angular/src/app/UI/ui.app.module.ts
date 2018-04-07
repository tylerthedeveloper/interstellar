import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ProfileComponent, RegisterComponent, WelcomeComponent } from './_pages';
import { ConfirmDialogComponent } from './_components';
import { ReactiveFormsModule } from '@angular/forms';
import { AbstractFormComponent } from 'app/UI/_components/abstract-form/abstract-form.component';
import { ProductFormComponent } from '../marketplace/products/components/product-form/product-form.component';
import { MaterialModule } from 'app/core/material.module';

const UIPages = [ ProfileComponent, WelcomeComponent, RegisterComponent ];
const dialogComponents = [ ConfirmDialogComponent, ProductFormComponent, AbstractFormComponent ];

@NgModule({
    imports : [
        MaterialModule,
//            CdkTableModule
        CommonModule, ReactiveFormsModule
    ],
    declarations:  [
                // UI Pages
                ...UIPages,
                ...dialogComponents
            ],
    exports: [
            // MaterialDesignModule,
            ...UIPages,
            ...dialogComponents
        ],
    entryComponents: [ ...dialogComponents ], // DialogComponent,
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
