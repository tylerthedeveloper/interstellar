import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService as AuthGuard} from 'app/core/_helpers/auth-guard.service';


 // todo: go to USER / ID
export const UserRoutes: Routes = [
  {
    path: '',
    // component: WelcomeComponent,
    children: [
      // add id
      { path: '', component: ProfileComponent, canActivate: [AuthGuard] },
    ]
  },
];
