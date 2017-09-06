import { NgModule } from '@angular/core';
import { DateFormat } from './date.pipe';

@NgModule({
    declarations: [
        DateFormat
    ],
    exports: [
        DateFormat
    ]
})
export class DatePipes { }