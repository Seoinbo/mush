import { Component } from '@angular/core';

import { DataService } from '../services/data.service';

@Component({
  selector: '.scrap',
  templateUrl: './scrap.component.html'
})

export class ScrapComponent {
    protected scraps: any[] = [];

    private dbOffset: number = 0;
    private dbLimit: number = 4;
    private artiCount: number = 0;
    private artiTotal: number = 0;

    private moreButtonVisible: boolean = true;

    constructor(private dataService: DataService) {
        this.artiTotal = this.dataService.count("scrap");
        this.loadDatabase();
    }

    loadDatabase(limit: number = this.dbLimit) {
        let data = this.dataService.get("scrap", this.dbOffset, limit);
        for (let row of data) {
            this.addItem(row);
        }
    }

    private loadMore(event) {
        event.preventDefault();
        this.loadDatabase();
    }

    addItem(item) {
        let ex: boolean = false;
        if (this.artiCount <= 0) {
            ex = true;
        }
        this.scraps.push({
            id: item.id,
            type: item.type,
            title: item.title,
            desc: item.desc,
            srctit: item.srctit,
            source: item.source,
            image: item.image,
            link: item.link,
            expended: ex
        });
        this.artiCount++;
        this.dbOffset++;

        if (this.artiCount >= this.artiTotal) {
            this.moreButtonVisible = false;
        }
    }

    private extend(event, index) {
        event.preventDefault();
        let len = this.scraps.length;
        for (let i = 0; i < len; i++) {
            if (i == index) {
                this.scraps[i].expended = true;
            } else {
                this.scraps[i].expended = false;
            }
        }
    }

    private shrink(event, index) {
        event.preventDefault();
        this.scraps[index].expended = false;
    }

    private toogle(event, index) {
        if (this.scraps[index].expended == false) {
            this.extend(event, index);
        } else {
            this.shrink(event, index);
        }
    }

}
