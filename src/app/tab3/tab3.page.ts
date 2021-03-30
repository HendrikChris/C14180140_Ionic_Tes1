import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  urlImageStorage: string[] = [];
  constructor(private avStorage: AngularFireStorage, public fotoService: FotoService) { }

  async ngOnInit() {
    
  }

  async ionViewDidEnter(){
    this.tampilkanData();
  }

  tampilkanData(){
    this.urlImageStorage = [];
    var refImage = this.avStorage.storage.ref('imgStorage');
    refImage.listAll().then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          this.urlImageStorage.unshift(url);
        });
      });
    }).catch((error) => {
      console.log(error);
    })
  }
}
