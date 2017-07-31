import { Component } from '@angular/core';
import { Data } from '../data';

declare const moment: any;
declare const $: any;

@Component({
    selector: '.media',
    templateUrl: './media.component.html'
})

export class MediaComponent {
    boxes: any[] = [];
    selected: any;

    constructor() {
        this.loadData();
        this.focus(this.boxes[0].id);
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
            that.focus(that.boxes[currentSlide].id);
        });
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
        console.log(this.boxes)
    }

    focus(id: number): boolean {
        for (let v of this.boxes) {
            if (v.id == id) {
                this.selected = v;
            }
        }
        return false;
    }

    dateFormat(time): string {
        var date = moment(time * 1000);
        return date.format("YYYY.MM");
    }
}
