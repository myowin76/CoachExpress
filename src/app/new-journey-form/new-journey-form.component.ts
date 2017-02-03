import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'new-journey-form',
  templateUrl: './new-journey-form.component.html',
  styleUrls: ['./new-journey-form.component.scss']
})
export class NewJourneyFormComponent implements OnInit {

  form:FormGroup;

    @Input()
    initialValue:any;

    constructor(private fb:FormBuilder) {

        this.form = this.fb.group({
            depart_date: ['',Validators.required],
            depart_time: ['',Validators.required],
            company_id: [''],
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
