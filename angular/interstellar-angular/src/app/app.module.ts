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
import { StellarService } from './stellar/stellar.service';

import { UIModule } from './UI/ui.app.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      //angular
      BrowserModule, HttpModule, FormsModule,
      
      //firebase
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule, AngularFireDatabaseModule,
  
      //Other
      UIModule, AppRoutingModule
  ],
  exports: [
    //NavBarComponent
  ],
  providers: [StellarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
