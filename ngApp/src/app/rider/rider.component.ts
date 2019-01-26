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

   openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
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
  addPromo(id){
    this.authService.addPromo(id).subscribe(res =>{
      console.log(res);

    },
    err=>{
      console.log(err);
    })
    
    
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
