import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// fire-base
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';

/** App */
import { AppComponent } from './app.component';
import { AppRoutes } from 'app/app.routes';
import { environment } from '../environments/environment';

/** Services */
import { StellarAccountService, StellarPaymentService } from './stellar/index';
import { UserService } from './user.service';

/** Modules */
import { SharedModule } from './shared/index';
import { CoreModule } from 'app/core';

/** UI  */
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { UIModule } from './UI/ui.app.module';
import { MaterialModule } from './core/material.module';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { DialogComponent } from './UI/_components/dialog/dialog.component';
import { DynamicFormComponent } from './UI/forms/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './UI/forms/dynamic-form-question/dynamic-form-question.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
      // angular
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,

      // firebase
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule.enablePersistence(),
      AngularFireDatabaseModule, // AngularFireAuthModule,
      MDBBootstrapModule.forRoot(),
      AngularFireStorageModule,

      RouterModule.forRoot(AppRoutes, { preloadingStrategy: PreloadAllModules }),

      // UI
      SharedModule,
      UIModule,
      CoreModule,
      MaterialModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [
    // NavBarComponent
    // ConfirmDialogComponent
    // DialogComponent, DynamicFormComponent, DynamicFormQuestionComponent
  ],
  providers: [
              StellarAccountService,
              StellarPaymentService,

              UserService,
              // ConfirmDialogComponent
            ],
  entryComponents: [ DialogComponent, DynamicFormComponent, DynamicFormQuestionComponent ], // DialogComponent,
  bootstrap: [AppComponent],
})
export class AppModule { }
