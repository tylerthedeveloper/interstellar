import { NgModule, NO_ERRORS_SCHEMA }  from '@angular/core';
import { CommonModule } from '@angular/common';
//->import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { MaterialDesignModule } from './ng-md.module';
import { RouterModule, Router } from '@angular/router';

import { NavBarComponent, ProfileComponent, WelcomeComponent } from './index';

@NgModule({
    imports : [
                    CommonModule,
    //                NgbModule.forRoot(),
                   MaterialDesignModule,
                    RouterModule, 
                    FormsModule, 
        //            CdkTableModule
            ],
    declarations:  [ 
                        NavBarComponent, ProfileComponent, WelcomeComponent
                    ],
    exports: [ 
                    //angular modules
                    RouterModule, 
                    FormsModule,
                    CommonModule,
                    // NgbModule, 
                    MaterialDesignModule, 

                    //pages
                    NavBarComponent, 
                    ProfileComponent,
                    WelcomeComponent
                ],
    entryComponents: [],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class UIModule { }
