import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormsModule } from '@angular/forms'; // ReactiveFormsModule
import { HttpModule } from '@angular/http';

// fire-base
import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { UIModule } from './UI/ui.app.module';
import { MaterialModule } from './core/material.module';
import { StellarAccountService, StellarPaymentService } from './stellar/index';
import { UserService } from './user.service';
import { CoreModule } from 'app/core';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
      // angular
      BrowserModule, HttpModule, FormsModule, BrowserAnimationsModule,

      // firebase
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule.enablePersistence(),
      AngularFireDatabaseModule, // AngularFireAuthModule,

      MDBBootstrapModule.forRoot(),

      // Other
      UIModule, AppRoutingModule, CoreModule, MaterialModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [
    // NavBarComponent
    // ConfirmDialogComponent
  ],
  providers: [
              StellarAccountService,
              StellarPaymentService,

              UserService,
              // ConfirmDialogComponent

  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
