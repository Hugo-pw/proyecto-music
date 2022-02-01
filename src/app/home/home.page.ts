import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MusicService } from '../services/music.service';
import { SongsModalPage } from '../songs-modal/songs-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  artists: any[] = [];
  albums: any[] = [];
  songs: any[] = [];
  song = {
    playing: false,
    name: '',
    preview_url: ''
  };
  currentSong;
  newTime;
  slideOps = {
    initialSlide: 1,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  }

  constructor( private musicService: MusicService, private modalController: ModalController) {}

  ngOnInit() {
    console.log("se cargo la pagina de home");
  }

  ionViewDidEnter(){
   this.musicService.getArtists().then(listOfArtist => {
      this.artists = listOfArtist.artists;
    });
    this.musicService.getAlbums().then( listOfAlbums => {
      this.albums = listOfAlbums.albums;
    });

    this.musicService.getTracks().then( listOfTracks => {
      this.songs = listOfTracks.tracks;
    });
    
    /* this.musicService.getCompanies().then(companies => {
      console.log(companies)
    }); */

   
  }

  async showModal(object: any[], title: string, songs: any){
    const modal = await this.modalController.create({
      component: SongsModalPage,
      componentProps: {
        title,
        object,
        songs
      }
    });
    modal.onDidDismiss().then( dataReturned => {
      this.song = dataReturned.data
    })
    return await modal.present();
  }

  async showSongs(artist){
    await this.musicService.getArtistsTopTracks(artist.id).then(
      async resp => {
        const songs = resp;
        this.showModal(artist, "Top Canciones", songs.tracks)
      }
    )
  };

  play(){
    this.currentSong = new Audio(this.song.preview_url);
    if (!this.song.preview_url){
      this.song.name = "Cancion no Disponible"
    }else{
      this.currentSong.play();
      this.currentSong.addEventListener("timeupdate", ()=>{
        this.newTime = (1 / this.currentSong.duration) * this.currentSong.currentTime;
      })
      this.song.playing = true;
    }
  }

  pause(){
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime( time: number){
    if (time){
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length == 1){
        minutes = "0" + minutes
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
  }

  async showAlbumSongs(album: any) {
    await this.musicService.getAlbumsTracks(album.id).then( async resp => {
      const songs = resp;
      console.log(resp.items);
      this.showModal(album, "Canciones Del Album", songs.items)
    })
  }

  playSong(song: any){
    this.song = song 
  }
}
