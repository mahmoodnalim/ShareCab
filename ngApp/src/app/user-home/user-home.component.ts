import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormControl } from "@angular/forms";
import { NgModule } from "@angular/core";
import { AgmCoreModule } from "@agm/core";
import { MapsAPILoader, AgmMap } from "@agm/core";
import { GoogleMapsAPIWrapper } from "@agm/core/services";
import { AgmDirectionModule } from "agm-direction";
import { AuthService } from "../auth.service";
import { RiderComponent } from "../rider/rider.component";
import { ChatService } from "../chat.service";
//import { AngularFirestore } from "angularfire2/firestore";

//import {AngularFireModule} from 'angularfire2';
// for auth
import { AngularFireAuthModule } from "angularfire2/auth";
// for database
//import { AngularFireDatabaseModule } from "angularfire2/database";
//import { } from 'googlemaps';
import { AngularFireAuth } from "angularfire2/auth";
// for database
import { AngularFireDatabase } from "angularfire2/database";
// for Observables
import { AngularFireList, AngularFireObject } from "angularfire2/database";
import { Observable } from "rxjs";
declare var google: any;
@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
export class UserHomeComponent implements OnInit {
  items: AngularFireList<any>;
  name: any;
  msgVal: string = "";
  message: string;
  messages: string[] = [];
  title = "app works!";
  distance: number = null;
  lat: number = null;
  lng: number = null;
  zoom: number = 4;
  showDetails = false;
  myRides: any;
  myRides = { riders: [] };
  price: number;
  loading = false;
  result: any;
  isPromo: Boolean;
  discount: number;
  isDriving = false;
  rideId: any;
  //origin = { lat: this.lat, lng: this.lng };
  destination = { lat: null, lng: null };
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    // public af: AngularFireDatabase,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: AuthService // db: AngularFirestore // private chatService: ChatService
  ) {
    //this.items = af.database.list<items>('items').valueChanges().subscribe(console.log);
  }

  // sendMessage() {
  //   this.chatService.sendMessage(this.message);
  //   this.message = "";
  // }

  ngOnInit() {
    // this.chatService.getMessages().subscribe((message: string) => {
    //   this.messages.push(message);
    // });
    this.isPromo = this.authService.getCurrentUser().isPromo;
    navigator.geolocation.getCurrentPosition(
      position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 10;
        console.log(this.lat, this.lng);
      },
      err => console.log(err)
    );
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: [],
          componentRestrictions: { country: "LK" }
        }
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.destination.lat = place.geometry.location.lat();
          this.destination.lng = place.geometry.location.lng();
          console.log(this.destination);
          // this.calculateDistance();
        });
        [];
      });
    });
  }
  getDetails(isPrivate) {
    this.loading = true;
    console.log(isPrivate);
    this.showDetails = true;
    this.calculateDistance();
    this.calculateDuration();
    this.authService
      .postRiders({
        origin: { lat: this.lat, lng: this.lng },
        destination: {
          lat: this.destination.lat,
          lng: this.destination.lng
        },
        user: this.authService.getCurrentUser().uid,
        userDetails: {
          name: this.authService.getCurrentUser().name,

          isPromo: this.authService.getCurrentUser().isPromo,
          contact: this.authService.getCurrentUser().contact
        },
        isPrivate,
        distance: this.distance
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.rideId = res._id;
          const interval = setInterval(
            () =>
              this.authService.getMyRides().subscribe(res => {
                console.log("getRides", res);
                if (res) {
                  clearInterval(interval);
                  this.myRides = res;
                }
              }),
            5000
          );

          // setTimeout(
          //   () =>
          //     this.authService.getRiders().subscribe(
          //       res => {
          //         if (res) {
          //           this.myRides = res;
          //         }
          //         console.log(res);
          //       },
          //       err => {
          //         console.log(err);
          //       }
          //     ),
          //   45000
          // );
        },
        err => {
          console.log(err);
        }
      );
    // const requestInterval = setInterval(() => {
    //   this.authService.getMyRides().subscribe(
    //     res => {
    //       console.log(res);
    //       if (res) this.myRides = res;
    //       if (this.myRides) clearInterval(requestInterval);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // }, 500);
  }

  deleteRide() {
    this.isDriving = false;
    this.authService.deleteRides(this.myRides._id).subscribe(
      res => {
        console.log(res);
        // this.myRides._id = null;
      },
      err => {
        console.log(err);
      }
    );
    // this.authService
    //   .deleteRider(this.riders.join("-"))
    //   .subscribe(res => console.log(res), err => console.log(err));
    this.myRides.riders.forEach(r => {
      console.log("rr", r);

      this.authService.deleteRider(r._id).subscribe(
        res => {
          console.log(res);
          // const index = this.myRides.riders.indexOf(r);
          // this.myRides.riders.splice(index, 1);
        },
        err => {
          console.log(err);
        }
      );
    });
    // this.myRides = { riders: [] };
  }
  getPromo() {
    this.authService.getPromo().subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  calculateDuration() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var or = new google.maps.LatLng(this.lat, this.lng);
    var des = new google.maps.LatLng(
      this.destination.lat,
      this.destination.lng
    );
    // var mapOptions = {
    //   zoom: 15,
    //   center: this.origin
    // };
    // var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    // directionsDisplay.setMap(map);
    var request = {
      origin: or,
      destination: des,
      travelMode: "DRIVING",
      avoidHighways: true
    };
    directionsService.route(request, function(response, status) {
      console.log(response);
      var point = response.routes[0].legs[0];
      if (status == "OK") {
        document.getElementById("duration").innerHTML = point.duration.text;
      }
    });
  }

  // calculateDuration() {
  //   var directionsService = new google.maps.DirectionsService();
  //   var directionsDisplay = new google.maps.DirectionsRenderer();
  //   var duration = google.maps.geometry.duration(
  //     new google.maps.LatLng(this.lat, this.lng),
  //     new google.maps.LatLng(this.destination.lat, this.destination.lng)
  //   );
  //   document.getElementById("duration").innerHTML = duration / 1000 + "S";
  // }

  calculateDistance() {
    // console.log(google.maps.geometry.spherical.computeDurationBetween());
    this.distance = google.maps.geometry.spherical.computeDistanceBetween(
      new google.maps.LatLng(this.lat, this.lng),
      new google.maps.LatLng(this.destination.lat, this.destination.lng)
    );
    console.log(this.distance);
    document.getElementById("distance").innerHTML = this.distance / 1000 + "km";
  }
  onPromoClick() {
    // if(this.authService.getCurrentUser().uid == this.authService.getRiders())
    const user = this.myRides.riders.find(
      obj => obj.uid === this.authService.getCurrentUser().uid
    );
    this.price = user.userDetails.price - user.userDetails.price * 0.1;
  }
  // calculateDuration() {
  //   var service = new google.maps.DistanceMatrixService();
  //   var or = new google.maps.LatLng(this.lat, this.lng);
  //   var des = new google.maps.LatLng(
  //     this.destination.lat,
  //     this.destination.lng
  //   );
  //   service.getDistanceMatrix(
  //     {
  //       origin: or,
  //       destination: des,
  //       travelMode: google.maps.TravelMode.DRIVING,
  //       unitSystem: google.maps.UnitSystem.METRIC,
  //       avoidHighways: false,
  //       avoidTolls: false
  //     },
  //     function(response, status) {
  //       if (
  //         status == google.maps.DistanceMatrixStatus.OK &&
  //         response.rows[0].elements[0].status != "ZERO_RESULTS"
  //       ) {
  //         var distance = response.rows[0].elements[0].distance.text;
  //         var duration = response.rows[0].elements[0].duration.text;
  //         var dvDistance = document.getElementById("dvDistance");
  //         dvDistance.innerHTML = "";
  //         dvDistance.innerHTML += "Distance: " + distance + "<br />";
  //         dvDistance.innerHTML += "Duration:" + duration;
  //       } else {
  //         alert("Unable to find the distance via road.");
  //       }
  //     }
  //   );

  // }
  //  calcRoute() {
  //   var directionsService = new google.maps.DirectionsService();
  //   var directionsDisplay = new google.maps.DirectionsRenderer();
  //   var distanceInput = document.getElementById("distance");
  //   var durationInput = document.getElementById("duration");

  //   var request = {

  //     origin:this.origin,
  //     destination:this.destination,
  //     travelMode: google.maps.DirectionsTravelMode.DRIVING
  //   };

  //   directionsService.route(request, function(response, status) {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       directionsDisplay.setDirections(response);
  //       distanceInput.value = response.routes[0].legs[0].distance.value / 1000;
  //       durationInput.value = response.routes[0].legs[0].duration.value / 60;
  //       }
  //   });
  // }
}
