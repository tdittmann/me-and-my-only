import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';

@Injectable()
export class ToastService {

    constructor(private toastController: ToastController) {

    }

    async showMessage(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
