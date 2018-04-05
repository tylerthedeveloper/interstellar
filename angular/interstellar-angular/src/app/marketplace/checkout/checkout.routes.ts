import { Routes } from '@angular/router';
import { CartComponent } from 'app/marketplace/checkout/components/cart/cart.component';
import { CheckoutComponent } from 'app/marketplace/checkout/components/checkout/checkout.component';
import { OrderConfirmationComponent } from 'app/marketplace/checkout/components/order-confirmation/order-confirmation.component';

export const CheckoutRoutes: Routes = [
  {
    path: '',
    // pathMatch: full',
    // component: CartComponent,
    children: [
      { path: '', component: CartComponent},
      { path: 'checkout', component: CheckoutComponent },
      // TODO: MAKE A CHILD...
      // { path: 'checkout/order-confirmation/:id', component: OrderConfirmationComponent },
      { path: 'order-history/:id', component: OrderConfirmationComponent },
      // { path: '/**', redirectTo: 'home' },
      // { path: '404', redirectTo: 'home' },
      { path: '**', redirectTo: 'home' },
      // { path: '', redirectTo: '', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'home' },
];
