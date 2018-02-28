// https://github.com/johnpapa/angular-first-look-examples/edit/master/_examples/storyline-tracker/app/core/core.module.ts


import { NgModule } from '@angular/core';  // , Optional, SkipSelf
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavBarComponent } from 'app/core/navbar/navbar.component';
import { AuthGuardService, EventEmitterService } from './';
import { MaterialModule } from './material.module';

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
        AuthGuardService, EventEmitterService
    ]
})
export class CoreModule {
//   constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
//     throwIfAlreadyLoaded(parentModule, 'CoreModule');
//   }
}
