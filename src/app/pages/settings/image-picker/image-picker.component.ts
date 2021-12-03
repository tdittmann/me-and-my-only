import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Camera, CameraResultType, Photo} from '@capacitor/camera';

@Component({
  selector: 'app-image-picker',
  templateUrl: 'image-picker.component.html',
  styleUrls: ['image-picker.component.scss']
})
export class ImagePickerComponent {

  @Input() base64image: any;

  @Output() updateImage = new EventEmitter<string>();

  public async presentActionSheet() {
    Camera.getPhoto({resultType: CameraResultType.Base64})
        .then((photo: Photo) => {
          this.updateImage.emit(photo.base64String);
        });
  }

}
