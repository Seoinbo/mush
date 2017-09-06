import { Component, Input, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { DeviceService } from '../services/device.service';
import { Windoc } from '../services/windoc';

@Component({
    selector: 'div.box',
    templateUrl: './box.component.html',
    host: {
        '[style.height]': 'boxHeight + "px"'
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
    args: any;

    private boxWidth: number = 890;
    private boxHeight: number = 550;

    // via Youtube iframe API
    protected players: YT.Player[] = [];
    protected player: YT.Player;
    private playerOptions: any = {
        controls: 0,
        fs: 0,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: 0
    }
    private playerReady: boolean = false;

    // for animations
    private coverViewState: string = "inactive";
    private coverImageViewState: string = "active";

    // Timers
    private playTimer;
    private stopTimer;
    private coverHideTimer;

    constructor (private windoc: Windoc, private deviceService: DeviceService) {
        if (deviceService.isMobile) {
            this.boxHeight = this.windoc.height;
        }
    }

    ngAfterContentInit() {
        if (this.args.type == "b") {
            this.boxWidth = 440;
        }
    }

    setPlayer(p: YT.Player) {
        p.cuePlaylist(this.args.videos);
        p.setLoop(true);
        p.mute();
        this.player = p;
    }

    onStateChange(event) {
        if (event.data == -1) {
            this.playerReady = true;
        }
    }

    focusIn () {
        this.play();
    }

    focusOut () {
        this.stop();
    }

    play() {
        // Stop duplicated timer
        clearTimeout(this.stopTimer);
        if (!this.player) {
            return;
        }

        var that = this;
        if (this.playerReady == false) {
            this.playTimer = setTimeout( function() {
                that.player.playVideo();
                that.playerReady = true;
                that.coverHideTimer = setTimeout( function() {
                    that.hideCoverImage();
                }, 600);
            }, 800);
        } else {
            this.player.playVideo();
            this.coverHideTimer = setTimeout( function() {
                that.hideCoverImage();
            }, 600);
        }
    }

    pause() {
        if (!this.player) {
            return;
        }
        this.player.pauseVideo();
    }

    stop() {
        // Stop duplicated timer
        clearTimeout(this.playTimer);
        clearTimeout(this.coverHideTimer);
        if (!this.player) {
            return;
        }

        let that = this;
        this.showCoverImage();
        this.stopTimer = setTimeout( function () {
            that.player.stopVideo();
        }, 650);
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
        if (this.player) {
            this.coverImageViewState = "inactive";
        }
    }

    showCoverImage() {
        if (this.player) {
            this.coverImageViewState = "active";
        }
    }


}
