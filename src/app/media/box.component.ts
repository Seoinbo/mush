import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'div.box',
    templateUrl: './box.component.html',
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
    private coverImageViewStates: string[] = ["active", "active"];

    // Timers
    private playTimer;
    private stopTimer;
    private coverHideTimer;

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
                        that.hideCover();
                    }, 600);
                }, 800);
            } else {
                player.playVideo();
                that.coverHideTimer = setTimeout( function() {
                    that.hideCover();
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
            that.showCover();
            that.stopTimer = setTimeout( function () {
                player.stopVideo();
            }, 650);
        });
    }

    hideCover() {
        for (let i = 0; i < 2; i++) {
            if (this.players[i]) {
                this.coverImageViewStates[i] = "inactive";
            }
        }
    }

    showCover() {
        for (let i = 0; i < 2; i++) {
            if (this.players[i]) {
                this.coverImageViewStates[i] = "active";
            }
        }
    }


}
