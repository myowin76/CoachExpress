import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsComponent }  from './trips/trips.component';
import { VehiclesComponent }  from './vehicles/vehicles.component';
import { JourneysComponent }  from './journeys/journeys.component';
import { UsersComponent }  from './admin/users/users.component';
import { JourneyDetailsComponent }  from './journey-details/journey-details.component';
import { NewJourneyComponent }  from './new-journey/new-journey.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/security/auth.guard";

const appRoutes: Routes = [

  
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'admin/users',
    component: UsersComponent
  },
  {
    path: ':company_id/dashboard',
    component: DashboardComponent
  },
  {
  	path: 'trips',
  	component: TripsComponent
  },
  {
    path: 'vehicles',
    component: VehiclesComponent
  },
  {
    path: 'journeys',
      children: [
          {
              path: '',
              component: JourneysComponent
          },
          {
              path: 'new',
              component: NewJourneyComponent
          }
      ]
  },
  {
      path: 'journey/:id',
      children: [
          {
              path: '',
              component: JourneyDetailsComponent
          }
      ]
    },
  {
      'path': 'login',
      component: LoginComponent
  },
  {
      path: '',
      component: LoginComponent
  },
  {
      path: '**',
      redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
