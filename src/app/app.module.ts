import { BrowserModule } from '@angular/platform-browser';

import { Windoc } from "./services/Windoc";

import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';

import { HeaderModule } from './header/header.module';
import { IntroModule } from './intro/intro.module';
import { MediaModule } from './media/media.module';
import { ScrapModule } from './scrap/scrap.module';
import { StoreModule } from './store/store.module';
import { CartModule } from './store/cart.module';
import { HowToEatModule } from './hte/hte.module';
import { FooterModule } from './footer/footer.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    IntroModule,
    MediaModule,
    ScrapModule,
    StoreModule,
    CartModule,
    HowToEatModule,
    FooterModule
  ],
  providers: [
      Windoc
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
