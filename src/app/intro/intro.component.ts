import { Component } from '@angular/core';
import { Windoc } from "../services/windoc";

@Component({
    selector: '.intro',
    templateUrl: './intro.component.html'
})

export class IntroComponent {
    private sectionHeight: number = 500;

    constructor(private windoc: Windoc) {
        let h = this.windoc.height;
        this.onChangeHeight(h);
    }

    onChangeHeight(h) {
        this.sectionHeight = h;
    }
}
