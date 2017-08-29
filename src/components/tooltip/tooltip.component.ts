import { Component, HostListener } from '@angular/core';
import { TooltipService } from './tooltip.service';


@Component({
    selector: '.ng-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    host: {
        '[style.position]': 'tooltipService.position',
        '[style.z-index]': 'tooltipService.zIndex',
        '[style.max-width]': 'tooltipService.maxWidth',
        '[style.top]': 'tooltipService.top',
        '[style.right]': 'tooltipService.right',
        '[style.bottom]': 'tooltipService.bottom',
        '[style.left]': 'tooltipService.left',
        '[style.display]': 'tooltipService.visible ? "block" : "none"'
    }
})

export class TooltipComponent {
    constructor(private tooltipService: TooltipService) {

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.tooltipService.hide();
    }

    private hide(event) {
        event.preventDefault();
        this.tooltipService.hide();
    }
}
