import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Pipes

// components

// imports
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
// import { DynamicFormQuestionComponent } from './forms/dynamic-form-question/dynamic-form-question.component';
// import { DialogComponent } from 'app/UI/_components/dialog/dialog.component';
import { MaterialModule } from 'app/core/material.module';

@NgModule({
  declarations: [
      // components
      // pipes
      // form stuff
    //   DynamicFormComponent,
    //   DynamicFormQuestionComponent,
    //   DialogComponent

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
  ],
  imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      MaterialModule,

  ],
// entryComponents: [ DialogComponent, DynamicFormComponent, DynamicFormQuestionComponent ], // DialogComponent,

})
export class SharedModule {}
