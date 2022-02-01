import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private storage: Storage,private navCtrl: NavController){
    this.storage.create();
  }
  async canActivate(){
    const isUserLoggedIn = await this.storage.get("isUserLoggedIn");
    if (isUserLoggedIn){
      return true;
    } else {
      this.navCtrl.navigateForward("/login");
    }
  }
  
}
