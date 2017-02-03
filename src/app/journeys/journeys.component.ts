import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

// import { JourneysService } from '../shared/models/journeys.service';
import { JourneyFormComponent } from '../journey-form/journey-form.component';
import { Journey } from '../shared/models/journey';

@Component({
  // selector: 'app-journeys',
  selector: 'journey-list',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss']
})


export class JourneysComponent implements OnInit {
	@Input()
	journeys: Journey[];

	@Output('journey')
  journeyEmitter = new EventEmitter<Journey>();

  selectedJourney: Journey;

	constructor(){

	}

  ngOnInit() {

  }

  onSelect(journey:Journey) {
      this.selectedJourney = journey;
      this.journeyEmitter.emit(journey);
  }

}
