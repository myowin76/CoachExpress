import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	user = {};

  constructor(public af: AngularFire, public router: Router) { 
  	
  	this.af.auth.subscribe(auth => {
  		// console.log(auth.uid)	
  		this.user = auth;
console.log(this.user);  
  		if (auth){
  			
  			// get user profile
  			// update menu link
  		}else{
  			// redirect to login page
  		}
  	});
  }



	ngOnInit() {
    
	}

  	logout() {
        this.af.auth.logout();
        this.router.navigate(['/dashboard']);

    }

    toggleSignIn() {

    }

}
