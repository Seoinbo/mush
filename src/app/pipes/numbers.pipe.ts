import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: "withComma"})
export class WithComma implements PipeTransform {
    transform(value: number): string {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}