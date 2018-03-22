import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NoConflictStyleCompatibilityMode, MaterialModule


import {
    MatButtonModule,  MatTabsModule, MatMenuModule, MatCardModule, MatInputModule,
    MatGridListModule, MatTableModule, MatSidenavModule, MatSelectModule,
    MatDialogModule, MatToolbarModule, MatStepperModule
} from '@angular/material';

const materialModules = [ MatButtonModule, MatTabsModule, MatMenuModule,
                          MatCardModule, MatInputModule, MatGridListModule,
                          MatTableModule, MatSidenavModule, MatSelectModule,
                          MatDialogModule, MatToolbarModule, MatStepperModule
];

@NgModule({
  imports: [
      ...materialModules
  ],
  exports: [
      ...materialModules
  ]
})
export class MaterialModule { }
