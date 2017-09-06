import { Injectable  } from '@angular/core';
import { DataService } from '../database/data.service';

@Injectable()
export class HeaderService {
    private _menu: any[] = [];

    constructor(private dataService: DataService) {
        this.loadDatabase();
    }

    loadDatabase() {
        let data = this.dataService.get("menu");
        for (let row of data) {
            this.addItem(row);
        }
    }

    addItem(item) {
        this._menu.push({
            id: item.id,
            title: item.title,
            href: item.href,
            target: item.target,
            selected: item.selected
        });
    }

    get menu(): any[] {
        return this._menu;
    }
}
