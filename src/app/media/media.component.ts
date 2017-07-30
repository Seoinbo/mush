import { Component } from '@angular/core';
import { Data } from '../data';
import { BoxAComponent } from './boxa.component';


declare const moment: any;
declare const $: any;

@Component({
    selector: '.media',
    templateUrl: './media.component.html'
})

export class MediaComponent {
    videos: any[];
    videoTitle = "Introducing Daydream";
    videoDescription = "Simple, high quality virtual reality";
    videoSwitched: boolean = false;
    videoSwitchLock: boolean = false;
    videoMsgHidden: boolean = true;
    timer1: any;
    timer2: any;
    timer3: any;
    selected: any;
    prevYear: number = 0;

    boxes: any[] = [];

    constructor() {
        this.loadData();

        this.videos = Data.get("media");
        this.loadVideo(this.videos[this.videos.length - 1].id);
    }

    ngAfterViewInit() {
        $('.carousel').slick({
            infinite: false,
            centerMode: true,
            variableWidth: true,
            prevArrow: ".media .nav .buttons .prev",
            nextArrow: ".media .nav .buttons .next"
        });
    }

    loadData() {
        let data = Data.get("media");
        for (let row of data) {
            let type = BoxAComponent;
            // type.title = "asdf";
            this.boxes.push({
                type: row.type,
                image: row.image,
                title: row.title,
                date: this.dateFormat(row.time)
            });
        }
    }

    loadVideo(vid: number): boolean {
        for (let v of this.videos) {
            if (v.id == vid) {
                this.selected = v;
                this.videoTitle = v.title;
                this.videoDescription = v.desc;
            }
        }

        // Play switching animations.
        let that = this;
        this.videoSwitched = false;
        this.videoSwitchLock = true;
        this.timer1 = setTimeout(function () {
            that.videoSwitchLock = false;
        }, 250);
        if (this.timer2 && this.timer2.state == "scheduled") {
            clearTimeout(this.timer2);
        }
        this.timer2 = setTimeout(function () {
            if (that.timer3 && that.timer3.state == "scheduled") {
                clearTimeout(that.timer3);
            }
            that.videoSwitched = true;
            that.timer3 = setTimeout(function () {
                that.videoSwitched = false;
            }, 7000);
        }, 200);

        return false;
    }

    dateFormat(time): string {
        var date = moment(time * 1000);
        var curYear = date.format('YYYY');
        var format = "MM";
        if (curYear != this.prevYear) {
            this.prevYear = curYear;
            format = "YYYY.MM";
        }
        return date.format(format);
    }
}
