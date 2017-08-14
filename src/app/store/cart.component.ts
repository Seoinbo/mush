import { Component } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: '.cart',
  templateUrl: './cart.component.html'
})

export class CartComponent {
    constructor(private storeService: StoreService) {
    }

    private get products(): any {
        return this.storeService.getProducts();
    }

    // Sum of all product price.
    private get price(): number {
        let sum: number = 0;
        let len = this.products.length;
        for (let i = 0; i < len; i++) {
            let product = this.products[i];
            sum += product.quantity * product.oprice;
        }
        if (sum < 0) {
            sum = 0;
        }
        return sum;
    }

    private get discount(): number {
        let sum: number = 0;
        let len = this.products.length;
        for (let i = 0; i < len; i++) {
            let product = this.products[i];
            sum += (product.oprice - product.price) * product.quantity;
        }
        if (sum < 0) {
            sum = 0;
        }
        return sum;
    }

    private get shipping(): number {
        if (this.price > 0) {
            let shipping = this.storeService.shipping;
            if (this.price < shipping.cutline) {
                return shipping.fee;
            }
        }
        return 0;
    }

    private get total(): number {
        let total = this.price - this.discount + this.shipping;
        if (total < 0) {
            total = 0;
        }
        return total;
    }
}
