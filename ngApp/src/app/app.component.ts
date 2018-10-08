import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ngApp';
  constructor (private _router:Router, public auth: AuthService){}
  // isLoggedIn (){
  //   const isLog = localStorage.getItem("token")
  //   if(!isLog){
  //     return false
  //   }
  //   return true 
  // }
  logOut(){
    localStorage.removeItem("token")
    this._router.navigate(["/"])
  }

}

