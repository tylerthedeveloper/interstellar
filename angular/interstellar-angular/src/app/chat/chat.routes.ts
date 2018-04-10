import { Routes } from '@angular/router';
import { AuthGuardService as AuthGuard} from 'app/core/_helpers/auth-guard.service';
import { ChatPageComponent } from './components/chat-page/chat-page.component';


 // todo: go to USER / ID
export const ChatRoutes: Routes = [
  {
    path: '',
    children: [
      // add id
      { path: '', component: ChatPageComponent, canActivate: [AuthGuard] },
    ]
  },
];
