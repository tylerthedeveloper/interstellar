import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuardService as AuthGuard} from 'app/core/_helpers/auth-guard.service';
import { UserListComponent } from './components/user-list/user-list.component';


 // todo: go to USER / ID
export const UserRoutes: Routes = [
  {
    path: '',
    // component: WelcomeComponent,
    children: [
      // add id
      { path: '', component: UserListComponent},
      { path: 'me', component: ProfileComponent, canActivate: [AuthGuard] },
    ]
  },
];
