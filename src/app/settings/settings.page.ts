import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import { AlertController } from '@ionic/angular';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  photo: SafeResourceUrl;
  userImage = "assets/images/perfil.png";
  userInfo;

  constructor( private sanitizer: DomSanitizer, private alertController: AlertController, private userService: UserService) { }


  ionViewDidEnter(){
   this.userService.getUser().then( userInfo => {
    this.userInfo = userInfo
    console.log(this.userInfo)
   });
  }


  async takePhoto(source){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: (source == 0 ? CameraSource.Camera : CameraSource.Photos)
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
  }

  async source() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Selecciones Uno',
      message: 'Seleccion por que medio quieres <strong>cargar</strong> tu foto',
      buttons: [
        {
          text: 'Camara',
          handler: () => {
            this.takePhoto(0)
          }
        }, {
          text: 'Galeria',
          handler: () => {
            this.takePhoto(1)
          }
        },{
        text: 'Cancelar',
        handler: () => {
          console.log("El usuarios cancelo")
        }
      }
      ]
    });

    await alert.present();
  }

}
