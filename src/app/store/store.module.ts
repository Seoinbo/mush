import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreComponent } from './store.component';
import { StoreService } from './store.service';
import { DeviceService } from '../services/device.service';

import { NumberPipes } from '../pipes/numbers';

@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    BrowserModule,
    NumberPipes
  ],
  exports: [
    StoreComponent
  ],
  providers: [
      StoreService,
      DeviceService
  ]
})
export class StoreModule { }
