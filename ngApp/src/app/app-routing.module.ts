import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EventsComponent } from "./events/events.component";
import { SpecialEventsComponent } from "./special-events/special-events.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { RiderComponent } from "./rider/rider.component";
import { UserHomeComponent } from "./user-home/user-home.component";
import { DriverHomeComponent } from "./driver-home/driver-home.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./auth-guard.service";
import { AuthDriverGuardService } from "./auth-driver-guard.service";
import { FeedbackComponent } from "./feedback/feedback.component";
import { OverviesComponent } from "./overvies/overvies.component";
import { HowitworksComponent } from "./howitworks/howitworks.component";
const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "overvies",
    component: OverviesComponent
  },
  {
    path: "howitworks",
    component: HowitworksComponent
  },
  {
    path: "events",
    component: EventsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "feedback",
    component: FeedbackComponent
  },
  {
    path: "special",
    component: SpecialEventsComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "rider",
    component: RiderComponent
  },
  {
    path: "user-home",
    component: UserHomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "driver-home",
    component: DriverHomeComponent,
    canActivate: [AuthGuardService, AuthDriverGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
