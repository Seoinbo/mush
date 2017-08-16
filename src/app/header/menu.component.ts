import { Component } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: '.menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent {
    menu: any[];

    constructor(private headerService: HeaderService) {
        this.menu = this.headerService.menu;
    }
}
