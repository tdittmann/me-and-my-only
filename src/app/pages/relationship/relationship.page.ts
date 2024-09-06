import {Component, OnInit} from '@angular/core';
import {Relationship} from '../../entities/Relationship';
import {Quote} from '../../entities/Quote';
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

  constructor(private relationshipService: RelationshipService,
              private quoteService: QuoteService) {
  }

  ngOnInit(): void {

    // First load data
    this.loadRelationship();

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

  public getChildEmoji(sex: 'male' | 'female') {
    switch (sex) {
      case 'male': return '👦';
      case 'female': return '👧';
      default: return '🧒';
    }
  }

  private loadRelationship() {
    this.relationshipService.loadRelationship().subscribe({
      next: (relationship) => {
        if (!relationship) {
          return;
        }

        this.relationship = relationship;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  private loadQuoteOfTheDay() {
    this.quoteService.loadQuote().subscribe({
      next: (quote) => {
        console.log(quote);
        this.quoteOfTheDay = quote;
      },
      error: (error) => {
        console.error(error);
      }
    });
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
