import { NgModule } from '@angular/core';

// NoConflictStyleCompatibilityMode, MaterialModule

const materialModules = [ 
    MatButtonModule,  
    MatTabsModule, 
    MatMenuModule, 
    MatCardModule, 
    MatInputModule,
    MatGridListModule, 
    MatTableModule, 
    MatSidenavModule, 
    MatSelectModule,
    MatDialogModule, 
    MatToolbarModule, 
    MatStepperModule, 
    MatCheckboxModule,
    MatListModule, 
    MatSliderModule
];


import {
    MatButtonModule,  
    MatTabsModule, 
    MatMenuModule, 
    MatCardModule, 
    MatInputModule,
    MatGridListModule, 
    MatTableModule, 
    MatSidenavModule, 
    MatSelectModule,
    MatDialogModule, 
    MatToolbarModule, 
    MatStepperModule, 
    MatCheckboxModule,
    MatListModule, 
    MatSliderModule
} from '@angular/material';


@NgModule({
  imports: [
      ...materialModules
  ],
  exports: [
      ...materialModules
  ]
})
export class MaterialModule { }
