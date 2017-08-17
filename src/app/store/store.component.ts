import { Component } from '@angular/core';
import { StoreService } from './store.service';

@Component({
  selector: '.store',
  templateUrl: './store.component.html'
})

export class StoreComponent {
    private coverText: string = "ADD TO CART";
    private coverVisible: boolean[] = [false, false ,false];
    private now: number = Math.round(new Date().getTime() / 1000);

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

    // 몇 개월/일 전 표기
    protected remains(index): string {
        let product = this.products[index];
        let remain = product.readytime - this.now;
        if (remain < 0) {
            remain = 0;
            return "다음 판매 시까지 기다려주세요"
        }
        let d = Math.floor(remain / (60 * 60 * 24))
        let m = Math.floor(d / 30);
        let date = "";
        if (m > 0) {
            date = m + "개월";
        } else {
            if (d > 0) {
                date = d + "일";
            } else {
                return "곧 판매가 시작됩니다"
            }
        }

        return "다음 판매 시까지 " + date + " 남음";
    }
}
