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
    private boxCount: number = 0;

    constructor(private dataService: DataService) {
        this.loadDatabase();
    }

    loadDatabase(limit: number = this.dbLimit) {
        let data = this.dataService.get("scrap", this.dbOffset, limit);
        for (let row of data) {
            this.addItem(row);
        }
    }

    addItem(item) {
        this.scraps.push({
            id: item.id,
            type: item.type,
            title: item.title,
            desc: item.desc,
            srctit: item.srctit,
            source: item.source,
            image: item.image,
            link: item.link
        });
        this.boxCount++;
        this.dbOffset++;
    }

}
