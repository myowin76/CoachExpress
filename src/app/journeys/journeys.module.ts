import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JourneysRoutingModule } from './trips-routing.module';
import { JourneysComponent }    from './trips.component';

@NgModule({
  imports: [
    CommonModule,
    JourneysRoutingModule
  ],
  declarations: [
  	JourneysComponent
  ]
})
export class JourneysModule { }
