import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { IntroComponent } from './Intro.component';

@NgModule({
  declarations: [
    IntroComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    IntroComponent
  ],
  providers: []
})
export class IntroModule { }
