import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule
  ],
  exports: [
    HeaderComponent
  ],
  providers: []
})
export class HeaderModule { }
