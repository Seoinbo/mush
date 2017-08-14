import { Component } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: '.store',
  templateUrl: './store.component.html'
})

export class StoreComponent {
    private coverText: string = "ADD TO CART";
    private coverVisible: boolean[] = [false, false ,false];

    constructor(private storeService: StoreService) {
    }

    private add(event, id, count = 1) {
        this.storeService.incr(id, count);
        event.preventDefault();
    }

    private remove(event, id, count = 1) {
        this.storeService.decr(id, count);
        event.preventDefault();
    }

    private activeCover(index, text: string) {
        this.coverVisible[index] = true;
        this.coverText = text;
    }

    private inactiveCover(index) {
        this.coverVisible[index] = false;
    }

    get products(): any {
        return this.storeService.getProducts();
    }
}
