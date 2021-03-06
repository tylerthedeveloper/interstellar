import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Routing */
import { RouterModule } from '@angular/router';
import { CheckoutRoutes as routes } from './checkout.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**  UI and components */
import { SharedModule } from 'app/shared';
import { MaterialModule } from 'app/core/material.module';
import { CartComponent } from 'app/marketplace/checkout/components/cart/cart.component';
import { CartItemCardComponent } from 'app/marketplace/checkout/components/cart-item-card/cart-item-card.component';
import { CheckoutComponent } from 'app/marketplace/checkout/components/checkout/checkout.component';
import { OrderConfirmationComponent } from 'app/marketplace/checkout/components/order-confirmation/order-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [
    CartComponent,
    CartItemCardComponent,
    CheckoutComponent,
    OrderConfirmationComponent
  ]
})
export class CheckoutModule { }
