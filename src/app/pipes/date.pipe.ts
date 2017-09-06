import { Pipe, PipeTransform } from '@angular/core';

declare const moment: any;

@Pipe({name: "dateFormat"})
export class DateFormat implements PipeTransform {
    transform(unix_timestamp: number): string {
        var date = moment(unix_timestamp * 1000);
        return date.format("YYYY.MM");
    }
}