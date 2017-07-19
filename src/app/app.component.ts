  import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

declare const ScrollMagic: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  topNavfloating: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    // Switching top-navigation status.
    let pos = this.document.body.scrollTop;
    if (pos > 20) {
      this.topNavfloating = true;
    } else if (this.topNavfloating && pos < 20) {
      this.topNavfloating = false;
    }
  }

    ngAfterViewInit() {
      var controller = new ScrollMagic.Controller();
      // build scene
      new ScrollMagic.Scene({triggerElement: ".store", duration: "500"})
          .setClassToggle(".cart", "visible")
          .addIndicators({name: "cart"})
          .addTo(controller);
  }
}
