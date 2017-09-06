import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { BoxComponent } from './box.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DeviceService } from '../services/device.service';
import { DataService } from '../database/data.service';

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
            state('active', style({
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

    // is mobile mode?
    protected isMobile = false;

    private dbOffset: number = 0;
    private dbLimit: number = 4;
    private preloadCount: number = 3;

    protected boxes: any[] = [];
    protected selected: any;
    private boxCount: number = 0;
    private picTitle: string = "";
    private picDate: string = "";
    private mainPicType: string = "wideType";

    // for animations
    private topPicinfoViewState: string = 'inactive';
    private mainPicinfoViewState: string = 'active';
    private prevButtonViewState: string = 'inactive';
    private nextButtonViewState: string = 'inactive';

    constructor(private dataService: DataService, private deviceService: DeviceService) {
        this.isMobile = deviceService.isMobile;

        this.loadDatabase();
        this.changeTitle(0);

        // 배경 텍스트의 크기 타입 설정
        if (this.boxes[0].type == 'a') {
            this.mainPicType = 'wideType';
        } else {
            this.mainPicType = 'halfType';
        }

        // 다음 버튼 초기 설정
        if (this.boxes.length > 1) {
            this.nextButtonViewState = "active";
        }
    }

    ngAfterViewInit() {
        let that = this;

        // Initiate carousel.
        if (this.isMobile) {
            this.onChangeDeviceType('mobile');
        } else {
            this.onChangeDeviceType('desktop');
        }

        // Focus first slide.
        setTimeout( function() {
            that.focus(0);
        }, 2000);
    }

    initSlick(options) {
        let that = this;
        let $carousel = $(".carousel");
        options.infinite = false;
        options.prevArrow = ".media .nav .buttons .prev";
        options.nextArrow = ".media .nav .buttons .next";
        if ($carousel.hasClass("slick-initialized")) {
            $carousel.slick("unslick");
        }
        $carousel.slick(options).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            // Toggle visiblity for the picinfo top.
            if (nextSlide <= 0 || nextSlide >= that.boxCount -1) {
                that.topPicinfoViewState = 'inactive';
                that.mainPicinfoViewState = 'active';
            } else {
                that.topPicinfoViewState = 'active';
                that.mainPicinfoViewState = 'inactive';
            }

            // Toggle visiblity for the next and prev buttons.
            if (nextSlide <= 0) {
                that.prevButtonViewState = "inactive";
            } else if (nextSlide >= that.boxCount -1) {
                that.nextButtonViewState = "inactive";
            } else {
                that.prevButtonViewState = "active";
                that.nextButtonViewState = "active";
            }

        }).on("afterChange", function (event, slick, currentSlide) {
            // Load more boxes.
            if (currentSlide + 1 + that.preloadCount >= that.boxCount) {
                that.loadDatabase(2);
                setTimeout(function () {
                    slick.reinit();
                }, 250);
            }
            that.changeTitle(currentSlide);
        });
    }

    slickMobile() {
        this.initSlick({
            centerMode: false,
            variableWidth: false
        });
    }

    slickDesktop() {
        this.initSlick({
            centerMode: true,
            variableWidth: true
        });
    }

    loadDatabase(limit: number = this.dbLimit) {
        let data = this.dataService.get("media", this.dbOffset, limit);
        for (let row of data) {
            this.addItem(row);
        }
    }

    addItem(item) {
        this.boxes.push({
            id: item.id,
            type: item.type,
            image: item.image,
            video: item.video,
            title: item.title,
            desc: item.desc,
            date: this.dateFormat(item.time)
        });
        this.boxCount++;
        this.dbOffset++;
    }

    changeTitle(i) {
        this.selected = this.boxes[i];
        if (i <= 0) {
            this.picTitle = this.boxes[i+1].title;
            this.picDate = this.boxes[i+1].date;
        } else {
            if (this.topPicinfoViewState == 'inactive') {
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
        // Move to the slide.
        $(".carousel").slick("slickGoTo", index);

        return false;
    }

    dateFormat(time): string {
        var date = moment(time * 1000);
        return date.format("YYYY.MM");
    }

    onChangeDeviceType(deviceType: string) {
        // Reinitiate carousel.
        if (deviceType == "mobile") {
            this.isMobile = true;
            this.slickMobile();
        } else {
            this.isMobile = false;
            this.slickDesktop();
        }
    }
}
