import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ErrorHandler, Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  profileUrl: Observable<string>;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  selectedFile: null;
  imageUrl: string = "/img/fb1.jpg";
  fileToUpload: File = null;

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
    isDriver: false,
    //proPic: null
  };

  constructor(
    private afStorage: AngularFireStorage,
    private _auth: AuthService,
    private _router: Router,
    private http: HttpClient
  ) {}

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

  // onFileSelected(file: FileList) {
  //   // this.selectedFile = event.target.files[0]
  //   this.fileToUpload = file.item(0);

  //   var reader = new FileReader();
  //   reader.onload = (event: any) => {
  //     this.imageUrl = event.target.result;
  //   };
  //   reader.readAsDataURL(this.fileToUpload);
  // }
  // onUpload(event) {
  //   this.onFileSelected(event.target.files);
  //   const id = Math.random()
  //     .toString(36)
  //     .substring(2);
  //   this.ref = this.afStorage.ref(id);
  //   this.task = this.ref.put(event.target.files[0]);
  //   this.task
  //     .snapshotChanges()
  //     .pipe(finalize(() => (this.downloadURL = this.ref.getDownloadURL())))
  //     .subscribe();
  //   this.task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.ref.getDownloadURL().subscribe(url => {
  //           console.log(url); // <— do what ever you want with the url..
  //           this.registerUserData.proPic = url;
  //         });
  //       })
  //     )
  //     .subscribe();
  // }
}
