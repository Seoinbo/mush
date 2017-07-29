import { Component, Input } from '@angular/core';

@Component({
    selector: '.box[data-type="b"]',
    templateUrl: './boxb.component.html'
})

export class BoxBComponent {
  @Input()
  title: string;

  @Input()
  date: string;

  @Input()
  image: string;
}
