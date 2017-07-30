import { Component, Input } from '@angular/core';

@Component({
    selector: '.box[data-type="a"]',
    templateUrl: './boxa.component.html'
})

export class BoxAComponent {
  @Input()
  args: any;
}
