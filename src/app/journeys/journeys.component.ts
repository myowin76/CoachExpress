import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

import { JourneysService } from '../shared/models/journeys.service';
import { Journey } from '../shared/models/journey';

@Component({
  // selector: 'app-journeys',
  selector: 'journey-list',
  templateUrl: './journeys.component.html',
  styleUrls: ['./journeys.component.scss']
})

// @input()
export class JourneysComponent implements OnInit {
	// @Input()
	// journeys: Journey[];
	// @Output('journeys')

	allJourneys: Journey[];
	filtered: Journey[];

	constructor(private journeysService: JourneysService){

	}

  ngOnInit() {
  	this.journeysService.findAllJourneys()
  		// .do(console.log)
  		.subscribe(
  			journeys => {
          console.log(journeys);
          this.allJourneys = this.filtered = journeys;  
        }
        
  		)

  }

  search(search: string){
  	
  	this.filtered = this.allJourneys.filter(journey => journey.trip_title.includes(search) );

  }

}
