import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
// import { AngularFire } from 'angularfire2';
import { ActivatedRoute, Router } from '@angular/router';

import { Journey } from '../shared/models/journey';
import { JourneysService } from '../shared/models/journeys.service';

@Component({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

	user = {};

  allJourneys: Journey[];
  filtered: Journey[];
  

  constructor(
    private journeysService: JourneysService,
    private route:ActivatedRoute,
    private router:Router) { 
  	

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

    this.route.params
    
      .switchMap(params => {
            const companyId = params['company_id'];
            console.log('ID is' + companyId);
           return this.journeysService.findAllJourneysForCompany(companyId);
      })
      .subscribe(
        journeys => {
          console.log(journeys);
          this.allJourneys = this.filtered = journeys;  
        }
        
      )
      
     
    // this.journeysService.findAllJourneysForCompany('-KaiKfnmWpBYseUOaDxu')
    //   .subscribe(
    //     journeys => {
    //       console.log(journeys);
    //       this.allJourneys = this.filtered = journeys;  
    //     }
        
    //   )
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
