import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email: null,
    password: null
  };
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem("token", res.token);
        if (this._auth.getCurrentUser().email == "mahmood@m.com") {
          this._router.navigate(["/rider"]);
        } else if (this._auth.getCurrentUser().email == "bushra@b.com") {
          this._router.navigate(["/rider"]);
        } else if (this._auth.getCurrentUser().email == "Ashfaq Ahamed") {
          this._router.navigate(["/rider"]);
        } else if (this._auth.getCurrentUser().email == "Murshid Akram") {
          this._router.navigate(["/rider"]);
        } else if (this._auth.getCurrentUser().email == "Dushanthini Aru") {
          this._router.navigate(["/rider"]);
        } else if (this._auth.getCurrentUser().isDriver) {
          this._router.navigate(["/driver-home"]);
        } else {
          this._router.navigate(["/user-home"]);
        }
      },
      err => console.log(err)
    );
  }
}
