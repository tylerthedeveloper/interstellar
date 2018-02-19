
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// --> import { SignUpComponent } from './account/index';
import { UIModule } from './UI/ui.app.module';
import { AppComponent } from './app.component';
import { ProfileComponent, WelcomeComponent } from './UI';

const appRoutes: Routes = [
   { path: 'home', component: WelcomeComponent }, //canActivate: [AuthGuard] 
    { path: 'profile', component: ProfileComponent }, // /:uid
    //{ path: 'contact', component: ContactComponent },
    { path: '*', redirectTo: '/home', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    //{ path: '**', redirectTo: 'home' }
];

 @NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}

//export const routing = RouterModule.forRoot(appRoutes);