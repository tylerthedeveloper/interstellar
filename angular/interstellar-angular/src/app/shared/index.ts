import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Pipes

// components

// imports
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './forms/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './forms/dynamic-form-question/dynamic-form-question.component';

@NgModule({
  declarations: [
      // components
      // pipes

      // form stuff
      DynamicFormComponent,
      DynamicFormQuestionComponent,

  ],
  exports: [
      // components
      // modules
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      // pipes

        // form stuff
        DynamicFormComponent,
        DynamicFormQuestionComponent,


  ],
  imports: [
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
  ]
})
export class SharedModule {}
