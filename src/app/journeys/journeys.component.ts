import {Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';

import { JourneysService } from '../shared/models/journeys.service';
import { VehiclesService } from '../shared/models/vehicles.service';

import { Journey } from '../shared/models/journey';
import { Vehicle } from '../shared/models/vehicle';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { ModalDirective } from 'ng2-bootstrap';

import { DateFormatPipe } from '../shared/pipes/date-format.pipe';


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
  vehicles: Vehicle[];

  
  
  

  @ViewChild('newModal') public newModal: ModalDirective;
  modal: any;


	constructor(
    private journeysService: JourneysService,
    private vehiclesService: VehiclesService
  ){
      
	}

  ngOnInit() {

    this.vehiclesService.findAllVehicles()
      .subscribe( vehicles => {
        this.vehicles = vehicles;
        console.log('Vehicles ' + vehicles);    
      })
    

  }

  

  viewJourneyDetails(key:string){
    this.selectedJourneyId = key;

    this.journeysService.findJourneyById(key)
      .subscribe(journey => {
            this.selectedJourney = journey
            // console.log(this.selectedJourney.depart_date);  
            console.log(new DateFormatPipe().transform(this.selectedJourney.depart_date, ['local']));

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

  

  update(journey) {
    console.log("J1 " + journey);
    console.log("J2 " + this.selectedJourney.$key);
      // this.journeysService.updateJourney(this.selectedJourney.$key, journey)
      //     .subscribe(
      //         () => {
      //             alert("journey saved succesfully.");
      //         },
      //         err => alert(`error saving lesson ${err}`)
      //     );

  }
}
