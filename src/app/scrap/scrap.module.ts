import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ScrapComponent } from './scrap.component';

@NgModule({
  declarations: [
    ScrapComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    ScrapComponent
  ],
  providers: []
})
export class ScrapModule { }
