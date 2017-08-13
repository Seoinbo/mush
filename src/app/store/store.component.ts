import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: '.store',
  templateUrl: './store.component.html'
})

export class StoreComponent {
    protected products: any[] = [];

    constructor(private dataService: DataService) {
        this.loadDatabase();
    }

    loadDatabase() {
        let data = this.dataService.get("products");
        for (let row of data) {
            this.addItem(row);
        }
    }

    addItem(item) {
        this.products.push({
            id: item.id,
            title: item.title,
            image: item.image,
            oprice: this.numberWithCommas(item.oprice),
            price: this.numberWithCommas(item.price),
            soldout: item.soldout == 1 ? true : false,
            quantity: 0 // 상품 담은 개수
        });
    }

    private add(event, id, count = 1) {
        let len = this.products.length;
        for (let i = 0; i < len; i++) {
            let product = this.products[i];
            if (product.id == id) {
                product.quantity += count;
                if (product.quantity < 0) {
                    product.quantity = 0;
                } else if (product.quantity >= 50) {
                    product.quantity = 50;
                }
                break;
            }
        }
        event.preventDefault();
    }

    private remove(event, id, count = 1) {
        this.add(event, id, count * -1);
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
