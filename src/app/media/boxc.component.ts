import { Component, Input } from '@angular/core';

@Component({
    selector: '.box[data-type="c"]',
    templateUrl: './boxc.component.html'
})

export class BoxCComponent {
  @Input()
  args: any;
}
