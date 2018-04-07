import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// Pipes

// components

// imports
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // components
    // pipes
  ],
  exports: [
    // components
    // modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // pipes
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ]
})
export class SharedModule {}
