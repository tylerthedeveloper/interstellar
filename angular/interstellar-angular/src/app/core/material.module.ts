import { NgModule } from '@angular/core';

// NoConflictStyleCompatibilityMode, MaterialModule
// import { PortalModule } from '@angular/cdk/portal'

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
    MatSliderModule,
    // PortalModule
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
