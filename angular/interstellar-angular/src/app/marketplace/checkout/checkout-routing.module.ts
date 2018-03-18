import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CheckoutRoutingModule { }
