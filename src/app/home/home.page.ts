import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private alertController: AlertController) { }

  async startScan() {
    return new Promise(async (resolve, reject) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      }
      else if (status.denied) {
        const alert = await this.alertController.create
          ({
            header: 'No permission',
            message: 'Please allow camera access in your settings',
            buttons: [{
              text: 'No',
              role: 'calcel'
            },
            {
              text: 'Open Settings',
              handler: () => {
                BarcodeScanner.openAppSettings();
                resolve(false);
              }
            }]
          });

        await alert.present();
      } else {
        resolve(false);
      }

    })
    //BarcodeScanner.hideBackground(); // make background of WebView transparent


  }
}
