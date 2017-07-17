import { Component } from '@angular/core';
import * as $ from 'jquery';

declare const ScrollMagic: any

@Component({
  selector: '.top-nav',
  templateUrl: './topnav.component.html'
})

export class TopnavComponent {

  ngOnInit() {
    var controller = new ScrollMagic.Controller();
    // build scene
    var scene = new ScrollMagic.Scene({triggerElement: ".top-nav", offset: 0, duration: 100, triggerHook: 0})
        .setPin(".top-nav")
        .setClassToggle(".top-nav", "floating")
        .addIndicators({name: "top-nav"})
        .addTo(controller)
        .on("progress", function (e) {
          console.log(e);
        });

  }
}
