import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { NgArrayPipesModule } from 'ngx-pipes';
import { YoutubePlayerModule } from 'ng2-youtube-player';

import { MediaComponent } from './Media.component';
import { BoxComponent } from './box.component';

@NgModule({
  declarations: [
    MediaComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    NgArrayPipesModule,
    YoutubePlayerModule
  ],
  exports: [
    MediaComponent
  ],
  providers: []
})
export class MediaModule { }
