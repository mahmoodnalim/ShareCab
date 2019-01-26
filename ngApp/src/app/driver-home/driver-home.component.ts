import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormControl } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";
import { MapsAPILoader, AgmMap } from "@agm/core";
//import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
@Component({
  selector: "app-driver-home",
  templateUrl: "./driver-home.component.html",
  styleUrls: ["./driver-home.component.css"]
})
export class DriverHomeComponent implements OnInit {
  lat: number = null;
  lng: number = null;
  riders = [];
  unitPriceShare = 40;
  unitPricePrivate = 60;
  maxDistance;
  totalDistance;
  isDriving = false;
  currentRide = null;

  // lats = 36;
  // lons = -94;
  addr = [];
  routes = null;
  contentString;
  zoom: number = 4;
  destination = { lat: null, lng: null };
  isAvailable = false;

  // items:Observable<any[]>;
  constructor(private authService: AuthService) {
    // this.items = db.collection('items').valueChanges();
  }

  ngOnInit() {
    this.authService.getOneADriver().subscribe(
      res => {
        if (res) {
          this.isAvailable = true;
        }
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    navigator.geolocation.getCurrentPosition(
      position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 10;
        console.log(this.lat, this.lng);
      },
      err => console.log(err)
    );

    // ad.getProducts(this.lats, this.lons, function(error, response) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(response);
    //   }
    // });
    // this.authService.getPrice().subscribe(
    //   res => {
    //     console.log({ res });
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this.authService.getRiders().subscribe(
      (res: [any]) => {
        if (res.length !== 0) this.maxDistance = res[0].distance;
        this.totalDistance = res.reduce((a, b) => a + b.distance, 0) / 1000;

        console.log(res);
        this.routes = res;
        res.forEach(r => {
          this.authService.getAddress(r.origin.lat, r.origin.lng).subscribe(
            od => {
              console.log(od);
              this.authService
                .getAddress(r.destination.lat, r.destination.lng)
                .subscribe(
                  dd => {
                    console.log(dd);
                    this.authService.getOneUser(r.user).subscribe(
                      ud => {
                        // console.log("id", res);
                        this.addr.push({
                          od,
                          dd,
                          ud,
                          r,
                          _id: r._id,
                          isChecked: false,
                          isPrivate: r.isPrivate
                        });
                      },
                      err => {
                        console.log(err);
                      }
                    );
                  },
                  err => {
                    console.log(err);
                  }
                );
            },
            err => {
              console.log(err);
            }
          );
        });
        console.log(this.addr);
        // this.authService.getAddress(this.lat, this.lng).subscribe(
        //   res => {
        //     console.log({ res });
        //   },
        //   err => {
        //     console.log(err);
        //   }
        // );
      },
      err => {
        console.log(err);
      }
    );
  }
  onChangeCategory(isChecked, a: any) {
    // Use appropriate model type instead of any

    if (isChecked) {
      this.riders.push(a);
      console.log(this.riders);
    } else {
      let index = this.riders.indexOf(a);
      this.riders.splice(index, 1);
    }
  }
  onClicked() {
    this.isDriving = true;
    let did = this.authService.getCurrentUser().uid;
    let name = this.authService.getCurrentUser().name;
    let contact = this.authService.getCurrentUser().contact;
    const obj = {
      driver: {
        did,
        name,
        contact
      },
      isConfirmed: null,
      riders: this.riders.map(({ r }) => {
        // r.distance;
        console.log(this.calculatePrice(r.distance, r.isPrivate));
        return {
          id: r._id,
          uid: r.user,
          userDetails: {
            price: this.calculatePrice(r.distance, r.isPrivate),
            name: r.userDetails.name,
            contact: r.userDetails.contact,
            isPromo: r.userDetails.isPromo
          },
          isConfirmed: null,
          origin: { lat: r.origin.lat, lng: r.origin.lng },
          destination: { lat: r.destination.lat, lng: r.destination.lng }
        };
      })
      // origins: this.riders.map(({ r }) => ({
      //   lat: r.origin.lat,
      //   lng: r.origin.lng,
      //   uid: r.user
      // })),
      // destinations: this.riders.map(({ r }) => ({
      //   lat: r.destination.lat,
      //   lng: r.destination.lng,
      //   uid: r.user
      // })),
    };
    console.log(obj);
    this.authService.postRides(obj).subscribe(
      res1 => {
        this.currentRide = res1;
        console.log(res1);
        const rideInterval = setInterval(() => {
          this.authService.getOneRide(this.currentRide._id).subscribe(res2 => {
            if (res2) this.currentRide = res2;
            console.log(res2);
          }),
            err => {
              console.log(err);
            };
        }, 1000);
        if (this.currentRide.isConfirmed) clearInterval(rideInterval);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  calculatePrice(distance, isPrivate?) {
    const totalPrice =
      (this.maxDistance / 1000) *
      (isPrivate ? this.unitPricePrivate : this.unitPriceShare);
    console.log(totalPrice);
    console.log(this.totalDistance);
    if (isPrivate) return totalPrice;
    return (totalPrice / this.totalDistance) * (distance / 1000);
  }
  deleteRide() {
    this.isDriving = false;
    this.authService.deleteRides(this.currentRide._id).subscribe(
      res => {
        console.log(res);
        this.currentRide = null;
      },
      err => {
        console.log(err);
      }
    );
    // this.authService
    //   .deleteRider(this.riders.join("-"))
    //   .subscribe(res => console.log(res), err => console.log(err));
    this.riders.forEach(r => {
      // console.log("rr", r);
      this.authService.deleteRider(r._id).subscribe(
        res => {
          console.log(res);
          const index = this.riders.indexOf(r);
          this.riders.splice(index, 1);
        },
        err => {
          console.log(err);
        }
      );
    });
    this.authService.postRideHistory(this.currentRide).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err.error);
      }
    );
  }

  deleteRide1() {
    this.isDriving = false;
    this.authService.deleteRides(this.currentRide._id).subscribe(
      res => {
        console.log(res);
        this.currentRide = null;
      },
      err => {
        console.log(err);
      }
    );
    // this.authService
    //   .deleteRider(this.riders.join("-"))
    //   .subscribe(res => console.log(res), err => console.log(err));
    this.riders.forEach(r => {
      // console.log("rr", r);
      this.authService.deleteRider(r._id).subscribe(
        res => {
          console.log(res);
          const index = this.riders.indexOf(r);
          this.riders.splice(index, 1);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  toggleAvailable() {
    if (this.isAvailable) {
      this.authService.deleteADriver().subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.authService
        .postADriver({
          driver: this.authService.getCurrentUser().uid,
          name: this.authService.getCurrentUser().name,
          contact: this.authService.getCurrentUser().contact,
          origin: { lat: this.lat, lng: this.lng }
        })
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
    }
    this.isAvailable = !this.isAvailable;
  }
}
