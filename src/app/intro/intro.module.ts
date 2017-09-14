import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Windoc } from "../services/windoc";
import { IntroComponent } from './intro.component';

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
  providers: [
      Windoc
  ]
})
export class IntroModule { }
