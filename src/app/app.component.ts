import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { Windoc } from "./services/windoc";
import { MediaComponent } from './media/media.component';

import * as $ from 'jquery';
declare const ScrollMagic: any

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild(MediaComponent)
    protected mediaComponent: MediaComponent;

    title = 'app';
    protected isMobile: boolean = false;

    // class flag
    private topNavfloating: boolean = false;
    private topButtonVisible: boolean = false;

    protected document: Document;

    constructor( @Inject(Windoc) private windoc: Windoc) {
        this.document = this.windoc.document;
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

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        let isMobile;
        let windowWidth = event.target.innerWidth;
        if (windowWidth > 980) {
            isMobile = false;
        } else {
            isMobile = true;
        }
        if (isMobile != this.isMobile) {
            let deviceType = "desktop";
            if (isMobile) {
                deviceType = "mobile";
            }
            this.mediaComponent.onChangeDeviceType(deviceType);
            this.isMobile = isMobile;
        }
    }

    ngAfterViewInit() {
        var controller = new ScrollMagic.Controller();
        // build scene
        new ScrollMagic.Scene({ triggerElement: "#store", duration: this.storeHeight })
            .setClassToggle(".cart", "visible")
            // .addIndicators({ name: "cart" })
            .addTo(controller);
    }

    private storeHeight() {
        return $("#store").outerHeight();
    }
}
