import {Component} from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {RelationshipService} from '../../services/relationship.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  code = '';

  constructor(private toastService: ToastService,
              private relationshipService: RelationshipService,
              private localStorageService: LocalStorageService,
              private router: Router) {

  }

  public doLogin(): void {
    if (!this.code) {
      this.toastService.showMessage('Please enter a valid code');
      return;
    }

    this.toastService.showMessage('Checking code ... ');

    this.relationshipService.loadRelationship(this.code).subscribe({
      next: (relationship) => {
        if (!relationship) {
          this.toastService.showMessage('Invalid code');
          return;
        }

        this.code = '';
        this.localStorageService.setRelationship(relationship);
        this.router.navigateByUrl('/relationship');
      },
      error: (error) => {
        this.toastService.showMessage('Code can not be checked. Check your network settings.');
        console.error(error);
      }
    });
  }

}
