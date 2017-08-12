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
            soldout: item.soldout == 1 ? true : false
        });
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
