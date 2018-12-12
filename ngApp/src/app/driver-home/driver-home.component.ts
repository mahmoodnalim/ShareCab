import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { FormControl } from "@angular/forms";
import { AgmCoreModule } from "@agm/core";
import { MapsAPILoader, AgmMap } from "@agm/core";

@Component({
  selector: "app-driver-home",
  templateUrl: "./driver-home.component.html",
  styleUrls: ["./driver-home.component.css"]
})
export class DriverHomeComponent implements OnInit {
  lat: number = null;
  lng: number = null;
  // lats = 36;
  // lons = -94;
  addr = [];
  routes = null;
  contentString;
  zoom: number = 4;
  destination = { lat: null, lng: null };
  constructor(private authService: AuthService) {}

  ngOnInit() {
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
                        this.addr.push({ od, dd, ud });
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
}
