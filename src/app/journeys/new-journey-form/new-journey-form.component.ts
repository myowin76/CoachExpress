import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { VehiclesService } from '../../shared/models/vehicles.service';
import { Vehicle } from '../../shared/models/vehicle';

@Component({
  selector: 'new-journey-form',
  templateUrl: './new-journey-form.component.html',
  styleUrls: ['./new-journey-form.component.scss']
})
export class NewJourneyFormComponent implements OnInit {

	newForm:FormGroup;
	vehicles: Vehicle[];

  constructor(private fb:FormBuilder,
  	private vehiclesService: VehiclesService) { 
  	this.newForm = this.fb.group({
          depart_date: ['',Validators.required],
          depart_time: ['',Validators.required],
          company_name: [''],
          vehicle_id: [''],
          trip_id: [''],
          note: ['']
      });
  }

  ngOnInit() {

  	this.vehiclesService.findAllVehicles()
      .subscribe( vehicles => {
        this.vehicles = vehicles;
        console.log('Vehicles ' + vehicles);    
      })
    
  }

  isErrorVisible(field:string, error:string) {

      return this.newForm.controls[field].dirty
              && this.newForm.controls[field].errors &&
              this.newForm.controls[field].errors[error];

  }
  reset() {
        this.newForm.reset();
    }


    get valid() {
        return this.newForm.valid;
    }

    get value() {
        return this.newForm.value;
    }

}
