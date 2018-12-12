import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;

  // err
  ngOnInit() {}

  onClickRegister() {}

  log(x) {
    console.log(x);
  }
  model: any = {};
  error = "";
  registerUserData = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    contact: null,
    isDriver: false
  };

  constructor(private _auth: AuthService, private _router: Router) {}

  registerUser(f) {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("token", res.token);

        if (this._auth.getCurrentUser().isDriver) {
          this._router.navigate(["/driver-home"]);
        } else {
          this._router.navigate(["/user-home"]);
        }
      },
      err => {
        console.log(err.error);
        this.error = err.error;
      }
    );
  }
}
