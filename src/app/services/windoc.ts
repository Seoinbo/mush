import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class Windoc {
    constructor( @Inject(DOCUMENT) private _document: Document) {

    }

    get window(): Window {
        return window;
    }

    get document(): Document {
        return this._document;
    }

    get width(): number {
        let w = this.window,
            d = this.document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];
        return  w.innerWidth || e.clientWidth || g.clientWidth;
    }

    get height(): number {
        let w = this.window,
            d = this.document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];
        return w.innerHeight|| e.clientHeight|| g.clientHeight;
    }

    // return mouse position
    pageXY(event) {
        let x = 0,
            y = 0;
        if (event.pageX == null && event.clientX != null ) {
            var doc = document.documentElement, body = document.body;
            x = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            y = event.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc   && doc.clientTop  || body && body.clientTop  || 0);
        } else {
            x = event.pageX;
            y = event.pageY;
        }
        return {x: x, y: y};
    }
}
