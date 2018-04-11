// FIXME: move material to core ???... anything else??

// https://github.com/johnpapa/angular-first-look-examples/edit/master/_examples/storyline-tracker/app/core/core.module.ts


import { NgModule } from '@angular/core';  // , Optional, SkipSelf
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './components/navbar/navbar.component';

import { AuthGuardService } from './_helpers/auth-guard.service';
import { EventEmitterService } from './_helpers/event-emitter.service';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { OrderService } from 'app/core/services/order.service';
import { UserService } from './services/user.service';
import { ChatService } from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgbModule.forRoot()
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        NgbModule,
        NavBarComponent // TODO: Why??? [NavBarComponent]
    ],
    declarations: [NavBarComponent],
    providers: [
        AuthGuardService,
        EventEmitterService,
        ChatService,
        CartService,
        OrderService,
        ProductService,
        UserService
    ]
})
export class CoreModule {
//   constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
//     throwIfAlreadyLoaded(parentModule, 'CoreModule');
//   }
}
