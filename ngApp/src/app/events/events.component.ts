import { Component, OnInit } from "@angular/core";
import { EventService } from "../event.service";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask
} from "angularfire2/storage";
import { finalize } from "rxjs/operators";
import { async } from "@angular/core/testing";
import { Observable } from "rxjs";
//import * as firebase from 'firebase';
import { storage } from "firebase";
@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  profileUrl: Observable<string>;
  selectedFile: null;
  imageUrl: string = "/img/fb1.jpg";
  fileToUpload: File = null;
  id = "";
  name = "";

  events = [];
  formErrors = null;
  userdetails = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    contact: null,
    isDriver: false,
    proPic: null
  };

  url = "";
  constructor(
    private _eventService: EventService,
    private afStorage: AngularFireStorage,
    private _auth: AuthService,
    
    private http: HttpClient
  ) {}

  ngOnInit() {
    // var storageRef = storage().ref(this.id);
    // storageRef
    //   .getDownloadURL()
    //   .then(url => {
    //     this.url = url;
    //   })
    //   .catch(function(error) {
    //     // Handle any errors
    //   });

    this.displayCurrentUser();
    // this._eventService
    //   .getEvents()
    //   .subscribe(res => (this.events = res), err => console.log(err));
  }

  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0];
  //   console.log(this.selectedFile);
  //   var storageRef = storage().ref(this.id);
  //   var metadata = { contentType: this.selectedFile.contentType };
  //   console.log(storageRef);
  //   var task: firebase.storage.UploadTask = storageRef.put(
  //     this.selectedFile,
  //     metadata
  //   );

  //   task.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
  //     storageRef
  //       .child(this.id)
  //       .getDownloadURL()
  //       .then(url => {
  //         this.url = url;
  //       })
  //       .catch(function(error) {
  //         // Handle any errors
  //       });

  //     task.snapshot.ref.getDownloadURL().then(downloadURL => {
  //       this.url = downloadURL;
  //       console.log("URL:" + this.url);
  //     });
  //   });
  // }

  displayCurrentUser() {
    this._auth.fetchCurrentUser().subscribe(
      res => {
        this.userdetails.firstName = res["firstName"];
        this.userdetails.lastName = res["lastName"];
        this.userdetails.email = res["email"];
        this.userdetails.contact = res["contact"];
        this.userdetails.proPic = res["proPic"];
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


  onFileSelected(file: FileList) {
    // this.selectedFile = event.target.files[0]
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  onUpload(event) {
    this.onFileSelected(event.target.files);
    const id = Math.random()
      .toString(36)
      .substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task
      .snapshotChanges()
      .pipe(finalize(() => (this.downloadURL = this.ref.getDownloadURL())))
      .subscribe();
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe(url => {
            console.log(url); // <— do what ever you want with the url..
            this.userdetails.proPic = url;
          });
        })
      )
      .subscribe();
  }
}
