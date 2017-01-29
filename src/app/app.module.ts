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
import { TripsComponent }  from './trips/trips.component';
import { JourneysComponent }  from './journeys/journeys.component';

import { JourneysService } from "./shared/models/journeys.service";

import { AppComponent } from './app.component';
import { JourneyDetailsComponent } from './journey-details/journey-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    JourneysComponent,
    JourneyDetailsComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [JourneysService],
  bootstrap: [AppComponent]
})
export class AppModule { }
