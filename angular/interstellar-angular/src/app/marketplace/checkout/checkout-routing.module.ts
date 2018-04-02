import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path: '',
    // pathMatch: full',
    // component: CartComponent,
    children: [
      { path: '', component: CartComponent},
      { path: 'checkout', component: CheckoutComponent },
      { path: 'checkout/order-confirmation/:id', component: OrderConfirmationComponent },
      // { path: '/**', redirectTo: 'home' },
      // { path: '404', redirectTo: 'home' },
      { path: '**', redirectTo: 'home' },
      // { path: '', redirectTo: '', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CheckoutRoutingModule { }
