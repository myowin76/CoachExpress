import { Component, OnInit } from '@angular/core';
// import { AngularFire } from 'angularfire2';
// import { Router } from "@angular/router";

import { JourneysService } from '../shared/models/journeys.service';
import { Journey } from '../shared/models/journey';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

	user = {};

  allJourneys: Journey[];
  filtered: Journey[];
  

  constructor(private journeysService: JourneysService) { 
  	

  	// this.af.auth.subscribe(auth => {
  	// 	// console.log(auth.uid)	
  	// 	this.user = auth;

  	// 	if (auth){
  	// 		console.log(auth);	
  	// 		// get user profile
  	// 		// update menu link
  	// 	}else{
  	// 		// redirect to login page
  	// 	}
  	// });



  }



	ngOnInit() {
     
    this.journeysService.findAllJourneysForCompany('-KaiKfnmWpBYseUOaDxu')
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

	// login() {
	//     this.af.auth.login();
	//   }

 //  	logout() {
 //        this.af.auth.logout();
 //        this.router.navigate(['/dashboard']);

 //    }

}
