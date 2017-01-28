import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripsComponent } from './trips.component';

const tripsRoutes: Routes = [
  { path: 'trips',  component: TripsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(tripsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class TripsRoutingModule { }
