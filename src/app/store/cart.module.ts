import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CartComponent } from './cart.component';
import { StoreService } from './store.service';

import { NumberPipes } from '../pipes/numbers';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    BrowserModule,
    NumberPipes
  ],
  exports: [
    CartComponent
  ],
  providers: [
      StoreService
  ]
})

export class CartModule { }
