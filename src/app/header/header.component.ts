import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    @Output() onShow: EventEmitter<any> = new EventEmitter();
    @Output() onHide: EventEmitter<any> = new EventEmitter();

    private visibility: boolean = false;

    show() {
        this.visibility = true;
        this.onShow.emit(this.visibility);
    }

    hide() {
        this.visibility = false;
        this.onHide.emit(this.visibility);
    }

}
