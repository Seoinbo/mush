import { Injectable  } from '@angular/core';
import { DataService } from '../services/data.service';

@Injectable()
export class StoreService {
    private products: any[] = [];
    private maxOrderCount: number = 50; // 상품주문 제한

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
            oprice: item.oprice,
            price: item.price,
            soldout: item.soldout == 1 ? true : false,
            quantity: 0 // 상품 담은 개수
        });
    }

    incr(id, count = 1) {
        let len = this.products.length;
        for (let i = 0; i < len; i++) {
            let product = this.products[i];
            if (product.id == id) {
                product.quantity += count;
                if (product.quantity < 0) {
                    product.quantity = 0;
                } else if (product.quantity >= this.maxOrderCount) {
                    product.quantity = this.maxOrderCount;
                }
                break;
            }
        }
    }

    decr(id, count = 1) {
        this.incr(id, count * -1);
    }

    getProducts(): any[] {
        return this.products;
    }
}
