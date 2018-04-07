
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { RegisterComponent, ProfileComponent, WelcomeComponent } from './UI/_pages/index';
import { AuthGuardService as AuthGuard } from './core/_helpers/auth-guard.service';

const appRoutes: Routes = [
    { path: 'home', component: WelcomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // /:uid
    { path: 'products', loadChildren: 'app/marketplace/products/index#ProductModule' },
    { path: 'categories', loadChildren: 'app/marketplace/category/index#CategoryModule'},
    { path: 'cart', loadChildren: 'app/marketplace/checkout/index#CheckoutModule'},
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
    { path: '*', redirectTo: '/home', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

// TODO: Test pre-load
 @NgModule({
  imports: [ RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
