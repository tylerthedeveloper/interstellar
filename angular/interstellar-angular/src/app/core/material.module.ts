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
    MatSliderModule,
    MatIconModule
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
    MatSliderModule,
    MatIconModule
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
