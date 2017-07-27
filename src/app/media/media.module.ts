import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgArrayPipesModule } from 'ngx-pipes';

import { MediaComponent } from './Media.component';

@NgModule({
  declarations: [
    MediaComponent,
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
