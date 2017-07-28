import { Component, Input } from '@angular/core';

@Component({
    selector: '.box[data-type="a"]',
    templateUrl: './boxa.component.html'
})

export class BoxAComponent {
  @Input()
  title: string;

  @Input()
  date: string;

  @Input()
  image: string;
}
