import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { NgArrayPipesModule } from 'ngx-pipes';

import { MediaComponent } from './Media.component';
import { BoxAComponent } from './boxa.component';
// import { BoxBComponent } from './boxb.component';
// import { BoxCComponent } from './boxc.component';
// import { BoxDComponent } from './boxd.component';

@NgModule({
  declarations: [
    MediaComponent,
    BoxAComponent,
    // BoxBComponent,
    // BoxCComponent,
    // BoxDComponent
  ],
  imports: [
    BrowserModule,
    NgArrayPipesModule
  ],
  exports: [
    MediaComponent
  ],
  providers: []
})
export class MediaModule { }
