import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  header = {'Access-Control-Request-Headers': '*'};
  mainUrl = "https://seminario-pca.herokuapp.com/";

  constructor() { }

  getUser(){
    return fetch(this.mainUrl + `users/${1}`,
    {mode: 'cors',
    headers: this.header}
    ).then((user) => user.json());
  }
}
