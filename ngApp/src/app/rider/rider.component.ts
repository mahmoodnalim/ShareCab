import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "angularfire2/database";
@Component({
  selector: "app-rider",
  templateUrl: "./rider.component.html",
  styleUrls: ["./rider.component.css"]
})
export class RiderComponent implements OnInit {
  feedback: any[];
  model: any = {};
  history: any[];
  userDetails1: any[];
  userDetails2: any[];
  onSubmit() {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.model));
  }
  registerRiderData = {};
  constructor(
    private _auth: AuthService,
    private _router: Router,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  displayData() {
    this.db
      .list("/feedback")
      .valueChanges()
      .subscribe(feedback => {
        this.feedback = feedback;
      });
  }
  dispalyRideHistory() {
    this.authService.getRideHistory().subscribe(
      (res: any[]) => {
        console.log(res);
        this.history = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  displayUserHistory1() {
    this.authService.getUserDetails().subscribe(
      (res: any[]) => {
        console.log(res);
        this.userDetails1 = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  displayUserHistory2() {
    this.authService.getUserDetails().subscribe(
      (res: any[]) => {
        console.log(res);
        this.userDetails2 = res;
      },
      err => {
        console.log(err);
      }
    );
  }
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
