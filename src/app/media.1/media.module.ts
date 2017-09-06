import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule} from '@angular/core';
import { NgArrayPipesModule } from 'ngx-pipes';
import { YoutubePlayerModule } from 'ng2-youtube-player';

import { MediaComponent } from './media.component';
import { BoxComponent } from './box.component';

import { DataService } from '../database/data.service';
import { DeviceService } from '../services/device.service';

@NgModule({
  declarations: [
    MediaComponent,
    BoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgArrayPipesModule,
    YoutubePlayerModule
  ],
  exports: [
    MediaComponent
  ],
  providers: [
    DataService,
    DeviceService
  ]
})
export class MediaModule { }
