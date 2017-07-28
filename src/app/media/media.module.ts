import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgArrayPipesModule } from 'ngx-pipes';

import { MediaComponent } from './Media.component';
import { BoxAComponent } from './boxa.component';

@NgModule({
  declarations: [
    MediaComponent,
    BoxAComponent
  ],
  imports: [
    BrowserModule,
    NgArrayPipesModule,
  ],
  exports: [
    MediaComponent
  ],
  providers: []
})
export class MediaModule { }
