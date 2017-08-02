import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { BoxComponent } from './box.component';
import { HeaderComponent } from '../header/header.component';

import { Data } from '../data';


declare const moment: any;
declare const $: any;

@Component({
    selector: '.media',
    templateUrl: './media.component.html'
})

export class MediaComponent {
    @ViewChildren(BoxComponent)
    protected boxComponents: QueryList<BoxComponent>;

    @ViewChild(HeaderComponent)
    protected headerComponent: HeaderComponent;

    private dbOffset: number = 0;
    private dbLimit: number = 4;
    private boxCount: number = 0;
    private preloadCount: number = 2;
    protected boxes: any[] = [];
    protected selected: any;

    private navHidden: boolean = false;
    private picinfoHidden: boolean = true;

    constructor() {
        this.loadData();
        this.selected = this.boxes[0];
    }

    ngAfterViewInit() {
        let that = this;
        $(".carousel").slick({
            infinite: false,
            centerMode: true,
            variableWidth: true,
            prevArrow: ".media .nav .buttons .prev",
            nextArrow: ".media .nav .buttons .next"
        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            // Toggle visiblity via picinfo top.
            if (nextSlide <= 0 || nextSlide >= that.boxCount -1) {
                that.picinfoHidden = true;
                $("header").removeClass("hidden");
            } else {
                that.picinfoHidden = false;
                $("header").addClass("hidden");
            }
        }).on("afterChange", function (event, slick, currentSlide) {
            // Load more boxes.
            if (currentSlide + 1 + that.preloadCount >= that.boxCount) {
                that.loadData(2);
                setTimeout(function () {
                    slick.reinit();
                }, 250);
            }

            that.focus(currentSlide);
        });

        // Focus first slide.
        setTimeout( function() {
            that.focus(0);
        }, 2000);

    }

    loadData(limit: number = this.dbLimit) {
        let data = Data.get("media", this.dbOffset, limit);
        for (let row of data) {
            this.addItem(row);
        }
    }

    addItem(item) {
        this.boxes.push({
            id: item.id,
            type: item.type,
            images: item.images.split(","),
            videos: item.videos.split(","),
            title: item.title,
            date: this.dateFormat(item.time)
        });
        this.boxCount++;
        this.dbOffset++;
    }

    focus(index: number): boolean {
        this.boxComponents.forEach( function (box, i, arr) {
            if (index == i) {
                box.focusIn();
            } else {
                box.focusOut();
            }
        });
        this.selected = this.boxes[index];
        return false;
    }

    dateFormat(time): string {
        var date = moment(time * 1000);
        return date.format("YYYY.MM");
    }
}
