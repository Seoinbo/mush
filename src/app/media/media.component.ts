import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { BoxComponent } from './box.component';
import { HeaderComponent } from '../header/header.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Data } from '../data';

declare const moment: any;
declare const $: any;

@Component({
    selector: '.media',
    templateUrl: './media.component.html',
    animations: [
        trigger('viewState', [
            state('inactive', style({
                opacity: 0
            })),
            state('active',   style({
                opacity: 1
            })),
            transition('inactive => active', animate('350ms ease')),
            transition('active => inactive', animate('350ms ease'))
        ])
    ]
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
    protected picTitle: string = "";
    protected picDate: string = "";

    private bgTextType: string = "wideType";

    // for animations
    private viewState: string = 'inactive';
    private navHidden: boolean = false;

    constructor() {
        this.loadData();
        this.selectItem(0);

        // 배경 텍스트의 크기 타입 설정
        if (this.boxes[0].type == 'a') {
            this.bgTextType = 'wideType';
        } else {
            this.bgTextType = 'halfType';
        }
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
                that.viewState = 'inactive';
                $("header").removeClass("hidden");
            } else {
                that.viewState = 'active';
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
            desc: item.desc,
            date: this.dateFormat(item.time)
        });
        this.boxCount++;
        this.dbOffset++;
    }

    selectItem(i) {
        this.selected = this.boxes[i];
        if (i <= 0) {
            this.picTitle = this.boxes[i+1].title;
            this.picDate = this.boxes[i+1].date;
        } else {
            if (this.viewState == 'inactive') {
                return;
            }
            this.picTitle = this.selected.title;
            this.picDate = this.selected.date;
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
        this.selectItem(index);
        return false;
    }

    dateFormat(time): string {
        var date = moment(time * 1000);
        return date.format("YYYY.MM");
    }
}
