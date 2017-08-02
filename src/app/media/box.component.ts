import { Component, Input } from '@angular/core';

@Component({
    selector: 'div.box',
    templateUrl: './box.component.html'
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

    private coverHidden: boolean[] = [false, false, false];
    private playerReady: boolean[] = [false, false, false];

    setPlayer(p: YT.Player, i: number) {
        let that = this;
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
        let that = this;
        this.players.forEach( function(player, i) {
            if (that.playerReady[i] == false) {
                setTimeout( function() {
                    player.playVideo();
                    that.playerReady[i] = true;
                }, 500);
                setTimeout( function() {
                    that.hideCover();
                }, 1500);
            } else {
                player.playVideo();
                setTimeout( function() {
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
        let that = this;
        this.players.forEach( function(player) {
            that.showCover();
            setTimeout( function () {
                player.stopVideo();
            }, 650);
        });
    }

    hideCover() {
        for (let i = 0; i < 3; i++) {
            if (this.players[i]) {
                this.coverHidden[i] = true;
            }
        }
    }

    showCover() {
        for (let i = 0; i < 3; i++) {
            if (this.players[i]) {
                this.coverHidden[i] = false;
            }
        }
    }


}
