import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthDriverGuardService implements CanActivate {


  constructor(private _auth: AuthService, private _router: Router) { }
  canActivate() {
    if (this._auth.getCurrentUser().isDriver) return true;
    this._router.navigate(['/user-home'])
    return false
  }
}
