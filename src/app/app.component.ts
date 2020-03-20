import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {LocalStorageService} from './services/local-storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(private platform: Platform,
                private splashScreen: SplashScreen,
                private statusBar: StatusBar,
                private localStorageService: LocalStorageService,
                private router: Router) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            // Navigate to relationship page if already existing in local storage
            this.localStorageService.loadRelationship().then(
                (relationship) => {
                    if (relationship) {
                        this.router.navigateByUrl('/relationship');
                    }
                }
            );

            // Set initial settings
            this.localStorageService.getShowQuote().then(
                (showQuote) => {
                    if (showQuote == null) {
                        this.localStorageService.setShowQuote(true);
                    }
                }
            );
        });
    }
}
