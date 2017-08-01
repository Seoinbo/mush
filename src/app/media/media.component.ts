import { Component, ViewChildren, QueryList } from '@angular/core';
import { BoxComponent } from './box.component';

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

    protected boxes: any[] = [];
    protected selected: any;

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
        }).on("afterChange", function (event, slick, currentSlide) {
            that.focus(currentSlide);
        });

        // Focus first slide.
        setTimeout( function() {
            that.focus(0);
        }, 1000);

    }

    loadData() {
        let data = Data.get("media").reverse();
        let prevType = null;
        let i = -1;
        for (let row of data) {
            if (prevType != row.type) {
                i++;
                this.boxes[i] = {
                    id: row.id,
                    type: row.type,
                    images: [],
                    videos: [],
                    title: row.title,
                    date: this.dateFormat(row.time)
                };
            }
            this.boxes[i].images.push(row.image);
            this.boxes[i].videos.push(row.video);
            prevType = row.type;
        }
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
