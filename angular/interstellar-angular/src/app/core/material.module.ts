import { NgModule } from '@angular/core';

// NoConflictStyleCompatibilityMode, MaterialModule

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

@NgModule({
  imports: [
      ...materialModules
  ],
  exports: [
      ...materialModules
  ]
})
export class MaterialModule { }
