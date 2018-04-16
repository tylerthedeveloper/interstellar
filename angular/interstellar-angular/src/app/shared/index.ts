import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Pipes

// components

// imports
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'app/core/material.module';
import { DialogComponent, ConfirmDialogComponent, FileUploadDialogComponent } from 'app/shared/_components';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './forms/dynamic-form-question/dynamic-form-question.component';
import { DateFormatterPipe } from './pipes/DatePipe';

@NgModule({
  declarations: [
      // components
      // pipes
      // form stuff
      DynamicFormComponent,
      DynamicFormQuestionComponent,
      DialogComponent,
      ConfirmDialogComponent,
      FileUploadDialogComponent,
      DateFormatterPipe
  ],
  exports: [
      // components
      // modules
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      // pipes

        // form stuff
        // DynamicFormComponent,
        // DynamicFormQuestionComponent,
        // DialogComponent,
        // MaterialModule
      DynamicFormComponent,
      DynamicFormQuestionComponent,
      DialogComponent,
      ConfirmDialogComponent,
      DateFormatterPipe
  ],
  imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule,

  ],
  entryComponents: [
    DialogComponent, FileUploadDialogComponent, DynamicFormComponent,
    DynamicFormQuestionComponent, ConfirmDialogComponent  ], // DialogComponent,
})
export class SharedModule {}
