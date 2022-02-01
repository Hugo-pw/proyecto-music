import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private storage: Storage) { }

  loginUser(credentials){
    return new Promise((accept, reject) => {
      this.storage.get("user").then((data) => {
        console.log(data.password, data.email)
      if ( 
        credentials.email == data.email && credentials.password == data.password
      ) { 
        accept("Login Correcto");
    } else {
      reject("Login Incorrecto")
    }
      }
      );
  }
    );
  }

  registerUser(registerData){
    registerData.password = btoa(registerData.password)
    registerData.password = atob(registerData.password)
    return this.storage.set("user", registerData)
  }

}