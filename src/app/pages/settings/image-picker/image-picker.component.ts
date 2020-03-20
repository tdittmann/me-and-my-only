import {Component, Input} from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {ToastService} from '../../../services/toast.service';
import {Camera} from '@ionic-native/camera/ngx';
import {CameraOptions} from '@ionic-native/camera';

@Component({
    selector: 'app-image-picker',
    templateUrl: 'image-picker.component.html',
    styleUrls: ['image-picker.component.scss']
})
export class ImagePickerComponent {

    @Input() base64image: any;

    constructor(private actionSheetCtrl: ActionSheetController,
                private camera: Camera,
                private toastService: ToastService) {

    }

    public async presentActionSheet() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Select source',
            buttons: [
                {
                    text: 'Load from Library',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: 'Use Camera',
                    handler: () => {
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        await actionSheet.present();
    }

    private takePicture(pSourceType) {
        // Create options for the Camera Dialog
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: pSourceType,
        };

        // Get the data of an image
        this.camera.getPicture(options)
            .then(
                base64image => {
                    this.base64image = base64image;
                },
                err => {
                    this.toastService.showMessage('Error while selecting image');
                    console.error(err);
                });
    }
}
