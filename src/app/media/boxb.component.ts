import { Component, Input } from '@angular/core';

@Component({
    selector: '.box[data-type="b"]',
    templateUrl: './boxb.component.html'
})

export class BoxBComponent {
  @Input()
  args: any;
}
