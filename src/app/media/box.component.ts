import { Component, Input, HostBinding, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DeviceService } from '../services/device.service';
import { Windoc } from '../services/windoc';
import { MediaObj } from './mediaobj';

@Component({
    selector: 'div.box',
    templateUrl: './box.component.html',
    host: {
        '[style.width]': 'mediaObj.width + "px"',
        '[style.height]': 'mediaObj.height + "px"'
    },
    animations: [
        trigger('fade', [
            state('inactive', style({
                opacity: 0
            })),
            state('active',   style({
                opacity: 1
            })),
            transition('inactive => active', animate('600ms ease')),
            transition('active => inactive', animate('600ms ease'))
        ])
    ]
})

export class BoxComponent {
    @Input()
    mediaObj: MediaObj;

    private boxWidth: number = 857;
    private boxHeight: number = 530;

    // via video
    protected player;

    // for animations
    private coverViewState: string = "inactive";
    private coverImageViewState: string = "active";

    constructor (
        private elementRef:ElementRef, 
        private windoc: Windoc, 
        private deviceService: DeviceService) {
        if (deviceService.isMobile) {
            this.boxHeight = this.windoc.height;
        }
    }

    ngAfterViewInit() {
              // init video player.
        let that = this;
        this.player = this.elementRef.nativeElement.querySelector('video');
        if (!this.player) {
            return;
        }
        setTimeout( function () {
            that.player.play();
        }, 100);
        this.player.addEventListener("playing", function() {
            that.hideCoverImage();
        });
    }

    focusIn () {
        // this.play();
    }

    focusOut () {
        // this.stop();
        // this.mouseOut();
    }

    play() {
        if (!this.player) {
            return;
        }
        this.player.play();
    }

    pause() {
        if (!this.player) {
            return;
        }
        this.player.pause();
    }

    stop() {
        if (!this.player) {
            return;
        }
        this.player.stop();
    }

    mouseOver() {
        if (this.deviceService.isMobile) {
            return false;
        }
        this.coverViewState = "active";
    }

    mouseOut() {
        this.coverViewState = "inactive";
    }

    hideCoverImage() {
        this.coverImageViewState = "inactive";
    }

    showCoverImage() {
        this.coverImageViewState = "active";
    }


}
