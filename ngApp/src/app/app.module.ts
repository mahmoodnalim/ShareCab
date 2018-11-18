import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { EventsComponent } from "./events/events.component";
import { SpecialEventsComponent } from "./special-events/special-events.component";
import { AuthService } from "./auth.service";
import { EventService } from "./event.service";
import { RiderComponent } from "./rider/rider.component";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserHomeComponent } from "./user-home/user-home.component";
import { DriverHomeComponent } from "./driver-home/driver-home.component";
import { HomeComponent } from "./home/home.component";
import { AuthGuardService } from "./auth-guard.service";
import { AuthDriverGuardService } from "./auth-driver-guard.service";
import { AgmCoreModule } from "@agm/core";
import { TokenInterceptorService } from "./token-interceptor.service";
import { AgmDirectionModule } from "agm-direction";
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SpecialEventsComponent,
    RiderComponent,
    UserHomeComponent,
    DriverHomeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      // "AIzaSyCTeGj914RtvK3Q59e0tuiE0CttgAGtIs4",
      //"AIzaSyDql2GnE80BRxtfrodWxhAKB4gHwFPGCVg",
      apiKey:
        //"AIzaSyCSrsyNzQB2aKrgdYJBrn5iT-GCx4POCXM",
        // "AIzaSyAbJrmmufH2nBY_esZX4uhqHz0sjapbshA",
        "AIzaSyCSrsyNzQB2aKrgdYJBrn5iT-GCx4POCXM",
      //"AIzaSyCr75wBzwyvrP0qHsvGHLwMYw_2R405rNg",
      //"AIzaSyDTgvM-47XiuHa2QRQE_bDg6WWLMVNAjHs",
      //"AIzaSyAq06l5RUVfib62IYRQacLc-KAy0XIWAVs",
      libraries: ["places"]
    })
  ],
  providers: [
    AuthService,
    EventService,
    AuthGuardService,
    AuthDriverGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
