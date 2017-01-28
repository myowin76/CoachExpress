import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { TripsModule } from './trips/trips.module';

import { AppComponent } from './app.component';
import { JourneysComponent } from './journeys/journeys.component';

@NgModule({
  declarations: [
    AppComponent,
    JourneysComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    TripsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
