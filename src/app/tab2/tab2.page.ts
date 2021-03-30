import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  urlImageStorage: string[] = [];
  constructor(public fotoService:FotoService, public alertController: AlertController, private avStorage: AngularFireStorage) {}

  async ngOnInit(){
    await this.fotoService.loadFoto();
  }

  tambahFoto(){
    this.fotoService.tambahFoto();
  }

  showConfirmAlert(webviewPath: String) {
    this.alertController.create({
      header: 'Confirm Alert',
      subHeader: 'Do you want to upload?',
      message: `${webviewPath}`,
      buttons: [
        {
          text: 'Never',
          handler: () => {
            console.log('I care about humanity');
          }
        },
        {
          text: 'Yes!',
          handler: () => {
            this.uploadFoto(webviewPath)
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  uploadFoto(webviewPath){
    this.urlImageStorage = [];
    for (var index in this.fotoService.dataFoto){
      const imgFilePath = `imgStorage/${this.fotoService.dataFoto[index].filePath}`;
      
      if (this.fotoService.dataFoto[index].webviewPath = webviewPath){
        this.avStorage.upload(imgFilePath, this.fotoService.dataFoto[index].dataImage).then(() => {
          this.avStorage.storage.ref().child(imgFilePath).getDownloadURL().then((url) => {
            this.urlImageStorage.unshift(url)
          });
        });
      }
    }
  }

}
