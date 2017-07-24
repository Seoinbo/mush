import { Component } from '@angular/core';
import * as $ from 'jquery';

declare const moment: any

@Component({
    selector: '.media',
    templateUrl: './media.component.html'
})

export class MediaComponent {
    videos: Video[];
    videoTitle = "Introducing Daydream";
    videoDescription = "Simple, high quality virtual reality";
    videoSwitched: boolean = false;
    videoSwitchLock: boolean = false;
    videoMsgHidden: boolean = true;
    timer1: any;
    timer2: any;
    timer3: any;
    selected: Video = {
        id: 0,
        title: "",
        desc: "",
        time: 0,
        src: "",
        alt: ""
    };
    prevYear: number = 0;

    constructor() {
        this.videos = this.getVideoData();
        this.loadVideo(this.videos[this.videos.length-1].id);
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
        this.timer1 = setTimeout( function() {
            that.videoSwitchLock = false;
        }, 250);
        if (this.timer2 && this.timer2.state == "scheduled") {
            clearTimeout(this.timer2);
        }
        this.timer2 = setTimeout( function() {
            if (that.timer3 && that.timer3.state == "scheduled") {
                clearTimeout(that.timer3);
            }
            that.videoSwitched = true;
            that.timer3 = setTimeout( function() {
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

    getVideoData(): Video[] {
        return [
            {
                id: 1,
                title: "Introducing Daydream",
                desc: "Simple, high quality virtual reality",
                time: 1472914800, // 20160904
                src: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg"
            }, {
                id: 2,
                title: "Standalone VR headsets with Daydream",
                desc: "Experience Daydream standalone headsets built with our partners HTC VIVE",
                time: 1479049200, // 20161114
                src: "https://www.dothome.co.kr/static/images/main/main-slide10.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide10.jpg"
            }, {
                id: 3,
                title: "Lean more",
                desc: "a leader in VR, and Lenovo, a leader in mobile & computing innovation",
                time: 1484665200, // 20170118
                src: "https://www.dothome.co.kr/static/images/main/main-slide11.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide11.jpg"
            }, {
                id: 4,
                title: "More oooohs. Bigger ahhhhs",
                desc: "Explore new worlds, kick back in your personal VR cinema, and play games that put you in the center of the action",
                time: 1490626800, // 20170328
                src: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide4.jpg"
            }, {
                id: 5,
                title: "Get the latest news from the Google VR team",
                desc: "By clicking Sign Up",
                time: 1496415600, // 20170603
                src: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide3.jpg"
            }, {
                id: 6,
                title: "Google VR Blog",
                desc: "Product Safety, Warranty and Regulatory Information",
                time: 1500390000, // 20170719
                src: "https://www.dothome.co.kr/static/images/main/main-slide14.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide14.jpg"
            }, {
                id: 7,
                title: "Easy-to-use",
                desc: "Everything you need is built into the headset—just pick it up and hop right into VR",
                time: 1501513200, // 20170801
                src: "https://www.dothome.co.kr/static/images/main/main-slide15.jpg",
                alt: "https://www.dothome.co.kr/static/images/main/main-slide15.jpg"
            }
        ];
    }

    ngOnInit() {
    }
}

class Video {
    id: number;
    title: string;
    desc: string;
    time: number; // unix timestamp
    src: string; // video path
    alt: string; // Alternative image for error
}
