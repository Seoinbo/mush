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
}
