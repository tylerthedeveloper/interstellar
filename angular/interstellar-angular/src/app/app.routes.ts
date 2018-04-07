import { Routes } from '@angular/router';

import { RegisterComponent, ProfileComponent, WelcomeComponent } from './UI/_pages/index';
import { AuthGuardService as AuthGuard } from './core/_helpers/auth-guard.service';

export const AppRoutes: Routes = [
    { path: 'home', component: WelcomeComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'products', loadChildren: 'app/marketplace/products/index#ProductModule' },
    { path: 'categories', loadChildren: 'app/marketplace/category/index#CategoryModule'},
    { path: 'cart', loadChildren: 'app/marketplace/checkout/index#CheckoutModule'},
    { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: '**', redirectTo: '/home', pathMatch: 'full' },
    { path: '*', redirectTo: '/home', pathMatch: 'full' },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];

// TODO: Test pre-load
