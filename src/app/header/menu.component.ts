import { Component } from '@angular/core';

@Component({
  selector: '.menu',
  templateUrl: './menu.component.html'
})

export class MenuComponent {
  menu: MenuItem[] = [
    {title: "MENU1", href: "#menu1", target: "_self", selected: false},
    {title: "MENU2", href: "#menu2", target: "_self", selected: false},
    {title: "MENU3", href: "#menu3", target: "_self", selected: false},
    {title: "MENU4", href: "#menu4", target: "_self", selected: false},
    {title: "BLOG", href: "#blog", target: "_blank", selected: false}
  ];

  ngOnInit() {
  }

}

export class MenuItem {
  title: string;
  href: string;
  target: string;
  selected: boolean;
}
