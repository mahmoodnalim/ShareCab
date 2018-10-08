import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  private _eventsUrl = "http://localhost:3000/api/events";

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
}
// `${this._eventsUrl}?token=${localStorage.token}`
