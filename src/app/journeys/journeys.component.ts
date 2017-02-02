import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

// import { JourneysService } from '../shared/models/journeys.service';
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


	constructor(){

	}

  ngOnInit() {

  }

  selectJourney(journey:Journey) {
      this.journeyEmitter.emit(journey);
  }

}
