import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';


 // todo: go to USER / ID
export const UserRoutes: Routes = [
  {
    path: '',
    // component: WelcomeComponent,
    children: [
      // add id
      { path: '', component: ProfileComponent },
    ]
  },
];
