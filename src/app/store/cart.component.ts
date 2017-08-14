import { Component } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: '.cart',
  templateUrl: './cart.component.html'
})

export class CartComponent {

    constructor(private storeService: StoreService) {
    }

    private get discount(): number {
        return 0;
    }
}
