import { Component, Input } from '@angular/core';

export class BoxComponent {
    @Input()
    args: any;

    playerOptions: any = {
        controls: 0,
        fs: 0,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        autoplay: 1
    }
}
