import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HowToEatComponent } from './hte.component';

@NgModule({
  declarations: [
    HowToEatComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    HowToEatComponent
  ],
  providers: []
})
export class HowToEatModule { }
