import { Injectable  } from '@angular/core';

@Injectable()
export class TooltipService {
    id: string;
    maxWidth: string;
    top: string;
    right: string;
    bottom: string;
    left: string;
    title: string = "";
    desc: string = "";
    zIndex: number;
    position: string;

    visible: boolean = false;
    closebtn: boolean = true;

    constructor() {

    }

    show(args: any) {
        this.visible = true;
        if (args == undefined) {
            return;
        }
        this.id = args.id != undefined ? args.id : this.id;
        this.maxWidth = args.maxWidth != undefined ? args.maxWidth : "250px";
        this.top = args.top != undefined ? args.top : "unset";
        this.right = args.right != undefined ? args.right : "unset";
        this.bottom = args.bottom != undefined ? args.bottom : "unset";
        this.left = args.left != undefined ? args.left : "unset";
        this.title = args.title != undefined ? args.title : "";
        this.desc = args.desc != undefined ? args.desc : "";
        this.closebtn = args.closebtn != undefined ? args.closebtn :  true;
        this.zIndex = args.zIndex != undefined ? args.zIndex :  100;
        this.position = args.position != undefined ? args.position : "absolute";
    }

    hide() {
        this.visible = false;
    }

    toggle(args: any) {
        if (!this.visible || this.id != args.id) {
            this.show(args);
        } else {
            this.hide();
        }
    }
}
