import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { Windoc } from "./services/windoc";
import { DeviceService } from './services/device.service';
import { TooltipService } from '../components/tooltip/tooltip.service';
import { RoutingModule } from './router.module';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { IntroModule } from './intro/intro.module';
import { MediaModule } from './media/media.module';
import { ScrapModule } from './scrap/scrap.module';
import { StoreModule } from './store/store.module';
import { CartModule } from './store/cart.module';
import { HowToEatModule } from './hte/hte.module';
import { FooterModule } from './footer/footer.module';
import { TooltipModule } from '../components/tooltip/tooltip.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    Ng2DeviceDetectorModule.forRoot(),
    RoutingModule,
    HeaderModule,
    IntroModule,
    MediaModule,
    ScrapModule,
    StoreModule,
    CartModule,
    HowToEatModule,
    FooterModule,
    TooltipModule
  ],
  providers: [
      Windoc,
      DeviceService,
      TooltipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
