import { Component, HostListener, Inject, ViewChild } from '@angular/core';
import { Windoc } from "./services/windoc";
import { DeviceService } from './services/device.service';
import { TooltipService } from '../components/tooltip/tooltip.service';
import { MediaComponent } from './media/media.component';

import * as $ from 'jquery';
declare const ScrollMagic: any

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    host: {
        '[class.is-mobile]': 'deviceService.isMobile'
    }
})
export class AppComponent {
    @ViewChild(MediaComponent)
    protected mediaComponent: MediaComponent;

    private screenType: string = "desktop";
    title = 'Doorisan';

    // class flag
    private topNavfloating: boolean = false;
    private topButtonVisible: boolean = false;

    protected document: Document;

    constructor(private windoc: Windoc,
        private deviceService: DeviceService,
        private tooltipService: TooltipService) {
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
        if (pos > 70) {
            this.topNavfloating = true;
        } else if (this.topNavfloating && pos <= 70) {
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
        let type;
        let windowWidth = event.target.innerWidth;
        if (windowWidth > 980) {
            type = "desktop";
        } else {
            type = "mobile";
        }
        if (type != this.screenType) {
            this.mediaComponent.onChangeDeviceType(type);
            this.screenType = type;
        }
    }

    ngAfterViewInit() {
        let that = this;
        // let controller = new ScrollMagic.Controller();
        // // build scene
        // new ScrollMagic.Scene({ triggerElement: "#store", duration: this.storeHeight })
        //     .setClassToggle(".cart", "visible")
        //     // .addIndicators({ name: "cart" })
        //     .addTo(controller)
        //     .on("start end", function (e) {
        //         if (that.tooltipService.id == "cartip") {
        //             that.tooltipService.hide();
        //         }
        //     });
    }

    private storeHeight() {
        return $("#store").outerHeight();
    }
}
