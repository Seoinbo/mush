import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreComponent } from './Store.component';

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
  providers: []
})
export class StoreModule { }
