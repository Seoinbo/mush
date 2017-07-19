import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CartComponent } from './Cart.component';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    CartComponent
  ],
  providers: []
})
export class CartModule { }
