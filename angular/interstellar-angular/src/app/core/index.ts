// https://github.com/johnpapa/angular-first-look-examples/edit/master/_examples/storyline-tracker/app/core/core.module.ts


import { NgModule } from '@angular/core';  // , Optional, SkipSelf
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { NavBarComponent } from './components/navbar/navbar.component';
import { AuthGuardService } from './_helpers/auth-guard.service';
import { EventEmitterService } from './_helpers/event-emitter.service';
import { ProductService } from './services/product.service';


@NgModule({
    imports: [
        CommonModule, FormsModule, RouterModule, MaterialModule
    ],
    exports: [
        CommonModule, FormsModule, RouterModule, MaterialModule,
        [NavBarComponent]
    ],
    declarations: [NavBarComponent],
    providers: [
        AuthGuardService, EventEmitterService, ProductService
    ]
})
export class CoreModule {
//   constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
//     throwIfAlreadyLoaded(parentModule, 'CoreModule');
//   }
}
