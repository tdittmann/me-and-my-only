import {Component, Input, OnInit} from '@angular/core';
import {timer} from 'rxjs';

@Component({
    selector: 'app-countdown',
    templateUrl: 'countdown.component.html',
    styleUrls: ['countdown.component.scss']
})
export class CountdownComponent implements OnInit {

    @Input() dateInMillis = 0;

    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;

    constructor() {

    }

    ngOnInit(): void {
        timer(0, 1000).subscribe(t => {
            const dateInSeconds = Math.floor(this.dateInMillis / 1000);
            const actualDateInSeconds = Math.floor(Date.now() / 1000);

            if (this.dateInMillis > 0) {
                this.calculateCountdown(actualDateInSeconds - dateInSeconds);
            }
        });
    }

    private calculateCountdown(inputSeconds: number) {
        const numSeconds = parseInt(inputSeconds.toString(), 10);
        this.days = Math.floor(numSeconds / 86400);
        this.hours = Math.floor((numSeconds - (this.days * 86400)) / 3600);
        this.minutes = Math.floor((numSeconds - (this.hours * 3600) - (this.days * 86400)) / 60);
        this.seconds = numSeconds - (this.days * 86400) - (this.hours * 3600) - (this.minutes * 60);
    }

}
