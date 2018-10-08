import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) { }

  canActivate() {
    if (this._auth.getCurrentUser() !== null) {
      // if (this._auth.getCurrentUser().isDriver) {
      //   return true
      // } else {
      //   this._router.navigate(['/user-home'])
      //   return false
      // }
      return true
    }
    this._router.navigate(['/login'])
    return false
  }

}
