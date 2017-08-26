import { Component } from '@angular/core';
import { StoreService } from './store.service';
import { DeviceService } from '../services/device.service';

@Component({
  selector: '.store',
  templateUrl: './store.component.html'
})

export class StoreComponent {
    private coverText: string[] = ["", "", ""];
    private coverVisible: boolean[] = [false, false ,false];
    private now: number = Math.round(new Date().getTime() / 1000);

    constructor(private storeService: StoreService, private deviceService: DeviceService) {
    }

    private add(event, index, count = 1) {
        let product = this.products[index];
        if (product.soldout) {
            return;
        }
        this.storeService.incr(product.id, count);
        event.preventDefault();
    }

    private remove(event, index, count = 1) {
        let product = this.products[index];
        if (product.soldout) {
            return;
        }
        this.storeService.decr(product.id, count);
        event.preventDefault();
    }

    private activeCover(index, text: string) {
        if (this.deviceService.isMobile) {
            return false;
        }
        let product = this.products[index];
        this.coverVisible[index] = true;
        if (product.soldout) {
            this.coverText[index] = "품절";
        } else {
            this.coverText[index] = text;
        }
    }

    private inactiveCover(index) {
        this.coverVisible[index] = false;
    }

    private get products(): any {
        return this.storeService.getProducts();
    }

    private get shipping(): number {
        let shipping = this.storeService.shipping;
        if (shipping.fee <= 0) {
            return 3500;
        }
        return shipping.fee;
    }

    // 몇 개월/일 전 표기
    private remains(index): string {
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
