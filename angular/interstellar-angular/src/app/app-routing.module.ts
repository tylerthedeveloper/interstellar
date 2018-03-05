
import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UIModule } from './UI/ui.app.module';
import { AppComponent } from './app.component';
import { RegisterComponent, ProfileComponent, WelcomeComponent } from './UI/_pages/index';
import { AuthGuardService as AuthGuard } from './core/_helpers/auth-guard.service';

  
    //handle AuthGuard


const appRoutes: Routes = [
    { path: 'home', component: WelcomeComponent }, // 
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // /:uid
    { path: 'products', loadChildren: 'app/marketplace/products/index#ProductModule' },
    { path: 'categories', loadChildren: 'app/marketplace/category/index#CategoryModule'},
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
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