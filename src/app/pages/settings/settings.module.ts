import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {SettingsPage} from './settings.page';
import {RelationshipService} from '../../services/relationship.service';
import {ImagePickerComponent} from './image-picker/image-picker.component';
import {Camera} from '@ionic-native/camera/ngx';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: SettingsPage
            }
        ])
    ],
    providers: [
        RelationshipService,
        Camera
    ],
    declarations: [SettingsPage, ImagePickerComponent]
})
export class SettingsPageModule {
}
