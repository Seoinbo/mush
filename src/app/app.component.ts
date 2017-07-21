import { Component, HostListener, Inject } from '@angular/core';
import { Windoc } from "./services/Windoc";

import * as $ from 'jquery';
declare const ScrollMagic: any

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    // class flag
    topNavfloating: boolean = false;
    topButtonVisible: boolean = false;

    document: Document;

    constructor( @Inject(Windoc) private windoc: Windoc) {
        this.document = this.windoc.document();
    }

    // Browser scroll move to top.
    goToTop(event) {
        event.preventDefault();
        $(this.document).scrollTop(0);
    }

    @HostListener("window:scroll", [])
    onWindowScroll() {
        // Detect scroll position.
        let pos = $(this.document).scrollTop();

        // Switching top-navigation status.
        if (pos > 25) {
            this.topNavfloating = true;
        } else if (this.topNavfloating && pos <= 25) {
            this.topNavfloating = false;
        }

        // Switching top button visibility.
        if (pos <= 0) {
            this.topButtonVisible = false;
        } else {
            this.topButtonVisible = true;
        }

    }

    ngAfterViewInit() {
        var controller = new ScrollMagic.Controller();
        // build scene
        new ScrollMagic.Scene({ triggerElement: ".store", duration: "550" })
            .setClassToggle(".cart", "visible")
            .addIndicators({ name: "cart" })
            .addTo(controller);
    }
}
