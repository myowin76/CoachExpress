import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripsComponent }  from './trips/trips.component';
import { JourneysComponent }  from './journeys/journeys.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/security/auth.guard";

const appRoutes: Routes = [

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
  },
  {
      'path': 'login',
      component: LoginComponent
  },
  {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
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
