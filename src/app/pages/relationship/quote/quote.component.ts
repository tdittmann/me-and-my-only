import {Component, Input} from '@angular/core';
import {Quote} from '../../../entities/Quote';

@Component({
    selector: 'app-quote',
    templateUrl: 'quote.component.html',
    styleUrls: ['quote.component.scss']
})
export class QuoteComponent {

    @Input() quote: Quote;

    constructor() {

    }

}
