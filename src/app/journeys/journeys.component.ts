import {Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';

import { JourneysService } from '../shared/models/journeys.service';
import { JourneyFormComponent } from '../journey-form/journey-form.component';
import { Journey } from '../shared/models/journey';

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

  @ViewChild('modal')
  modal: any;


	constructor(
    private journeysService: JourneysService,
  ){

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

  public hideChildModal(): void {
      this.childModal.hide();
  }
}
