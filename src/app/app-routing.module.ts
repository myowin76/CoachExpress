import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsComponent }  from './trips/trips.component';
import { JourneysComponent }  from './journeys/journeys.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TripsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
  	path: 'trips',
  	component: TripsComponent
  },
  {
    path: 'journeys',
    component: JourneysComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
