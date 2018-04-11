/** Angular */
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ReactiveFormsModule } from '@angular/forms';

/** My Modules */
import { MaterialModule } from 'app/core/material.module';
import { SharedModule } from 'app/shared';

/** Routing */
import { RouterModule } from '@angular/router';
import { ChatRoutes as routes } from './chat.routes';

/** Components */
import { ChatMessageComponent, ChatPageComponent, ChatThreadComponent } from './components/chat.components';
import { ConfirmDialogComponent } from 'app/shared/_components';

const components = [ ChatPageComponent, ChatMessageComponent, ChatThreadComponent ];

@NgModule({
    imports : [
        MaterialModule,
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ],
    declarations:  [
        ...components,
    ],
    exports: [
        ...components,
    ],
    entryComponents: [
        ConfirmDialogComponent
                        //     ConfirmDialogComponent, DialogComponent, DynamicFormComponent,
                        // DynamicFormQuestionComponent, FileUploadDialogComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class ChatModule { }
