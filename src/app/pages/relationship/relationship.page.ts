import {Component, OnInit} from '@angular/core';
import {Relationship} from '../../entities/Relationship';
import {Quote} from '../../entities/Quote';
import {LocalStorageService} from '../../services/local-storage.service';
import {ToastService} from '../../services/toast.service';
import {Router} from '@angular/router';
import {QuoteService} from '../../services/quote.service';
import {timer} from 'rxjs';
import {RelationshipService} from '../../services/relationship.service';

@Component({
    selector: 'app-relationship',
    templateUrl: 'relationship.page.html',
    styleUrls: ['relationship.page.scss'],
})
export class RelationshipPage implements OnInit {

    relationship: Relationship;
    quoteOfTheDay: Quote;
    heartCssClass = 'smallHeart';

    constructor(private localStorageService: LocalStorageService,
                private relationshipService: RelationshipService,
                private toastService: ToastService,
                private quoteService: QuoteService,
                private router: Router) {
    }

    ngOnInit(): void {

        // First load data from local storage...
        // ... and then check if there is a new update in remote db (if so: save in local storage)
        this.loadRelationshipFromLocalStorage();

        // Load quote of the day
        this.loadQuoteOfTheDay();

        // Start heartbeat
        this.heartbeat();
    }

    public getBackgroundImage(image: string) {
        if (!image) {
            return null;
        }

        return 'url("data:image/gif;base64,' + image + '")';
    }

    public refresh() {
        window.location.reload();
    }

    private loadRelationshipFromLocalStorage() {
        this.localStorageService.loadRelationship().then(
            (relationship) => {
                if (!relationship) {
                    this.toastService.showMessage('Can not load data. Please login again');
                    this.router.navigateByUrl('/login');
                    return;
                }

                this.relationship = relationship;

                // Check if there is a newer version in db
                this.loadRelationshipFromDb();
            },
            (error) => {
                this.toastService.showMessage('Can not load data. Please check your network connection.');
                console.error(error);
            }
        );
    }

    private loadRelationshipFromDb() {
        this.relationshipService.loadRelationship(this.relationship.code).subscribe({
            next: (relationship) => {
                if (!relationship) {
                    return;
                }

                if (!this.relationship.lastUpdate || this.relationship.lastUpdate < relationship.lastUpdate) {
                    this.relationship = relationship;
                    this.localStorageService.setRelationship(relationship);
                }
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    private loadQuoteOfTheDay() {
        this.localStorageService.getShowQuote().then(
            (showQuote) => {
                if (showQuote) {

                    this.quoteService.loadQuote().subscribe({
                        next: (quote) => {
                            console.log(quote);
                            this.quoteOfTheDay = quote;
                        },
                        error: (error) => {
                            this.toastService.showMessage('Can\'t load quote. Check your network connection.');
                            console.error(error);
                        }
                    });

                }
            }
        );
    }

    private heartbeat() {
        timer(0, 2000).subscribe(t => {
            if (this.heartCssClass === 'smallHeart') {
                this.heartCssClass = 'bigHeart';
            } else {
                this.heartCssClass = 'smallHeart';
            }
        });
    }

}
