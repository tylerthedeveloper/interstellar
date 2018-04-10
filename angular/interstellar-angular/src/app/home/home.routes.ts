import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    component: WelcomeComponent,
    // children: [
    //   { path: '', component: WelcomeComponent },
    // ]
  },
];
