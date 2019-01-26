import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { DriverHomeComponent } from "./driver-home/driver-home.component";
import { post } from "selenium-webdriver/http";

@Injectable()
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register/";
  private _loginUrl = "http://localhost:3000/api/login/";

  private _eventsUrl = "http://localhost:3000/api/events/";
  private _ridesUrl = "http://localhost:3000/api/rides/";
  private _userUrl = "http://localhost:3000/api/users/";
  private _rideUrl = "http://localhost:3000/api/ridesd/";
  private _rideHistory = "http://localhost:3000/api/rideHistory/";
  private _userdUrl = "http://localhost:3000/api/userd/";
  private _promoUrl = "http://localhost:3000/api/addPromo/";
  // private _registerUrl = "https://sharecab123.herokuapp.com/api/register";
  // private _loginUrl = "https://sharecab123.herokuapp.com/api/login";

  // private _eventsUrl = "https://sharecab123.herokuapp.com/api/events";
  // private _ridesUrl = "https://sharecab123.herokuapp.com/api/rides";
  // private _userUrl = "https://sharecab123.herokuapp.com/api/users/";
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user);
  }
  getUser(user) {
    return this.http.get<any>(this._eventsUrl, user);
  }
  getOneUser(id) {
    return this.http.get(this._userUrl + id);
  }
  getCurrentUser() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem("token");

    if (!token) return null;
    return helper.decodeToken(token);
  }
  fetchCurrentUser() {
    return this.http.get(this._eventsUrl, {
      headers: { "x-token": localStorage.token }
    });
  }
  updateUser(user) {
    return this.http.put(this._eventsUrl, user, {
      headers: { "x-token": localStorage.token }
    });
  }
  getToken() {
    return localStorage.getItem("token");
  }
  postRiders(riders) {
    return this.http.post(this._ridesUrl, riders);
  }
  getRiders() {
    return this.http.get(this._ridesUrl);
  }
  getAddress(lat, lng) {
    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyBKqcDhVxwYY-rc63W8PhFg8BwvAGEeVLo`

      // `https://eu1.locationiq.com/v1/reverse.php?key=6939bb17fa5a3e&lat=${lat}&lon=${lng}&format=json`
    );
  }
  postRides(obj) {
    return this.http.post<any>(this._rideUrl, obj);
  }

  getMyRides() {
    const id = this.getCurrentUser().uid;
    return this.http.get(this._rideUrl + id);
  }
  deleteRider(id) {
    return this.http.delete(this._ridesUrl + id);
  }
  deleteRides(id) {
    return this.http.delete(this._rideUrl + id);
  }
  postRideHistory(currentDrive) {
    return this.http.post<any>(this._rideHistory, currentDrive);
  }

  getRideHistory() {
    return this.http.get(this._rideHistory);
  }

  getUserDetails() {
    return this.http.get(this._userdUrl);
  }

  addPromo(userId){
    return this.http.put(this._promoUrl,{id:userId});
  }

  getPromo(){
    return this.http.get(this._promoUrl);
  }
  // getPrice() {
  //   return this.http.get(

  //   );
  // }
}
// `${this._eventsUrl}?token=${localStorage.token}`
