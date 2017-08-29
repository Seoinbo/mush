import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CartComponent } from './cart.component';
import { StoreService } from './store.service';
import { TooltipService } from '../../components/tooltip/tooltip.service';

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
      StoreService,
      TooltipService
  ]
})

export class CartModule { }
