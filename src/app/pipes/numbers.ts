import { NgModule } from '@angular/core';
import { WithComma } from './numbers.pipe';

@NgModule({
    declarations: [
        WithComma
    ],
    exports: [
        WithComma
    ]
})
export class NumberPipes { }