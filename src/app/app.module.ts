import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
// import { TripsModule } from './trips/trips.module';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./shared/security/auth.service";
import { AuthGuard } from "./shared/security/auth.guard";
import { JourneysService } from "./shared/models/journeys.service";

import { TripsComponent }  from './trips/trips.component';
import { JourneysComponent }  from './journeys/journeys.component';


import { AppComponent } from './app.component';
import { JourneyDetailsComponent } from './journey-details/journey-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    JourneysComponent,
    JourneyDetailsComponent,
    DashboardComponent,
    TopMenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [JourneysService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
