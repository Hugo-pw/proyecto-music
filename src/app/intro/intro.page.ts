import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  slideOpt = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  }

  slides = [
    {
      id: 0,
      title: "Titulo 1",
      subtitle: "subtitulo 1",
      description: "description 1",
      icon: "musical-notes-outline",
      image: "assets/images/logo.png",
      alt: "imagen de logo"
    },
    {
      id: 1,
      title: "Titulo 2",
      subtitle: "subtitulo 2",
      description: "description 2",
      icon: "play-outline",
      image: "assets/images/musica.jpeg",
      alt: "imagen de musica"
    },
    {
      id: 2,
      title: "Titulo 3",
      subtitle: "subtitulo 3",
      description: "description 3",
      icon: "pause-outline",
      image: "assets/images/musica2.jpeg",
      alt: "imagen de musica 2"
    }
  ]
  constructor(private router: Router, private storage: Storage) { 
    this.storage.create();
  }

  finish() {
    this.storage.set("intro", true);
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
  }

}
