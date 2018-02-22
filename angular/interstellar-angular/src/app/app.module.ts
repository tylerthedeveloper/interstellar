import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //ReactiveFormsModule
import { HttpModule } from "@angular/http";

//fire base
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { StellarAccountService, StellarPaymentService } from './stellar/index';

import { UIModule } from './UI/ui.app.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './_helpers/auth-guard.service';
import { EventEmitterService } from './_helpers/event-emitter.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      //angular
      BrowserModule, HttpModule, FormsModule,
      
      //firebase
      //AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule, AngularFireDatabaseModule,
  
      //Other
      UIModule, AppRoutingModule
  ],
  exports: [
    //NavBarComponent
  ],
  providers: [
              EventEmitterService,
              // AuthService,
              AuthGuardService,
    
              StellarAccountService, 
              StellarPaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
