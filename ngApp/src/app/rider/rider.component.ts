import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-rider",
  templateUrl: "./rider.component.html",
  styleUrls: ["./rider.component.css"]
})
export class RiderComponent implements OnInit {
  model: any = {};
  onSubmit() {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.model));
  }
  registerRiderData = {};
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}
  //   registerRider(){
  //     this._auth.registerRider(this.registerRiderData)
  //     .subscribe(
  //       res => {console.log(res)
  //       localStorage.setItem('token',res.token)
  //       this._router.navigate(['/special'])
  //      },
  //       err => console.log(err)
  //     )
  //  }
}
