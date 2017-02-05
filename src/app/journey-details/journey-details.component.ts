import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Journey } from '../shared/models/journey';
import { JourneysService } from '../shared/models/journeys.service';


@Component({
	moduleId: module.id,
  selector: 'journey-details',
  templateUrl: './journey-details.component.html',
  styleUrls: ['./journey-details.component.scss']
})

export class JourneyDetailsComponent implements OnInit {

	journey: Journey;

  constructor(
  	private journeysService: JourneysService,
    private route:ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
  	this.route.params
  		.switchMap(params => {

            const Id = params['id'];
            // console.log(Id);
            
            return this.journeysService.findJourneyById(Id);
        })
        .subscribe(journey => {
        		this.journey = journey
        		console.log(this.journey);	
        });
        
  }

}
