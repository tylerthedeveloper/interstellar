import { Routes } from '@angular/router';

// import { ProfileComponent } from './UI/_pages/index';
import { AuthGuardService as AuthGuard } from './core/_helpers/auth-guard.service';
import { WelcomeComponent } from 'app/home/components/welcome/welcome.component';

export const AppRoutes: Routes = [
    // { path: 'home', component: WelcomeComponent },
    { path: 'home', loadChildren: 'app/home/index#HomeModule' },
    { path: 'profile', loadChildren: 'app/user/index#UserModule' },
    // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'products', loadChildren: 'app/marketplace/products/index#ProductModule' },
    { path: 'categories', loadChildren: 'app/marketplace/category/index#CategoryModule'},
    { path: 'cart', loadChildren: 'app/marketplace/checkout/index#CheckoutModule'},
    // { path: 'register', component: RegisterComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '*', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

