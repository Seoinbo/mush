import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class Windoc {
    constructor( @Inject(DOCUMENT) private _document: Document) {

    }

    window(): Window {
        return window;
    }

    document(): Document {
        return this._document;
    }

    windowHeight(): number {
        var body = this._document.body;
        var html = this._document.documentElement;
        var height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.clientHeight,
            html.scrollHeight,
            html.offsetHeight);
        return height;
    }
}
