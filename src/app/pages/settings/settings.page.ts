import {Component, OnInit} from '@angular/core';
import {Relationship} from '../../entities/Relationship';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';
import {ToastService} from '../../services/toast.service';
import {RelationshipService} from '../../services/relationship.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnInit {

  relationship: Relationship;
  anniversaryDateTime: string = new Date().toISOString();
  showQuoteOfTheDay: boolean;

  constructor(private localStorageService: LocalStorageService,
              private relationshipService: RelationshipService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit(): void {
    // Load relationship
    this.localStorageService.loadRelationship().then(
        (relationship) => {
          if (!relationship) {
            this.toastService.showMessage('Can not load data. Please login again');
            this.router.navigateByUrl('/login');
            return;
          }

          this.relationship = relationship;
          this.anniversaryDateTime = this.convertToIso8601(this.relationship.anniversary);
        }
    );

    this.localStorageService.getShowQuote().then(
        (result) => {
          this.showQuoteOfTheDay = result;
        }
    );

  }

  public updateImage(image: string): void {
    this.relationship.image = image;
  }

  public save() {
    this.relationship.anniversary = this.convertToTimestamp(this.anniversaryDateTime);

    // Update local storage
    this.localStorageService.setRelationship(this.relationship);
    this.localStorageService.setShowQuote(this.showQuoteOfTheDay);

    // Update data in backend
    this.relationshipService.saveRelationship(this.relationship)
        .subscribe({
          next: result => this.toastService.showMessage('Settings successfully saved. Restart the application'),
          error: error => {
            this.toastService.showMessage('Settings just saved local. Please try again.');
            console.error(error);
          }
        });

    // Go back to relationship view
    this.router.navigateByUrl('/relationship');
  }

  public cancel() {
    this.router.navigateByUrl('/relationship');
  }

  public resetApp() {
    this.localStorageService.reset();
    this.router.navigateByUrl('/');
  }

  private convertToIso8601(timestamp: number): string {
    return new Date(parseInt(timestamp.toString(), 10)).toISOString();
  }

  private convertToTimestamp(iso8601string: string): number {
    return new Date(iso8601string).getTime();
  }

}
