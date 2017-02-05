import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { Trip } from '../shared/models/trip';
import { TripsService } from '../shared/models/trips.service';

@Component({
  selector: 'new-journey-form',
  templateUrl: './new-journey-form.component.html',
  styleUrls: ['./new-journey-form.component.scss']
})
export class NewJourneyFormComponent implements OnInit {

  form:FormGroup;
  trips: Trip[];

    @Input()
    initialValue:any;

    constructor(private fb:FormBuilder, private tripsService: TripsService) {

        this.form = this.fb.group({
            depart_date: ['',Validators.required],
            depart_time: ['',Validators.required],
            company_name: [''],
            trip_id: [''],
            note: ['']
        });


    }


    ngOnChanges(changes:SimpleChanges) {
        if (changes['initialValue']) {
            this.form.patchValue(changes['initialValue'].currentValue);
        }
    }

     ngOnInit() {    
         this.tripsService.findAllTrips()
          .subscribe(
            trips => {
              // console.log(trips);
              this.trips = trips;  
            }
            
          );
    }


    isErrorVisible(field:string, error:string) {

        return this.form.controls[field].dirty
                && this.form.controls[field].errors &&
                this.form.controls[field].errors[error];

    }


  

        reset() {
        this.form.reset();
    }


    get valid() {
        return this.form.valid;
    }

    get value() {
        return this.form.value;
    }

}
