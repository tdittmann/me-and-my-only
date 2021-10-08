import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage-angular';
import {LocalStorageService} from './services/local-storage.service';
import {ToastService} from './services/toast.service';

export function initStorage(localStorageService: LocalStorageService): () => Promise<void | any> {
    return (): Promise<void | any> => localStorageService.initStorage();
}

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        IonicStorageModule.forRoot(),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        LocalStorageService,
        ToastService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: APP_INITIALIZER, useFactory: initStorage, deps: [LocalStorageService], multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
