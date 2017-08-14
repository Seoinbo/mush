import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreComponent } from './store.component';
import { StoreService } from './store.service';

@NgModule({
  declarations: [
    StoreComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    StoreComponent
  ],
  providers: [
      StoreService
  ]
})
export class StoreModule { }
