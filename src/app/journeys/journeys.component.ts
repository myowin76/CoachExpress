import {Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';

import { JourneysService } from '../shared/models/journeys.service';

import { JourneyFormComponent } from '../journey-form/journey-form.component';
import { Journey } from '../shared/models/journey';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ModalDirective } from 'ng2-bootstrap';


@Component({
  // selector: 'app-journeys',
  moduleId: module.id,
  selector: 'journey-list',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss']
})


export class JourneysComponent implements OnInit {

  @ViewChild('childModal') public childModal: ModalDirective;


	@Input()
	journeys: Journey[];

	@Output('journey')
  journeyEmitter = new EventEmitter<Journey>();

  selectedJourney: Journey;
  selectedJourneyId: string;
  journeyLoaded: boolean = false;

  companyId = '-KaiKfnmWpBYseUOaDxu';

  newForm:FormGroup;
  

  @ViewChild('newModal') public newModal: ModalDirective;
  modal: any;


	constructor(
    private fb:FormBuilder,
    private journeysService: JourneysService
  ){
      this.newForm = this.fb.group({
          depart_date: ['',Validators.required],
          depart_time: ['',Validators.required],
          company_name: [''],
          trip_id: [''],
          note: ['']
      });
	}

  ngOnInit() {



  }

  // onSelect(journey:Journey) {
  //     this.selectedJourney = journey;
  //     // this.journeyEmitter.emit(journey);
  //     console.log(this.selectedJourney);
  // }

  viewJourneyDetails(key:string){
    this.selectedJourneyId = key;

    this.journeysService.findJourneyById(key)
      .subscribe(journey => {
            this.selectedJourney = journey
            console.log(this.selectedJourney);  

            this.journeyLoaded = true;
            this.childModal.show();
        });
    
  }

  public showNewMoal(): void{
    this.newModal.show();
  }
  public hideNewModal(): void {
      this.newModal.hide();
  }

  public hideChildModal(): void {
      this.childModal.hide();
  }
  

  save(form) {
      console.log('I AM HERE ');
        this.journeysService.createNewJourney(this.companyId, form.value)
            .subscribe(
                () => {
                    console.log("journey created succesfully. Create another journey ?");
                    form.reset();
                    this.newModal.hide();
                },
                err => alert(`error creating journey ${err}`)
            );

    }

  isErrorVisible(field:string, error:string) {

      return this.newForm.controls[field].dirty
              && this.newForm.controls[field].errors &&
              this.newForm.controls[field].errors[error];

  }
}
