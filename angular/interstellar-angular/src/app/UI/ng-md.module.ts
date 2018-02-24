import { NgModule } from '@angular/core';

//NoConflictStyleCompatibilityMode, MaterialModule

import { 
          MatButtonModule,  MatTabsModule, MatMenuModule, MatCardModule, MatInputModule, 
          MatGridListModule, MatTableModule, MatSidenavModule, MatSelectModule, 
          MatDialogModule
        } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [ BrowserAnimationsModule, MatButtonModule, MatTabsModule, 
              MatMenuModule, MatCardModule, MatInputModule, MatGridListModule, 
              MatTableModule, MatSidenavModule, MatSelectModule, MatDialogModule,
              //MaterialModule
               ],
  exports: [ BrowserAnimationsModule, MatButtonModule, MatTabsModule, 
              MatMenuModule, MatCardModule, MatInputModule, MatGridListModule, 
              MatTableModule, MatSidenavModule, MatSelectModule, MatDialogModule,
              // MaterialModule
               ]
})
export class MaterialDesignModule { }
