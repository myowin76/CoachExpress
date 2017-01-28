import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent }    from './trips.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TripsRoutingModule
  ],
  declarations: [
  	TripsComponent
  ]
})
export class TripsModule { }
