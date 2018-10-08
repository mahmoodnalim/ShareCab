import { Component, OnInit } from "@angular/core";
import { EventService } from "../event.service";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  events = [];
  formErrors = null;
  userdetails = {
    firstName: null,
    lastName: null,
    email: null,
    contact: null
  };
  constructor(
    private _eventService: EventService,
    public _auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.displayCurrentUser();
    // this._eventService
    //   .getEvents()
    //   .subscribe(res => (this.events = res), err => console.log(err));
  }

  displayCurrentUser() {
    this._auth.fetchCurrentUser().subscribe(
      res => {
        this.userdetails.firstName = res["firstName"];
        this.userdetails.lastName = res["lastName"];
        this.userdetails.email = res["email"];
        this.userdetails.contact = res["contact"];
      },
      err => console.log(err)
    );
  }
  onUpdate(e) {
    e.preventDefault();
    this._auth.updateUser(this.userdetails).subscribe(
      res => {
        if (res["error"]) {
          this.formErrors = res["error"];
          return;
        }
        localStorage.token = res;
        console.log(res);
      },
      err => console.error("ok", err)
    );
  }
}
