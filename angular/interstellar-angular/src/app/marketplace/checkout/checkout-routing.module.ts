import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'checkout/order-confirmation/:id', component: OrderConfirmationComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CheckoutRoutingModule { }
