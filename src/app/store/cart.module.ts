import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CartComponent } from './cart.component';
import { StoreService } from './store.service';


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
  providers: [
      StoreService
  ]
})

export class CartModule { }
