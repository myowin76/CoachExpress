import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import {AuthService} from "../shared/security/auth.service";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { Router } from "@angular/router";
import { AuthInfo } from "../shared/security/auth-info";

import { User } from "../shared/models/user"; 
import { UsersService } from "../shared/models/users.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form:FormGroup;
	user = {};
	profile: User;

	  constructor(private usersService:UsersService, private authService: AuthService, public af: AngularFire, private fb:FormBuilder, private router:Router) {
	  	    this.form = this.fb.group({
	          email: ['',Validators.required],
	          password: ['',Validators.required]
	      });
	    // this.af.auth.subscribe(auth => console.log(auth));
	    // this.af.auth.subscribe(user => {
	    //   if(user) {
	    //     // user logged in
	    //     this.user = user;
	    //     console.log('USER' + user.uid);
	    //     const authInfo = new AuthInfo(user.uid);
	    //   }
	    //   else {
	    //     // user not logged in
	    //     this.user = {};
	    //   }
	    // });
	  }
	  login() {
	  	    const formValue = this.form.value;
	    		// this.af.auth.login({email: formValue.email, password: formValue.password})

	    		this.authService.login(formValue.email, formValue.password);
	    		// this.router.navigate(['/dashboard']);
	    		

	  }

	  

	  ngOnInit() {
	  	this.af.auth.subscribe(
	      user => {
	        if(user) {
	          // user logged in
	          this.user = user;
	          
	          this.usersService.getCurrentUserProfile(user.auth.uid)
	            .subscribe( profile => {
	              this.profile = profile;
	              
	              this.router.navigate([profile.company_id + '/dashboard']);
	            })
	          
	        }
	        else {
	          // user not logged in
	          this.user = {};
	        }
	      }
	    )
	  }


	  // login() {

	  //     const formValue = this.form.value;

	  //     this.authService.login(formValue.email, formValue.password)
	  //         .subscribe(
	  //             user => {
	  //             	// console.log(user.uid);
	  //             	this.thisUser = user;
	  //             	// this.router.navigate(['/dashboard']);
	  //             } 
	  //         );


	  // }

}
