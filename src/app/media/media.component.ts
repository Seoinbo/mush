import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { BoxComponent } from './box.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DeviceService } from '../services/device.service';
import { DataService } from '../database/data.service';
import { MediaObj } from './mediaobj';

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
    private dbLimit: number = 10;

    protected boxes: MediaObj[] = [];
    private boxCount: number = 0;
    private loadingComplete: boolean = false; // 인스타그램 이미지 로딩 완료 여부

    // for animations
    private prevButtonViewState: string = 'inactive';
    private nextButtonViewState: string = 'inactive';

    constructor(private dataService: DataService, private deviceService: DeviceService) {
        this.isMobile = deviceService.isMobile;

        
        // this.changeTitle(0);
    }

    ngAfterViewInit() {
        this.loadDatabase();
    }

    private viewInit() {
        let that = this;

        // Initiate carousel.
        if (this.isMobile) {
            this.onChangeDeviceType('mobile');
        } else {
            this.onChangeDeviceType('desktop');
        }

        // 다음 버튼 초기 설정
        if (this.boxCount > 1) {
            this.nextButtonViewState = "active";
        }

        // Focus first slide.
        setTimeout( function() {
            that.focus(0);
        }, 500);
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
            centerMode: false,
            variableWidth: true
        });
    }

    loadDatabase(limit: number = this.dbLimit) {
        this.dataService.media(this.dbOffset, limit)
            .then(response => {
                let len = response.length;
                for (let item of response) {
                    this.addItem(new MediaObj(item));
                }

                // Init view
                let that = this;
                setTimeout( function() {
                    // 로딩 완료
                    that.loadingComplete = true;
                    that.viewInit();
                }, 50);

                
            });
            // .catch()
    }

    addItem(item: MediaObj) {
        this.boxes.push(item);
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
