import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; //ReactiveFormsModule
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { StellarService } from './stellar.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule      
  ],
  providers: [StellarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
