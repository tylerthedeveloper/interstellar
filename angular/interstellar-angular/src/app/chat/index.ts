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

/** Compoents */
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatPageComponent } from './components/chat-page/chat-page.component';
import { ChatThreadComponent } from './components/chat-thread/chat-thread.component';

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
                        //     ConfirmDialogComponent, DialogComponent, DynamicFormComponent,
                        // DynamicFormQuestionComponent, FileUploadDialogComponent
    ],
    schemas: [ NO_ERRORS_SCHEMA ],

})
export class ChatModule { }
