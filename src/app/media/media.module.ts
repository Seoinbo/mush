import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MediaComponent } from './Media.component';

@NgModule({
  declarations: [
    MediaComponent,
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    MediaComponent
  ],
  providers: []
})
export class MediaModule { }
