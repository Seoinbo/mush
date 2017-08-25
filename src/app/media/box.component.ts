import { Component, Input, HostBinding } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Ng2DeviceService } from 'ng2-device-detector';
import { Windoc } from "../services/windoc";

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

    private isMobile: boolean = false;
    private boxHeight: number = 550;

    // via Youtube iframe API
    protected players: YT.Player[] = [];
    private playerOptions: any = {
        controls: 0,
        fs: 0,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: 0
    }
    private playerReady: boolean[] = [false, false];

    // for animations
    private coverViewStates: string[] = ["active", "active"];
    private coverImageViewStates: string[] = ["active", "active"];

    // Timers
    private playTimer;
    private stopTimer;
    private coverHideTimer;

    constructor (private windoc: Windoc, private deviceService: Ng2DeviceService) {
        let deviceInfo = this.deviceService.getDeviceInfo();
        if (["android", "iphone"].indexOf(deviceInfo.device) > -1) {
            this.boxHeight = this.windoc.height;
            this.isMobile = true;
        }
    }

    setPlayer(p: YT.Player, i: number) {
        this.players[i] = p;
        p.cuePlaylist(this.args.videos[i]);
        p.setLoop(true);
        p.mute();
    }

    onStateChange(event, i: number) {
        if (event.data == -1) {
            this.playerReady[i] = true;
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

        let that = this;
        this.players.forEach( function(player, i) {
            if (that.playerReady[i] == false) {
                that.playTimer = setTimeout( function() {
                    player.playVideo();
                    that.playerReady[i] = true;
                    that.coverHideTimer = setTimeout( function() {
                        that.hideCoverImage();
                    }, 600);
                }, 800);
            } else {
                player.playVideo();
                that.coverHideTimer = setTimeout( function() {
                    that.hideCoverImage();
                }, 600);
            }
        });
    }

    pause() {
        this.players.forEach( function(player) {
            player.pauseVideo();
        });
    }

    stop() {
        // Stop duplicated timer
        clearTimeout(this.playTimer);
        clearTimeout(this.coverHideTimer);

        let that = this;
        this.players.forEach( function(player) {
            that.showCoverImage();
            that.stopTimer = setTimeout( function () {
                player.stopVideo();
            }, 650);
        });
    }

    mouseOver(i) {
        this.coverViewStates[i] = "inactive";
    }

    mouseOut() {
        for (let i = 0; i < 2; i++) {
            this.coverViewStates[i] = "active";
        }
    }

    hideCoverImage() {
        for (let i = 0; i < 2; i++) {
            if (this.players[i]) {
                this.coverImageViewStates[i] = "inactive";
            }
        }
    }

    showCoverImage() {
        for (let i = 0; i < 2; i++) {
            if (this.players[i]) {
                this.coverImageViewStates[i] = "active";
            }
        }
    }


}
