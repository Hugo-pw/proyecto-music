import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage  {

  songs: any[];
  object: any;
  title: string;

  constructor(private navParams: NavParams, private modalController: ModalController) { }

  ionViewDidEnter(){
    this.songs = this.navParams.data.songs;
    this.object = this.navParams.data.object;
    this.title = this.navParams.data.title;
  }

  async selectSong(song: any){
    await this.modalController.dismiss(song);
  }

}
