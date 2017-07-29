import { Component, Input } from '@angular/core';

@Component({
    selector: '.box[data-type="d"]',
    templateUrl: './boxd.component.html'
})

export class BoxDComponent {
  @Input()
  title: string;

  @Input()
  date: string;

  @Input()
  image: string;
}
