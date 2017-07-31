import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { NgArrayPipesModule } from 'ngx-pipes';
import { YoutubePlayerModule } from 'ng2-youtube-player';

import { MediaComponent } from './Media.component';
import { BoxAComponent } from './box/boxa.component';
import { BoxBComponent } from './box/boxb.component';
import { BoxCComponent } from './box/boxc.component';
import { BoxDComponent } from './box/boxd.component';

@NgModule({
  declarations: [
    MediaComponent,
    BoxAComponent,
    BoxBComponent,
    BoxCComponent,
    BoxDComponent
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
