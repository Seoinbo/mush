import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { MenuComponent } from './menu.component';
import { HeaderService } from './header.service';

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
    providers: [
        HeaderService
    ]
})
export class HeaderModule { }
