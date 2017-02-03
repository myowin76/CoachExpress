import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { JourneysService } from '../shared/models/journeys.service';


// import {validateUrl} from "../shared/validators/validateUrl";

@Component({
  selector: 'new-journey',
  templateUrl: './new-journey.component.html',
  styleUrls: ['./new-journey.component.scss']
})
export class NewJourneyComponent implements OnInit {

		companyId:string;

   constructor(
   		private route:ActivatedRoute, 
   		private journeysService: JourneysService
   	) { }


  ngOnInit() {
  	// this.companyId = this.route.snapshot.queryParams['courseId'];
  	this.companyId = '-KaiKfnmWpBYseUOaDxu';

    console.log("company", this.companyId);
  }

  save(form) {
      console.log('I am here');
      this.journeysService.createNewJourney(this.companyId, form.value)
        .subscribe(
            () => {
                alert("journeys created succesfully. Create another journey ?");
                form.reset();
            },
            err => alert(`error creating journey ${err}`)
        );

    }

  

}
