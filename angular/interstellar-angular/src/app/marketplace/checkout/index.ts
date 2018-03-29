import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'app/core/material.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartItemCardComponent } from './cart-item-card/cart-item-card.component';
import { CheckoutRoutingModule } from './checkout-routing.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule, CheckoutRoutingModule
  ],
  declarations: [ CartComponent, CartItemCardComponent, CheckoutComponent ]
})
export class CheckoutModule { }